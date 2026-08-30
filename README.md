# Collaborative Whiteboard App

A real-time collaborative whiteboard built with Next.js, Convex, Liveblocks, Clerk, and TypeScript.

This project demonstrates a production-style collaborative workspace: authenticated users can create and manage boards, join shared rooms, draw on a canvas, see participant presence, and work with persistent board data.

## What This Demonstrates

- Real-time collaboration with Liveblocks rooms, presence, and shared canvas state
- Authenticated product flows with Clerk
- Persistent board data and backend mutations with Convex
- Canvas interaction patterns including shapes, freehand paths, text, selection, colors, and layer previews
- Dashboard UX for board discovery, search, favorites, organizations, and empty states
- Modern full-stack app structure using Next.js App Router, React, TypeScript, Zustand, and Tailwind CSS

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Convex
- Clerk
- Liveblocks
- Zustand
- Tailwind CSS
- Radix UI
- perfect-freehand
- lucide-react

## Core Features

- Board dashboard with search and empty states
- Organization-aware board management
- Board creation, renaming, deletion, and favorites
- Real-time collaborative canvas
- Live cursors and participant presence
- Drawing tools for freehand paths, rectangles, ellipses, notes, and text
- Selection tools, layer previews, and color controls
- Authenticated Liveblocks room access

## Architecture

```text
User
  -> Clerk authentication
  -> Next.js dashboard and board routes
  -> Convex queries/mutations for board metadata
  -> Liveblocks room auth endpoint
  -> Collaborative canvas with shared presence and layers
```

The app separates product surfaces into a dashboard area and a board workspace. Convex owns persistent board data, while Liveblocks handles low-latency collaborative room state and presence.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- Clerk project
- Convex project
- Liveblocks project

### Install

```bash
pnpm install
```

### Environment Variables

Create `.env.local` and configure the required Clerk, Convex, and Liveblocks values.

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
LIVEBLOCKS_SECRET_KEY=
```

Adjust the variable names if your local `.env.example` uses different names.

### Run Locally

```bash
pnpm dev
```

In another terminal, run Convex if needed:

```bash
pnpm convex dev
```

Open:

```text
http://localhost:3000
```

## Quality Checks

```bash
pnpm lint
pnpm build
```

## Screenshots

Add screenshots here before keeping this repo pinned:

- Dashboard / board list
- Empty board state
- Whiteboard canvas
- Multi-user presence
- Shape/text/freehand tools

## Project Status

Portfolio project focused on real-time collaboration, product UX, and full-stack architecture. Next improvements: add screenshots, document environment setup exactly, and include a short demo GIF of two users collaborating on the same board.
