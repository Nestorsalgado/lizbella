# Liz-Bella · Renta de servicios para fiestas y eventos

Sitio web estático construido con HTML5 + Bootstrap 5 para **Liz-Bella**:
renta de cabinas de fotos, barras de todo tipo, espejos personalizados,
brincolines, bocinas y más.

Pensado para servirse desde un contenedor (Nginx/Apache) o desde un bucket de
Amazon S3 con hosting de sitios estáticos.

## Estructura del proyecto

```
lizbella/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos propios (Bootstrap va por CDN)
├── js/
│   └── main.js         # JavaScript propio
├── assets/
│   └── img/            # Imágenes locales (opcional)
└── README.md
```

Todas las rutas internas son **relativas** (`css/styles.css`, `js/main.js`),
por lo que el sitio funciona igual bajo un contenedor o como objeto en S3 sin
cambios.

## Desarrollo local

No requiere build. Abre `index.html` en el navegador o sírvelo con cualquier
servidor estático. Ejemplo con Python:

```bash
python3 -m http.server 8080
# luego abre http://localhost:8080
```

## Despliegue en Amazon S3

1. Crea el bucket y habilita "Static website hosting" con documento índice
   `index.html`.

2. Sube el contenido de esta carpeta (no la carpeta en sí) al bucket:

   ```bash
   aws s3 sync . s3://NOMBRE-DEL-BUCKET \
     --exclude "README.md" \
     --delete
   ```

3. (Opcional) Cabeceras de caché recomendadas: HTML corto, assets largos.

   ```bash
   # Assets con caché larga
   aws s3 sync css  s3://NOMBRE-DEL-BUCKET/css  --cache-control "max-age=31536000,public"
   aws s3 sync js   s3://NOMBRE-DEL-BUCKET/js   --cache-control "max-age=31536000,public"
   aws s3 sync assets s3://NOMBRE-DEL-BUCKET/assets --cache-control "max-age=31536000,public"

   # HTML sin caché agresiva
   aws s3 cp index.html s3://NOMBRE-DEL-BUCKET/index.html --cache-control "no-cache"
   ```

> Para producción se recomienda poner CloudFront delante del bucket (HTTPS y
> caché global) en lugar de exponer el bucket directamente.

## Notas

- Bootstrap 5.3.3 y Bootstrap Icons se cargan desde CDN, por lo que el
  navegador necesita salida a internet.
- Las imágenes de la galería vienen de Unsplash (CDN). Si prefieres imágenes
  propias, colócalas en `assets/img/` y cambia los `src` en `index.html`.
