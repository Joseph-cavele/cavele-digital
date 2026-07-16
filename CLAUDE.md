# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This repository is the front-end for **Cavele Digital**, a marketing-agency marketing site.

The document has two parts:
- **"Current codebase"** (Commands / Stack / Architecture) — how the app is built *today*.
- **"Cavele Digital — company & product vision"** (further down) — the *target* the project is migrating toward. Do not treat it as the current reality.

## Repository layout

The current app code lives in the [`elevate-web-media/`](elevate-web-media/) folder — a legacy directory name kept only as its on-disk location; it is its **own nested git repository** (has its own `.git/`). The repo root (`caveledigital-front-end`) only contains a stray `package.json`/`package-lock.json` with no scripts — ignore it. **All development happens inside `elevate-web-media/`; run every command from there.**

## Commands

Run from `elevate-web-media/`:

- `npm run dev` — start the Vite dev server (HMR)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint over `**/*.{js,jsx}`

There is **no test framework** configured — do not assume `npm test` exists.

ESLint note: `no-unused-vars` is set to ignore identifiers matching `^[A-Z_]` (capitalized/constant names), so unused capitalized imports won't error.

## Stack (current codebase)

- **React 18** + **Vite 7** (plain JavaScript/JSX, no TypeScript)
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin. There is **no `tailwind.config.js`** — configuration lives in `src/index.css` using the `@import "tailwindcss"` + `@theme { ... }` syntax (custom font families are defined there). Google Fonts are imported at the top of `src/index.css`.
- **react-router-dom v6** for routing
- **lucide-react** and **react-icons** for icons

## Architecture

### Routing and layout
[`src/App.jsx`](elevate-web-media/src/App.jsx) is the shell: a `<BrowserRouter>` wrapping a persistent `<TopBar/>` + `<Navbar/>`, the `<Routes>`, and `<Footer/>`. [`src/main.jsx`](elevate-web-media/src/main.jsx) mounts `App` inside `<AuthProvider>`.

Directory conventions under `src/`:
- `Page/` — top-level route components (Home, AboutUs, OurServices, ContactPage)
- `Components/Sections/` — large page sections (Hero, About, Services, Testimonials, Footer, Navbar, etc.); the Home page is composed by stacking these
- `Components/ui/` — small reusable primitives (`BtnPrimary`, `BtnOline`, `Badge`, `Reveal`)
- `Forms/` — form components + `Validation.jsx`
- `data/` — content lives here as exported JS arrays/objects (nav links, services, testimonials, team, etc.), consumed by the Section components. **Edit copy/content here, not inline in components.**
- `Api/` — modules that export backend endpoint URL string constants (not client wrappers)
- `context/`, `hooks/`, `Style/`

### The client-side "auth gate" (important, non-obvious)
Several routes are wrapped in `<ProtectedRoute>`: `/about`, `/services`, `/contact`, `/consultation`. Auth is **in-memory only** via [`src/context/AuthContext.jsx`](elevate-web-media/src/context/AuthContext.jsx) — `isAuthenticated` starts `false` and is never persisted.

The gate is "unlocked" as a side effect of in-app navigation: the nav links in [`Navbar.jsx`](elevate-web-media/src/Components/Sections/Navbar.jsx) and the buttons [`BtnPrimary`](elevate-web-media/src/Components/ui/BtnPrimary.jsx) / [`BtnOline`](elevate-web-media/src/Components/ui/BtnOuline.jsx) call `authenticate()` *before* navigating. [`ProtectedRoute`](elevate-web-media/src/Components/ProtectedRoute.jsx) redirects to `/` when not authenticated.

**Consequence:** protected pages are only reachable by clicking through the app. On a direct URL visit or a page refresh the auth state resets to `false`, so the user is bounced to `/`. This also means those pages are effectively invisible to crawlers (an SEO limitation). Keep this in mind before assuming a route is directly linkable.

### Styling conventions
Colors come from [`src/Style/color.js`](elevate-web-media/src/Style/color.js), which exports a `C` object of hex tokens applied heavily via **inline `style={{ ... }}`** (not Tailwind color classes). Hover states are frequently done with inline `onMouseEnter`/`onMouseLeave` handlers that mutate `e.currentTarget.style`. Layout/spacing uses Tailwind utility classes.

### External integrations
- **Forms POST directly to external endpoints from the browser** — e.g. the contact form posts to a Make.com webhook (`hook.us2.make.com/...`) in [`ContactPage.jsx`](elevate-web-media/src/Page/ContactPage.jsx); a "thank you" backend lives at `backend-api-1-27ru.onrender.com` (see `Api/ThankyouEmail.js`). There is no unified API client. `axios` is available as a dependency.
- **Analytics/pixels** are injected in [`index.html`](elevate-web-media/index.html): Google Analytics (gtag, `G-CWCNZH1WNC`) and a Meta Pixel. The [`TrackPage`](elevate-web-media/src/hooks/Trackingpage.jsx) hook re-fires a `gtag('config', ...)` page_path event on every route change.



# Cavele Digital — company & product vision (target state)

> Everything below describes the company and the **target** architecture being built toward — the Next.js / TypeScript / MongoDB / shadcn stack, dashboards, and folder structure are the intended direction, **not** what exists on disk today. The live codebase is still Vite + React + JSX as described in the sections above. Use this section for product/context intent; use the sections above for how to actually run and change the current code.

## Overview

Cavele Digital is a software development and digital solutions company focused on helping businesses grow through modern technology.

Our services include:

- Custom Website Development
- SaaS Development
- Business Automation
- Dashboard Development
- SEO
- Website Maintenance
- Digital Marketing
- API Integrations

---

# Mission

Build software that solves real business problems and helps companies increase revenue, save time, and automate repetitive work.

---

# Tech Stack

## Frontend
- Next.js
- Mongo Db Atlas 
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Backend
- Node.js
- Express.js
- Mongo db Atlas
- JWT/Auth.js

## Cloud
- Vercel
- 
- Cloudinary

## Email
- Resend

## Automation
- Make
- Webhooks

## Analytics
- Google Analytics 4
- Google Tag Manager

---

# Projects

## Salon Management System

Features

- Online Booking
- Admin Dashboard
- Stylist Management
- Analytics
- Email Notifications

---

## Construction Company Website

Features

- Modern Website
- Quote Requests
- SEO
- Responsive Design

---

## College Management System

Features

- Student Management
- Registration
- Reports
- Dashboard

---

## Business Automation

Features

- Google Analytics Integration
- Automated Email Reports
- Lead Automation
- Make Workflows

---

# Cavele Digital Platform

## Homepage

- Hero Section
- Services
- Portfolio
- Testimonials
- Pricing
- Contact
- FAQ

---

## Client Dashboard

- Overview
- Projects
- Analytics
- Billing
- Support Tickets
- Files
- Notifications
- Settings

---

## Admin Dashboard

- Dashboard Overview
- Clients
- Leads
- Projects
- Invoices
- Support
- Analytics
- Portfolio CMS
- Blog CMS
- Team Management

---

# Design

Theme

- Dark
- Modern
- Premium
- Professional
- Minimal

Primary Color

- Blue

Secondary

- White
- Gray

---

# Code Standards

- TypeScript Strict Mode
- Reusable Components
- Clean Architecture
- Modular Folder Structure
- Server Components where appropriate
- API Validation
- Error Handling
- Responsive Design
- Accessibility
- SEO Best Practices

---

# Folder Structure

app/
components/
features/
hooks/
lib/
services/
types/
prisma/
public/

---

# Goals

- Build world-class software.
- Help businesses grow with technology.
- Create long-term client relationships.
- Build recurring monthly revenue.
- Grow Cavele Digital into a trusted software company.

---

# Motto

"Building Software That Grows Businesses."