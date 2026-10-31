# Abel Girma — Software Developer & AI Developer

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. It runs locally without a build step, framework, or AI provider dependency.

## Run locally

Open `index.html` in a browser, or serve this directory using any static file server. The Google Fonts stylesheet is optional; local sans-serif fallbacks are provided.

## Personalize the portfolio

- Update the About section and its education, experience, interests, and goals placeholders with verified details.
- Add real project entries in `index.html`. The six current project cards are explicitly ideas/examples, not claims of completed work. Replace each problem/solution summary, tags, illustration, repository link, and live demo link with real information. The project filter values are `software`, `ai`, `automation`, and `tools`.
- Update the AI Lab topics and their status when you have verified experiments to describe.
- Replace placeholder social links, email, and contact details with your profiles.
- Replace `assets/Abel-Girma-CV.pdf` with your verified CV; the current file is a clearly labeled placeholder document.
- Adjust the colors in CSS custom properties at the start of `css/style.css`.
- Edit the title list and form validation in `js/script.js` as needed.

The contact form validates input in the browser but does not send or store it. To enable delivery, connect a backend endpoint or configured form provider and change the feedback to reflect its actual response. Keep any private credentials on the server.

## Secure AI integrations

There is no AI demo or provider integration in this static frontend. For a future feature, create a backend endpoint that holds provider credentials in environment variables, validates requests, applies rate limits, and returns only the data the browser needs. The frontend should call that endpoint; never place a secret API key in `script.js` or another public asset. Document backend setup and required environment variables separately if a backend is added.

## Deploy

Deploy the contents of this folder as a static site. GitHub Pages can publish from a configured branch and folder. Netlify and Vercel can host it with no build command and the project directory as the publish root. Update the Open Graph metadata and add the production URL when deploying.

## Accessibility and interactions

The site includes keyboard focus indicators, a skip link, mobile menu, saved theme preference, project filters, scroll-reveal effects, reduced-motion handling, active navigation, and accessible form feedback. No proficiency ratings or project statistics are claimed.
