# Las Tejas – QR Menu

Proyecto para mostrar el menú del restaurante Las Tejas como un PDF y como un “flipbook” tipo libro, optimizado para escanear desde un código QR.

## Tecnologías usadas

- HTML estático (`index.html`)
- CSS puro (estilos embebidos en `index.html`)
- JavaScript de lado del cliente (`src/app.js`)
- [PDF.js](https://mozilla.github.io/pdf.js/) (CDN) para renderizar el PDF en canvas
- Canvas HTML5 para las páginas del menú
- Animaciones CSS 3D para el efecto de pasar página
- Node.js para el script de generación del código QR
- Paquete NPM [`qrcode`](https://www.npmjs.com/package/qrcode) para crear la imagen PNG del código QR
- Netlify como hosting estático (URL pública del sitio)

## Estructura del proyecto

- `index.html` – Página principal:
  - En pantallas grandes (desktop / tablet) muestra un visor tipo libro con 2 páginas a la vez y animación de flip.
  - En teléfonos redirige directamente al PDF nativo del navegador para usar el zoom integrado (pinch‑to‑zoom).
- `src/app.js` – Lógica del visor personalizado:
  - Carga el PDF con PDF.js desde `public/asset/LasTejas - Menu.pdf`.
  - En escritorio muestra dos páginas a la vez (spread) y permite navegar hacia adelante y atrás con animación de página de libro.
  - Se adapta al ancho de la ventana para que las páginas entren en pantalla.
- `public/asset/LasTejas - Menu.pdf` – Documento PDF del menú del restaurante.
- `generate-qr.js` – Script Node.js para generar el código QR que apunta a la URL pública del sitio en Netlify.
- `public/asset/menu-qr.png` – Imagen PNG generada con el código QR (se crea al ejecutar el script).
- `package.json` – Configuración mínima de NPM con el script para generar el QR y la dependencia `qrcode`.

## Cómo ejecutar el visor localmente

1. Situarse en la carpeta del proyecto:
   ```bash
   cd lasTejas-QR
   ```
2. Levantar un servidor estático (ejemplo usando `npx serve`):
   ```bash
   npx serve .
   ```
3. Abrir en el navegador la URL que indique el comando (por ejemplo `http://localhost:3000`).
   - En escritorio verás el flipbook con dos páginas.
   - Si el ancho de la ventana es pequeño, el navegador puede abrir directamente el PDF según la lógica de `index.html`.

> Nota: abrir `index.html` directamente como archivo (`file://`) puede causar problemas con PDF.js, por eso se recomienda usar un servidor (local o Netlify).

## Cómo generar el código QR

1. Asegúrate de tener Node.js instalado.
2. Edita la constante `urlToEncode` en `generate-qr.js` para que apunte a la URL pública de tu sitio en Netlify, por ejemplo:
   ```js
   const urlToEncode = "https://cool-cocada-dedd56.netlify.app/";
   ```
3. Desde la carpeta del proyecto, ejecuta:
   ```bash
   npm install
   npm run generate-qr
   ```
4. Se generará la imagen del código QR en:
   - `public/asset/menu-qr.png`

Ese PNG se puede imprimir o colocar en el restaurante para que los clientes escaneen y accedan directamente al menú digital.
