# Pinia Migration & Usage Guide

This document explains how to use the centralized Pinia stores and how to migrate components away from hard-coded data.

## Folder structure
- `src/stores/` — Contains Pinia stores (e.g. `useProjectsStore.ts`).
- `public/data/` — JSON data used by stores in dev and production.
- `src/services/api.ts` — Lightweight fetch wrapper with caching.

## How stores are organized
- Each domain has its own store with typed state, actions and simple caching. Example stores:
  - `useNavStore` — navigation items
  - `useProfileStore` — about/profile content
  - `useProjectsStore` — projects list
  - `useArticlesStore` — articles list
  - `useExperienceStore` — jobs/experience
  - `useContactStore` — contact info and sendMessage action

## Migrating a component
1. Remove any hard-coded arrays or objects used as data sources.
2. Import the required store (e.g. `const store = useProjectsStore()`).
3. Call `await store.load()` in `onMounted()` and bind to `store.items` in template.
4. Prefer store actions for operations (e.g. `contactStore.sendMessage(payload)`) rather than local logic.

## Testing
- A sample Vitest test is included in `tests/stores/`.
- Run `npm test` locally.

## CI Enforcement
- `check:fonts` ensures there are no literal `font-family` usages.
- GitHub Actions workflow runs tests and the fonts check on PRs.

## Extending
- For remote APIs, replace `/data/*.json` with API endpoints in the stores and add error handling and retries.
- Add persistence (e.g., `pinia-plugin-persistedstate`) for client-side preferences.

If you'd like, I can:
- Add TypeScript interfaces in a centralized `src/types` file, or
- Add Storybook stories that read from the stores for visual testing.
