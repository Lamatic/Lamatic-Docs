# Contributing to Lamatic Docs

Thank you for your interest in improving Lamatic Docs! Follow the steps below to get set up, make changes, and submit a pull request.


## Prerequisites

- Git installed and authenticated with GitHub.
- Node.js and pnpm (if you plan to build/test docs locally).
- A GitHub account with a fork of this repo.

## 1) Fork and clone

1. Fork [Lamatic Docs](https://github.com/Lamatic/Lamatic-Docs/fork) on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/Lamatic-Docs.git
   cd Lamatic-Docs
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/Lamatic/Lamatic-Docs.git
   git fetch upstream
   ```

## 2) Create a feature branch

1. Sync with upstream main:
   ```bash
   git checkout main
   git pull upstream main
   ```
2. Create a descriptive branch:
   ```bash
   git checkout -b docs/fix-typo-in-getting-started
   ```

## 3) Make your changes

- Edit content in `pages/` or related config files.
- If adding images/diagrams, place them in an appropriate `public/` or `assets/` folder and reference them with relative paths.
- Keep changes focused; smaller PRs are easier to review.

## 4) Preview/test locally (optional but recommended)

```bash
npm install
npm run dev
```

Open the printed localhost URL to verify your changes look correct. Stop the dev server when done.

## 5) Commit with a clear message

```bash
git status
git add <files>
git commit -m "docs: clarify contributing steps"
```

## 6) Push and open a pull request

1. Push your branch to your fork:
   ```bash
   git push origin docs/fix-typo-in-getting-started
   ```
2. In GitHub, open a Pull Request (PR) from your branch to `Lamatic/Lamatic-Docs:main`.
3. In the PR description, include:
   - What changed and why.
   - Screenshots/diagrams if visual changes.
   - How you tested (or note if not tested).

## 7) Review cycle

- Maintainers will review and may request changes.
- Update your branch as needed:
  ```bash
  git pull --rebase upstream main
  git push -f origin docs/fix-typo-in-getting-started
  ```
- Once approved, a maintainer merges the PR.

## Reporting issues

If you find a bug or want to request a feature:

1. Search existing issues to avoid duplicates.
2. Open a new issue with:
   - Clear title.
   - Steps to reproduce (if a bug).
   - Expected vs actual behavior.
   - Screenshots or links when helpful.

## Need help?

Ask in the issue tracker. Include links, screenshots, and commands you ran so maintainers can assist quickly.
