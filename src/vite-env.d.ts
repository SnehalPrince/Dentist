/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.mdx' {
  import type { ComponentType, ReactElement } from 'react'
  export const frontmatter: Record<string, any>
  const component: ComponentType
  export default component
}
