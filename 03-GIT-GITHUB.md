# Git + GitHub — Guía de referencia

> El hábito nº1 de DevOps: todo tu trabajo versionado en Git.

---

## Git vs GitHub

- **Git**: herramienta LOCAL en tu PC. Guarda la historia del proyecto. Funciona sin internet.
- **GitHub**: servicio en la NUBE donde subes una copia del repositorio Git. Para respaldo, colaboración y CI/CD.

Git = el motor.  GitHub = el lugar donde guardas/compartes.

---

## Las 3 zonas de Git (modelo mental clave)

```
WORKING DIRECTORY  →  STAGING AREA  →  REPOSITORY
(tu carpeta)          (git add)        (git commit)
"editas"              "preparas"       "guardas en la historia"
```

Analogía de la mudanza:
1. Tu cuarto con cosas = working directory (archivos editados)
2. Eliges qué meter en la caja = git add (staging)
3. Cierras y etiquetas la caja = git commit (guardado permanente)

---

## Conceptos

- **Repositorio (repo)**: carpeta que Git está rastreando (tiene una subcarpeta oculta `.git`).
- **Commit**: una "foto" del proyecto en un momento, con mensaje, autor y fecha.
- **Branch (rama)**: una línea de desarrollo. `main` es la principal.
- **Remote**: la copia en la nube (GitHub). Se suele llamar `origin`.
- **push**: subir commits locales → GitHub.
- **pull**: bajar cambios de GitHub → local.
- **clone**: copiar un repo de GitHub a tu PC.
- **.gitignore**: lista de archivos/carpetas que Git debe IGNORAR (no versionar).

---

## Configuración inicial (una sola vez por máquina)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
git config --global init.defaultBranch main
```

---

## Flujo de trabajo diario

```bash
git status                 # ¿qué ha cambiado?
git add archivo.txt        # preparar UN archivo
git add .                  # preparar TODO lo cambiado
git commit -m "mensaje"    # guardar en la historia
git log --oneline          # ver la historia de commits
git push                   # subir a GitHub
git pull                   # bajar de GitHub
```

---

## Primera vez con un repo

```bash
cd ~/mi-proyecto
git init                   # convierte la carpeta en repo Git
git add .                  # prepara todo
git commit -m "Primer commit"
# ... crear repo vacío en GitHub ...
git remote add origin https://github.com/USUARIO/REPO.git
git branch -M main
git push -u origin main    # subir por primera vez
```

---

## .gitignore (MUY importante)

Archivos que NUNCA deben subirse a Git:
- Contraseñas, tokens, llaves (.env, credenciales)
- Datos de contenedores (volúmenes)
- Archivos temporales, logs, node_modules

Ejemplo de `.gitignore`:
```
# Secretos
.env
*.key
*.pem

# Datos y temporales
*.log
data/
```

Regla de oro de seguridad (DevSecOps):
NUNCA subas contraseñas ni tokens a Git. Una vez subidos, quedan en la
historia para siempre, aunque los borres después.

---

## Buenos mensajes de commit

- Mal:  "cambios", "arreglos", "asdf"
- Bien: "Añadir sección de precios a la web"
- Bien: "Corregir enlace roto en el navbar"

Escribe el mensaje como si completara la frase:
"Si aplico este commit, va a ___"  →  "Añadir sección de precios"

---

## Comandos para 'viajar en el tiempo'

```bash
git log --oneline          # ver todos los commits (cada uno tiene un ID)
git diff                   # ver qué cambió desde el último commit
git checkout <id>          # ir a un commit anterior (mirar)
git restore archivo        # descartar cambios no guardados de un archivo
```
