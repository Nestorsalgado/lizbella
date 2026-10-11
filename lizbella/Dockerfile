# ============================================
# Dockerfile para la web Liz-Bella
# Construye una imagen propia: nginx + la web dentro
# ============================================

# 1. Imagen BASE: de qué partimos. nginx ligero (alpine = mini Linux)
FROM nginx:alpine

# 2. Copiar NUESTRA web dentro de la imagen
#    De: el contenido de esta carpeta (.)
#    A:  la carpeta donde nginx sirve las webs
COPY . /usr/share/nginx/html

# 3. Documentar que el contenedor usa el puerto 80
EXPOSE 80

# (nginx ya arranca solo, no hace falta decirle el comando de inicio)
