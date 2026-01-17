# Sales CRM Dashboard

A multi-tenant Sales CRM Dashboard built with **Next.js (App Router)**, **TypeScript**, **Tailwind**, **shadcn/ui**, and **Recharts**.

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
    npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**.

## 🏗 Architecture & Design Decisions

### Component Reuse Strategy
I prioritized **Composition** over configuration.
- **UI Primitives**: `Card`, `Button`, `Input` are dumb components (shadcn/ui style), styled via `className` props (using `cn` utility).
- **Composite Components**: `StatCard` encapsulates the "Label + Value + Trend" pattern but accepts slot-based content where needed. `TenantSwitcher` is portable and can be placed in Sidebar or Header.

### Custom Hooks vs HOCs
I chose **Custom Hooks** as the primary logic abstraction layer.
- **Why Hooks?**: They compose better than HOCs and avoid "wrapper hell". They allow for cleaner separation of concerns (Logic vs UI).
- **Core Hooks**:
    - `useTenant()`: Manages global tenant state (Zustand) and memoizes the current tenant object.
    - `useCrmAnalytics(deals)`: Performs heavy data transformation (grouping by stage/source) using `useMemo` to ensure charts only re-render when data changes.
    - `useDashboardStats()`: orchestrates data fetching (RTK Query) and loading states for the page.

### State Management
- **Zustand**: Used for `tenantId` (Global Client State). It's simpler than Redux for single-value globals and persists easily.
- **RTK Query**: Used for Server State (`crm.api.ts`, `analytics.api.ts`). It handles caching, deduplication, and tagging ('Deal').
- **Context/Props**: Used for local UI state (e.g., specific chart config).

### Data Flow & Charts
**"Raw Data is not Chart-Ready"**
1. **API Layer**: Returns raw `Deal[]` objects with dates and values.
2. **Hook Layer**: `useCrmAnalytics` consumes `Deal[]` -> aggregates totals -> formats for Recharts (e.g., `dealsByStage`).
3. **UI Layer**: `DealStageChart` receives processed data. It contains **NO** transformation logic, only rendering configuration.

### Theming
- Built with **Tailwind CSS**.
- Charts use dynamic colors mapped to Deal Stages (e.g., "Won" = Green, "Lost" = Red).
- Layout uses `grid` and `flex` for responsiveness.

## 📂 Folder Structure
- `/app`: Next.js Routes.
- `/components/ui`: Reusable primitives (Card, Button).
- `/components/dashboard`: specialized layout components (RevenueStats).
- `/components/charts`: Pure visualization components.
- `/hooks`: Logic encapsulations (`useCrmAnalytics`, `useTenant`).
- `/services`: RTK Query API definitions.
- `/store`: Zustand stores.
