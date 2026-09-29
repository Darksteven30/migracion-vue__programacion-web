# Mi portafolio (World of Warcraft) — versión Vue

Migración del proyecto original en HTML + CSS + JS puro a **Vue 3** con
**vue-router**, siguiendo la misma estructura de `layouts/` + `views/` del
proyecto de ejemplo de la clase.

## Cómo correrlo

```bash
npm install
npm run serve
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:8080`).
Ya no hace falta Live Server: el propio `npm run serve` levanta un servidor
de desarrollo con recarga en caliente.

## Cómo editar tu información

Igual que antes: solo tienes que tocar los archivos JSON.

- `src/data/sobreMi.json` → tu información de "Mi perfil".
- `src/data/personajes.json` y `src/data/razas.json` → los datos de "Mis gustos".

Para cambiar tu foto: guarda la imagen en `public/img/` y actualiza la ruta
en `sobreMi.json` (por ejemplo `"foto": "/img/tu-foto.jpg"`).

## Estructura

```
src/
├── main.js              → arranca la app y carga el CSS global
├── App.vue               → solo contiene <router-view />
├── router/index.js       → define las rutas (antes era el router por hash)
├── layouts/
│   └── MainLayout.vue    → header + footer (antes vivían solo en index.html)
├── views/
│   ├── ProfileView.vue   → "Mi perfil" (antes Sobre mi/)
│   ├── LikesView.vue     → "Mis gustos" (antes Mi tema libre/)
│   └── HarryView.vue     → "Harry" (antes harry/), sigue usando fetch()
├── components/
│   ├── PersonajeCard.vue
│   ├── RazaCard.vue
│   └── HarryCard.vue
├── data/                  → los JSON, ahora importados como módulos
└── assets/estilos/        → los mismos CSS de cada vista, casi sin tocar
```
