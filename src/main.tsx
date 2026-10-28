// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Global styles (order matters — tokens first, then overrides)
import './styles/index.css'
import './styles/typography.css'
import './styles/animations.css'

// Component styles
import './styles/components/badge.css'
import './styles/components/button.css'
import './styles/components/card.css'
import './styles/components/form.css'
import './styles/components/header.css'
import './styles/components/footer.css'

// Lenis smooth scroll init
import { initLenis, startLenisRaf, syncLenisWithGSAP } from './lib/lenis.ts'

const lenis = initLenis()
// Expose on window for debugging in dev
if (import.meta.env.DEV) {
  window.__lenis = lenis
}
startLenisRaf(lenis)
syncLenisWithGSAP(lenis).catch(() => {
  // GSAP sync is optional — non-fatal if it fails
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
