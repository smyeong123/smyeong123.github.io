---
name: deploy
description: Manually trigger the GitHub Actions deployment workflow
disable-model-invocation: true
allowed-tools: Bash
---

Trigger a manual deployment of the Hugo site to GitHub Pages:

1. Verify the current branch is `main` by running `git branch --show-current`
2. Check for uncommitted changes with `git status --short`
   - If there are uncommitted changes, warn the user and ask if they want to commit first before deploying
3. Trigger the GitHub Actions workflow: `gh workflow run deploy.yml`
4. Show the workflow run status: `gh run list --workflow=deploy.yml --limit 1`
5. Tell the user they can monitor the deployment at https://github.com/smyeong123/smyeong123.github.io/actions
