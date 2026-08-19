# Dark Mode and Dynamic Resume Modal Implementation Plan

## Goal Description
1. Implement a system-wide Dark Mode toggle that swaps the light pastel theme for a sleek dark theme, while preserving the pastel light blue as an accent color for text and highlights.
2. Replace the direct "Resume" hyperlink with an interactive, full-screen Resume Modal that displays experience, projects, skills, and education elegantly, along with a "Download PDF" button.

## Proposed Changes

### 1. Theme Configuration
- **Update `src/index.css`**: Define CSS variables in `:root` and `.dark` scope for seamless transitions.
  - Light mode: Primary (`#D9EAFD`), Secondary (`#F8FAFC`), Text (`#1E293B`).
  - Dark mode: Primary (`#1E293B` or `#1E293B`), Secondary (`#0F172A`), Text (`#F8FAFC`), Accent (`#D9EAFD`).
- **Global Search & Replace**: Refactor hardcoded colors (like `#1E293B`) across all components (`AmuseHero`, `ProjectsSection`, `AboutMeSection`, `TransitionSection`) to use `var(--color-text)` and dynamic Tailwind classes so they invert properly.

### 2. Theme Toggle Component
- **Create `ThemeToggle.jsx`**: A floating button (with sun/moon icons) that toggles the `.dark` class on the `<html>` element and saves the user's preference in `localStorage`.

### 3. Dynamic Resume Modal
- **Create `ResumeModal.jsx`**: An animated, full-screen overlay (using Framer Motion) mimicking the provided screenshot's aesthetic.
  - **Content**: Ayan Mekrani's details (Experience, Projects, Education, Skills).
  - **Actions**: A prominent "Download PDF" button linking to the Google Drive URL, and a close button.
  - **Theming**: Fully compatible with both Light and Dark modes.
- **Update `AmuseHero.jsx`**: Change the "Resume" link into a button that sets a state (`isResumeOpen = true`), rendering the `ResumeModal`.

## User Review Required

> [!IMPORTANT]
> The provided screenshot uses a bright orange color. As requested, I will adapt this design to use your existing pastel light blue palette (and its dark mode equivalent) to keep it cohesive with your portfolio's theme.

> [!NOTE]  
> The Resume Modal will use the information you've provided so far (Ganpat University, Machine Learning Intern, B.Tech CS, and your 4 Projects). For Skills and other sections, I will populate them with technologies relevant to your projects (React, Node.js, Python, MongoDB, AWS, Vite, Tailwind).

## Verification Plan
1. **Dark Mode**: Verify that clicking the toggle smoothly inverts the colors across all sections (including text outlines, SVGs, and the physics canvas).
2. **Resume Modal**: Verify that clicking "Resume" opens the modal smoothly, displays the correct information, and that the "Download PDF" button successfully redirects to your Google Drive link.
