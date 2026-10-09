import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Règle N°1 : Pour la section dashboard qui est dynamique et privée...
  {
    path: 'dashboard/**',
    // ... on utilise le rendu à la demande côté serveur (SSR Pur).
    renderMode: RenderMode.Server,
  },
  // Règle N°2 : Pour tout le reste (login, register)...
  {
    path: '**',
    // ... on tente de pré-rendre les pages au moment du build (SSG).
    renderMode: RenderMode.Prerender,
  },
];
