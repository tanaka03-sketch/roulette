import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEYS } from '../domain/roulette';
import { RouletteApp } from './RouletteApp';

function getSavedState() {
  const raw = window.localStorage.getItem(STORAGE_KEYS.rouletteState);
  return raw === null ? null : JSON.parse(raw);
}

describe('RouletteApp', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds duplicate candidate names as separate id-based entries and persists them', async () => {
    const user = userEvent.setup();

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '重複候補');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(input, '重複候補');
    await user.click(screen.getByRole('button', { name: '追加' }));

    expect(screen.getAllByText('重複候補')).toHaveLength(2);
    expect(screen.getByText('候補 #1')).toBeInTheDocument();
    expect(screen.getByText('候補 #2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '候補 #1「重複候補」を編集' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '候補 #2「重複候補」を削除' }),
    ).toBeInTheDocument();

    const savedState = getSavedState();
    expect(savedState?.candidates).toHaveLength(2);
    expect(savedState?.candidates[0].id).not.toBe(savedState?.candidates[1].id);
  });

  it('rejects candidate names longer than 120 characters even if the input attribute is bypassed', async () => {
    const user = userEvent.setup();

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    fireEvent.change(input, { target: { value: 'あ'.repeat(121) } });
    await user.click(screen.getByRole('button', { name: '追加' }));

    expect(screen.getByText('候補名は120文字以内で入力してください')).toBeInTheDocument();
    expect(screen.getByText('まだ候補がありません。')).toBeInTheDocument();
    expect(getSavedState()?.candidates).toEqual([]);
  });

  it('rejects edited candidate names longer than 120 characters even if the input attribute is bypassed', async () => {
    const user = userEvent.setup();

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '変更前');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.click(screen.getByRole('button', { name: '候補 #1「変更前」を編集' }));

    const editInput = screen.getByLabelText('候補 #1の候補名');
    fireEvent.change(editInput, { target: { value: 'い'.repeat(121) } });
    await user.click(screen.getByRole('button', { name: '保存' }));

    expect(screen.getByText('候補名は120文字以内で入力してください')).toBeInTheDocument();
    expect(getSavedState()?.candidates[0].name).toBe('変更前');
  });

  it('renders candidate text safely instead of inserting html', async () => {
    const user = userEvent.setup();

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '<img src=x onerror=alert(1)>');
    await user.click(screen.getByRole('button', { name: '追加' }));

    expect(screen.getByText('<img src=x onerror=alert(1)>')).toBeInTheDocument();
    expect(document.querySelector('img')).toBeNull();
  });

  it('shows an error banner when localStorage saves are blocked', async () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    const user = userEvent.setup();

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '保存失敗候補');
    await user.click(screen.getByRole('button', { name: '追加' }));

    expect(
      screen.getByText('状態の保存に失敗しました。ブラウザ設定を確認してください'),
    ).toBeInTheDocument();
  });

  it('draws from eligible candidates and marks the winner as drawn', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '候補A');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(input, '候補B');
    await user.click(screen.getByRole('button', { name: '追加' }));

    await user.click(screen.getByRole('button', { name: '抽選開始' }));

    await act(async () => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByText('結果: 候補A')).toBeInTheDocument();
    expect(screen.getByText('1件 / 2件 から抽選できます')).toBeInTheDocument();
    expect(screen.getAllByText(/抽選済み|未抽選/)).toHaveLength(2);
  });

  it('locks candidate and settings changes while drawing', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '候補A');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(input, '候補B');
    await user.click(screen.getByRole('button', { name: '追加' }));

    await user.click(screen.getByRole('button', { name: '抽選開始' }));

    expect(input).toBeDisabled();
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: '抽選済み状態をリセット' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '候補をすべて削除' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: '候補 #1「候補A」を編集' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: '候補 #1「候補A」を削除' }),
    ).toBeDisabled();

    await act(async () => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByText('結果: 候補A')).toBeInTheDocument();
  });

  it('resets drawn candidates after confirmation', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '候補A');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(input, '候補B');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.click(screen.getByRole('button', { name: '抽選開始' }));

    await act(async () => {
      vi.advanceTimersByTime(900);
    });

    await user.click(screen.getByRole('button', { name: '抽選済み状態をリセット' }));

    expect(screen.getByText('抽選済み状態をリセットしました')).toBeInTheDocument();
    expect(screen.getByText('2件 / 2件 から抽選できます')).toBeInTheDocument();
    expect(screen.getAllByText('未抽選')).toHaveLength(2);
  });

  it('clears all candidates after confirmation with a separate destructive action', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const user = userEvent.setup();

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '候補A');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(input, '候補B');
    await user.click(screen.getByRole('button', { name: '追加' }));

    await user.click(screen.getByRole('button', { name: '候補をすべて削除' }));

    expect(screen.getByText('候補リストをすべて削除しました')).toBeInTheDocument();
    expect(screen.getByText('まだ候補がありません。')).toBeInTheDocument();
    expect(getSavedState()?.candidates).toEqual([]);
  });

  it('edits a candidate name while keeping the same item', async () => {
    const user = userEvent.setup();

    render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '変更前');
    await user.click(screen.getByRole('button', { name: '追加' }));

    await user.click(screen.getByRole('button', { name: '候補 #1「変更前」を編集' }));

    const row = screen.getByDisplayValue('変更前').closest('li');
    expect(row).not.toBeNull();

    const scoped = within(row!);
    const editInput = scoped.getByDisplayValue('変更前');
    await user.clear(editInput);
    await user.type(editInput, '変更後');
    await user.click(scoped.getByRole('button', { name: '保存' }));

    expect(screen.getByText('候補名を更新しました')).toBeInTheDocument();
    expect(screen.getByText('変更後')).toBeInTheDocument();
    const savedState = getSavedState();
    expect(savedState?.candidates).toHaveLength(1);
    expect(savedState?.candidates[0].name).toBe('変更後');
  });

  it('restores candidates and the exclude setting from localStorage on reload', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<RouletteApp />);

    const input = screen.getByLabelText('候補名');
    await user.type(input, '保存A');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(input, '保存B');
    await user.click(screen.getByRole('button', { name: '追加' }));

    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    unmount();

    render(<RouletteApp />);

    expect(screen.getByText('保存A')).toBeInTheDocument();
    expect(screen.getByText('保存B')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
