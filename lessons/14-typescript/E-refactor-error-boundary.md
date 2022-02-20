---
title: "ErrorBoundary"
path: "/ts-error-boundary"
order: "13E"
section: "TypeScript"
description: "Brian quickly converts ErrorBoundary.tsx"
---

Let's go do ErrorBoundary.tsx now

```tsx
// add types and return types to parameters
componentDidCatch(error: Error, info: ErrorInfo): void {}
```

- Pretty straightforward here. Just need to type some parameters that TS wouldn't be able to infer. Everything else it can infer.
