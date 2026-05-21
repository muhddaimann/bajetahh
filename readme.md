# PWA Starter Template

Modern Progressive Web App starter template built with Expo Router, React Native Web, TypeScript, Context API, and reusable design tokens.

Supports dual-level authentication architecture for multi-role systems such as:
- Staff / Manager
- User / Admin
- Employee / Supervisor
- Customer / Operator

---

# Features

- Progressive Web App (PWA)
- Responsive Web Layout
- Expo Router Navigation
- React Native Paper UI
- Global Theme Management
- Reusable Design Tokens
- Overlay System
- Auth Session Handling
- Dual-Level Authentication
- Token Management
- Modular Architecture
- Web + Mobile Ready Structure

---

# Stack

- React Native
- Expo
- Expo Router
- TypeScript
- React Native Paper
- Axios
- Context API
- Zustand
- PWA Service Worker

---

# Project Structure

```bash
55pwa/
├─ app/
├─ assets/
├─ components/
├─ constants/
├─ contexts/
├─ hooks/
├─ public/
├─ dist/
└─ package.json
```

---

# App Constants

Global application details are centralized inside:

```bash
/constants/user.ts
```

Example:

```ts
export const APP_NAME = "PWA Starter";
export const APP_INITIAL = "P";
export const APP_TAGLINE = "Sign in to continue";
export const APP_BUTTON = "Authenticate";
```

Changing constants automatically updates:
- Login screen
- Header
- Branding
- Navigation
- Future modules

---

# Dual-Level Authentication

Supports multiple login roles from a single authentication screen.

Example:

```ts
type Role = "staff" | "manager";
```

Features:
- role-based login
- separate credentials
- route protection
- role-aware rendering
- scalable permission structure

---

# Design System

Global design tokens are centralized for consistency.

Location:

```bash
/constants/design.ts
```

Handles:
- spacing
- radius
- sizing
- shadows
- layout

Example:

```ts
spacing.md
radii.lg
layout.container
```

---

# Theme System

Theme configuration:

```bash
/constants/theme.ts
```

Supports:
- light mode
- dark mode
- semantic colors
- typography

Managed globally using:

```bash
/contexts/themeContext.tsx
```

---

# Overlay System

Reusable overlay components:

```bash
/components/overlay/
```

Includes:
- alert
- confirm
- loader
- modal
- toast
- bottom sheet

Controlled globally through:

```bash
overlayContext.tsx
```

---

# Authentication

Authentication flow handled using:

```bash
/contexts/authContext.tsx
```

Features:
- session management
- token handling
- role-based auth
- auto session expiry
- protected routing

---

# API Layer

Centralized API client architecture.

Example:

```ts
const api = axios.create({
  baseURL: API_URL,
});
```

Features:
- request interceptors
- response interceptors
- auth headers
- session expiry handling
- network checking

---

# Token Storage

Web PWA uses:

```ts
localStorage
```

instead of:

```ts
expo-secure-store
```

for browser compatibility.

---

# Routing

Powered by Expo Router.

Example:

```bash
app/
├─ (tabs)/
│  ├─ home/
│  ├─ settings/
```

Supports:
- nested layouts
- stack navigation
- tab navigation
- route grouping

---

# Service Worker

Location:

```bash
/public/sw.js
```

Handles:
- offline caching
- asset caching
- PWA behavior
- faster loading

---

# Build PWA

Install dependencies:

```bash
npm install
```

Start development:

```bash
npx expo start
```

Run web:

```bash
npx expo start --web
```

Build production web:

```bash
npx expo export:web
```

---

# PWA Output

Generated production build:

```bash
/dist
```

Contains:
- optimized assets
- index.html
- metadata
- cached files

---

# Responsive Philosophy

This template is designed with:
- mobile-first layout
- desktop responsiveness
- reusable containers
- scalable components

---

# Architecture Philosophy

This project follows:
- centralized constants
- reusable UI
- global state management
- scalable modular structure
- design-token driven development

---

# Recommended Extensions

Future modules:
- role permission system
- analytics dashboard
- notification center
- offline sync
- API caching
- websocket realtime
- biometric login
- admin portal

---

# License

Internal Starter Template