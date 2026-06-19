---
name: lamatic
description: Operating guide for AI agents working with Lamatic.ai — a managed platform for building, deploying, and monitoring AI applications and agents.
version: 1.0.0
---

# Lamatic Agent Skill

This document tells AI agents (Claude, Cursor, custom assistants, etc.) how to work effectively with Lamatic.ai. It is **not** general user documentation. For that, see [llms.txt](https://lamatic.ai/llms.txt) or [the full docs](https://lamatic.ai/docs).

## What Lamatic is

Lamatic.ai is a managed platform for building AI-powered applications. The core unit of work is a **Flow**, a graph of connected **Nodes** that runs in order. A Flow is built in the Studio editor, deployed to an endpoint, and then called via API, SDK, CLI, or an MCP server.

Key concepts:

- **Flow** — a runnable graph of nodes. Triggered via API, schedule, webhook, widget, etc.
- **Node** — a single step in a flow (AI generation, data lookup, branching logic, integration call).
- **Agent** — a specialised AI node (Supervisor, Text, JSON, etc.) with reasoning capabilities.
- **Context** — vector and memory stores attached to a project for RAG and stateful interactions.
- **Project** — the deployment boundary. Each project has its own credentials, secrets, and deployment.
- **Organization** — owns one or more projects. Org-level operations require an Enterprise API key.

## How to interact with Lamatic from outside Studio

Pick the right tool for the job:

| Goal                                                           | Use                                                                    |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Answer a question *about* Lamatic itself                       | [Docs MCP](https://docmcp.lamatic.ai/api/mcp) — hosted, no auth needed |
| Run a deployed flow from natural language                      | [Graph MCP](https://lamatic.ai/docs/mcp/graph-mcp)                     |
| Manage projects / flows / credentials programmatically         | [CLI](https://lamatic.ai/docs/cli) or Enterprise API                   |
| Call a flow from application code                              | [SDK](https://lamatic.ai/docs/sdk) (JS/TS, React, Next.js, Go)         |
| Make raw GraphQL requests                                      | [API Integration](https://lamatic.ai/docs/api-integration)             |
| Connect Lamatic flows to external MCP servers                  | [MCP Node](https://lamatic.ai/docs/mcp/mcp-node)                       |

## Authentication

Two key types:

- **Project API key** — scoped to one project. Used to trigger flows from an app. Header: `Authorization: Bearer <key>` plus `x-project-id: <project-id>`.
- **Enterprise API key** — scoped to the whole organization (prefix `lt-org-...`). Used for managing org-level resources. Required by the CLI, Graph MCP, and Dev MCP.

Never log, print, or commit either key. If a user pastes one in chat, treat it as sensitive.

## Endpoints worth knowing

- `https://lamatic.ai/llms.txt` — curated documentation index, markdown links.
- `https://lamatic.ai/llms-full.txt` — full concatenated docs in one file.
- `https://lamatic.ai/<doc-url>.md` — markdown version of any doc page (append `.md`).
- `https://docmcp.lamatic.ai/api/mcp` — Docs MCP server (free, no auth).
- `https://<project>.lamatic.dev/graphql` — per-project GraphQL endpoint for running flows.

## Recommended behaviours

- **Prefer the Docs MCP** for any "how do I…" or "what does X mean" question. It answers from the live indexed docs.
- **Prefer `.md` URLs** when fetching docs pages programmatically; you get clean markdown instead of rendered HTML.
- **Use the CLI** for repeatable org actions (deploy, create flow, update credentials). Avoid scripting raw GraphQL for management tasks unless the CLI doesn't cover it.
- **Confirm destructive operations** (deleting a project, deleting a flow, deploying to production) with the user before running them.
- **Stay scoped to a project** unless the user explicitly asks for org-level work. Most flow operations require only a Project API key.
- **Quote field names verbatim** from the docs when constructing payloads. Node parameter names use `snake_case` in the low-code config (e.g. `recipient_email`, `is_html`, `add_label_ids`).

## What to avoid

- Inventing endpoint paths, header names, or field names. If unsure, query the Docs MCP or read the relevant `.md` page.
- Running `lamatic project delete` or `dev_delete_project` without explicit user confirmation.
- Calling org-level endpoints with a Project API key (they will fail with an auth error).
- Treating output from the Docs MCP as authoritative for *your own* private flows — it indexes public docs only.

## Source of truth

- Public docs: [lamatic.ai/docs](https://lamatic.ai/docs)
- Index for agents: [lamatic.ai/llms.txt](https://lamatic.ai/llms.txt)
- Status / changelog: [lamatic.ai/changelog](https://lamatic.ai/changelog)

If something on this page contradicts the latest docs, the docs win.
