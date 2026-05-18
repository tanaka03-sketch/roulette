# Security Policy

## Supported Versions

This repository is currently maintained on the default branch (`main`).
Security fixes, when available, will be applied to the latest code on `main`.

## Reporting a Vulnerability

Please do not open a public GitHub issue for suspected security problems.

Use one of the following methods:

1. GitHub Private Vulnerability Reporting for this repository, if it is enabled.
2. If private reporting is not available, contact the repository owner directly through the GitHub profile before making details public.

Please include the following information when possible:

- Summary of the issue
- Steps to reproduce
- Expected impact
- Any known workaround or mitigation

## Response Expectations

The maintainer will review the report and determine the next steps.
Public disclosure should wait until the maintainer has had a reasonable chance to investigate and prepare a fix or mitigation.

## Scope Notes

This project is a client-side application that stores state in the browser `localStorage`.
When reporting issues, please include whether the problem affects:

- Candidate data stored in `localStorage`
- Public deployment configuration
- GitHub Actions or repository settings
