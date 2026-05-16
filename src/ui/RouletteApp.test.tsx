import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEYS } from '../domain/roulette';
import { RouletteApp } from './RouletteApp';

type RenderedApp = {
  container: HTMLDivElement;
  unmount: () => void;
};

let renderedApp: RenderedApp | null = null;

function renderApp(): RenderedApp {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);

  act(() => {
    root.render(<RouletteApp />);
  });

  const result = {
    container,
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };

  renderedApp = result;
  return result;
}

function getButton(label: string): HTMLButtonElement {
  const button = Array.from(document.querySelectorAll('button')).find(
    (element) => element.textContent?.trim() === label,
  );

  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(`Button not found: ${label}`);
  }

  return button;
}

function getCandidateInput(): HTMLInputElement {
  const input = document.querySelector('#candidateName');

  if (!(input instanceof HTMLInputElement)) {
    throw new Error('Candidate input not found');
  }

  return input;
}

function getExcludeCheckbox(): HTMLInputElement {
  const checkbox = document.querySelector('input[type="checkbox"]');

  if (!(checkbox instanceof HTMLInputElement)) {
    throw new Error('Exclude checkbox not found');
  }

  return checkbox;
}

function getCandidateRows(): HTMLLIElement[] {
  return Array.from(document.querySelectorAll('.candidate-row'));
}

function getDeleteButtons(label: string): HTMLButtonElement[] {
  return Array.from(
    document.querySelectorAll(`button[aria-label="${label}"]`),
  ).filter((element): element is HTMLButtonElement => element instanceof HTMLButtonElement);
}

function changeInput(input: HTMLInputElement, value: string) {
  act(() => {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

function click(element: Element) {
  act(() => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
}

function addCandidate(name: string) {
  changeInput(getCandidateInput(), name);
  click(getButton('追加'));
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  if (renderedApp !== null) {
    renderedApp.unmount();
    renderedApp = null;
  }

  vi.useRealTimers();
  vi.restoreAllMocks();
  window.localStorage.clear();
  document.body.replaceChildren();
});

describe('RouletteApp', () => {
  it('allows duplicate candidate names and deletes only the selected candidate row', () => {
    renderApp();

    addCandidate('重複');
    addCandidate('重複');

    expect(getCandidateRows()).toHaveLength(2);

    const deleteButtons = getDeleteButtons('候補 重複 を削除');
    expect(deleteButtons).toHaveLength(2);

    click(deleteButtons[0]);

    expect(getCandidateRows()).toHaveLength(1);
    expect(document.body.textContent).toContain('重複');
  });

  it('keeps candidate text escaped instead of inserting HTML', () => {
    renderApp();

    addCandidate('<img src=x onerror=alert(1)>');

    expect(document.body.textContent).toContain('<img src=x onerror=alert(1)>');
    expect(document.querySelector('img')).toBeNull();
  });

  it('draws a deterministic result and then blocks drawing when only one eligible candidate remains', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    renderApp();

    expect(getButton('抽選開始').disabled).toBe(true);

    addCandidate('A');
    addCandidate('B');

    const drawButton = getButton('抽選開始');
    expect(drawButton.disabled).toBe(false);

    click(drawButton);
    expect(document.body.textContent).toContain('抽選中...');

    act(() => {
      vi.advanceTimersByTime(900);
    });

    expect(document.body.textContent).toContain('結果: A');
    const rows = getCandidateRows();
    expect(rows[0].textContent).toContain('抽選済み');
    expect(rows[1].textContent).toContain('未抽選');
    expect(document.body.textContent).toContain('抽選には2件以上の候補が必要です');
  });

  it('persists candidates and exclude setting through localStorage', () => {
    const firstRender = renderApp();

    addCandidate('保存A');
    addCandidate('保存B');

    expect(getExcludeCheckbox().checked).toBe(true);
    click(getExcludeCheckbox());
    expect(getExcludeCheckbox().checked).toBe(false);
    expect(window.localStorage.getItem(STORAGE_KEYS.rouletteState)).not.toBeNull();

    firstRender.unmount();
    renderedApp = null;

    renderApp();

    expect(getCandidateRows()).toHaveLength(2);
    expect(document.body.textContent).toContain('保存A');
    expect(document.body.textContent).toContain('保存B');
    expect(getExcludeCheckbox().checked).toBe(false);
  });
});
