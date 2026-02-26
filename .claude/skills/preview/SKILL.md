---
name: preview
description: Start the local Hugo development server for previewing the site
disable-model-invocation: true
allowed-tools: Bash
---

Start the Hugo local development server:

1. Check if port 1313 is already in use: `lsof -ti:1313`
   - If in use, kill the existing process: `lsof -ti:1313 | xargs kill -9`
   - Wait 1 second for the port to free up
2. Start the Hugo dev server in the background: `hugo server --port 1313`
3. Tell the user the site is available at:
   - **Homepage**: http://localhost:1313/
   - **Articles**: http://localhost:1313/posts/
4. Remind the user that the server auto-reloads on file changes
5. To stop the server later, they can run: `lsof -ti:1313 | xargs kill -9`
