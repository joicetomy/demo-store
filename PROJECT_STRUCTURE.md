---
description: "Global rule index for Cursor — loads all project rules and architecture context"
alwaysApply: true
context:
  - PROJECT_STRUCTURE.md
  - package.json
---

# 🧭 Cursor Rule Index — Project Context Loader

This file acts as the **entry point** for all Cursor rules in this project.  
It ensures consistent behavior, automatic context loading, and rule enforcement across all code generations.

---

## 🧱 1 · Purpose

- Ensure Cursor always reads:
  - `PROJECT_STRUCTURE.md` for architecture.
  - `package.json` for framework and dependency versions.
- Automatically apply all modular rule files from `.cursor/rules/`.
- Provide a unified set of global behaviors for code generation, reuse, and validation.
- Enforce architectural separation between **UI**, **logic**, and **data** layers.

---

## 🧩 2 · Included Rule Files

Cursor must always load and apply these rules:

1. `.cursor/rules/project-structure.mdc` → Defines folder responsibilities and architecture.  
2. `.cursor/rules/scaffolding.mdc` → Defines feature scaffolding and reuse logic.  
3. `.cursor/rules/naming-and-quality.mdc` → Enforces naming conventions and code quality.  

---

## 🧠 3 · Global Behavior Guidelines

When Cursor performs any code generation, edit, or refactor:

1. **Read Context:**
   - Always load `PROJECT_STRUCTURE.md` to understand file purposes.
   - Always load `package.json` to know dependency versions and major frameworks (React, Next.js, Saleor, etc.).
2. **Check Versions:**
   - Verify syntax, APIs, and configurations against the project’s current library versions.  
   - Example:  
     - If React 19 → use the latest React APIs (no legacy patterns).  
     - If Next.js 15 → follow the App Router conventions, not Pages Router.  
3. **Use Official Sources:**
   - When referencing APIs, hooks, or config patterns, verify from official documentation:
     - React → [https://react.dev](https://react.dev)  
     - Next.js → [https://nextjs.org/docs](https://nextjs.org/docs)  
     - Saleor → [https://docs.saleor.io](https://docs.saleor.io)  
     - TypeScript → [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs)
     - Next Auth → [https://next-auth.js.org/getting-started/introduction](https://next-auth.js.org/getting-started/introduction)
     - Razorpay → [https://razorpay.com/integrations/](https://razorpay.com/integrations/)
   - Avoid suggesting deprecated APIs or unofficial libraries.
4. **Confirm Before Change:**
   - Ask before upgrading dependencies or using features that differ from versions in `package.json`.

---

## 🧩 4 · File Generation Workflow

When a new feature is requested (e.g., “Add a wishlist feature”):

1. Load both `PROJECT_STRUCTURE.md` and `package.json`.  
2. Identify the current project versions of:
   - React, Next.js, TypeScript, Saleor SDK, etc.  
3. Scaffold according to `scaffolding.mdc`, ensuring all generated code matches versions and conventions.  
4. Validate naming, style, and placement via `naming-and-quality.mdc`.  
5. Double-check official docs for any new or updated API references.

---

## 🧱 5 · Layer Enforcement Summary

| Layer | Path | Description |
|--------|------|-------------|
| View Layer | `/src/components/` | Pure UI components (no logic). |
| Logic Layer | `/src/hooks/` | Hooks that consume services or state. |
| Data Layer | `/src/services/` | GraphQL, REST, adapters, and transformations. |
| State Layer | `/src/store/` | Redux or Zustand global state. |
| Routing Layer | `/src/app/` | App Router + containers per feature. |

---

## 🧩 6 · Precedence Order of Rules

When multiple rules apply, Cursor must follow this order:

1. **project-structure.mdc** → architecture & folder rules (highest priority)  
2. **naming-and-quality.mdc** → naming & coding consistency  
3. **scaffolding.mdc** → feature generation flow  

---

## 🧩 7 · Project Validation Behavior

Before creating or modifying files, Cursor must:

1. Check the **React**, **Next.js**, and **TypeScript** versions in `package.json`.  
2. Use **official docs** for any new or unclear APIs.  
3. Ensure that imports and syntax match the verified versions.  
4. Ask the user before introducing APIs from newer versions than those installed.  
5. Ensure generated code matches:
   - The architecture from `PROJECT_STRUCTURE.md`  
   - The library versions from `package.json`

---

## 🧠 8 · Example Prompts

Example valid project-aware prompts:

> “Add a wishlist feature following our structure.”  
> “Generate a new hook for Saleor categories as per our architecture.”  
> “Update the checkout container to match the latest Next.js 15 pattern from docs.”

Cursor will:

- Load `PROJECT_STRUCTURE.md`  
- Load `package.json`  
- Confirm version-specific APIs  
- Generate or refactor code using official conventions  

---

## 🧩 9 · Maintenance & Updates

- When updating framework versions in `package.json`, Cursor automatically adjusts its generation behavior on next use.  
- New rules can be added under `.cursor/rules/` without modifying this file.  
- Do **not remove the context** lines — they ensure architecture and version context remain active.  

---

> **References:**  
> - `PROJECT_STRUCTURE.md` → Architectural structure and responsibilities.  
> - `package.json` → Dependency versions and toolchain context.  
> - `.cursor/rules/` → Modular rule logic (architecture, naming, quality, scaffolding).  
>  
> Together, these guarantee your project remains version-aware, officially aligned, and consistently structured**.
