---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Design Principles

### Visual Hierarchy
- One primary element per screen (CTA, headline, primary action)
- Font sizes on a scale: 12, 14, 16, 20, 24, 32, 48px
- Minimum WCAG AA contrast: 4.5:1 for normal text

### Spacing
- Use a 4px scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Consistent internal padding per component type
- Generous whitespace signals quality

### Colors
- Define a palette: primary, secondary, neutrals, semantic (success, error, warning)
- Never use pure black (#000) — prefer #0F0F0F or #1A1A1A
- Backgrounds: avoid pure white (#FFF) — use #FAFAFA or #F5F5F5
- Commit to a cohesive theme; use CSS variables for consistency
- Dominant colors with sharp accents outperform timid, evenly-distributed palettes

### Typography
- Maximum 2 font families per project
- Line-height: 1.5 for body text, 1.2 for headings
- Negative letter-spacing on large headings reads as more refined
- Avoid generic fonts (Arial, Inter, Roboto, system fonts); choose distinctive, characterful faces
- Pair a strong display font with a refined body font

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Unexpected, characterful font choices elevate the aesthetics far beyond generic defaults.
- **Color & Theme**: Commit to a cohesive aesthetic. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion/Framer Motion for React. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

## Recommended Stack

For most projects:
- **React + Tailwind CSS** — component structure with utility-first styling
- **Framer Motion** — animations and gesture interactions
- **Radix UI** — accessible, unstyled base components
- **Lucide React** — consistent, clean icon set

## Expected Output

- Clean, componentized, reusable code
- Responsive by default (mobile-first)
- All interactive states covered: default, hover, active, disabled, loading, error
- Comments on non-obvious design decisions

Remember: Claude is capable of extraordinary creative work. Don't hold back — show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
