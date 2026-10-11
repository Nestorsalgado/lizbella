# GitHub Actions — Anatomía de los workflows (YAML)

> Los workflows viven en:  .github/workflows/NOMBRE.yml
> Son YAML. Estructura: workflow → on → jobs → steps

---

## Jerarquía (muñecas rusas)

```
WORKFLOW
├── name          (nombre)
├── on            (CUÁNDO se ejecuta - el disparador)
└── jobs          (trabajos)
     └── <job>
          ├── runs-on   (en qué máquina)
          └── steps     (LISTA de pasos)
               ├── - name / run      (ejecutar comando)
               └── - name / uses     (usar acción pre-hecha)
```

---

## name — nombre del workflow

```yaml
name: Validar web
```

---

## on — el disparador (CUÁNDO)

```yaml
# en cualquier push
on: push

# push solo a main
on:
  push:
    branches: [ main ]

# push a main + pull requests a main
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# programado (cron): cada día a las 00:00
on:
  schedule:
    - cron: '0 0 * * *'

# manual (botón en la web)
on:
  workflow_dispatch:

# combinando varios
on:
  push:
    branches: [ main ]
  workflow_dispatch:
```

---

## jobs — los trabajos

```yaml
jobs:
  nombre-del-job:          # tú eliges el nombre
    runs-on: ubuntu-latest # la máquina (VM que GitHub presta)
    steps:
      - ...                # lista de pasos
```

Opciones de runs-on: ubuntu-latest, windows-latest, macos-latest.

---

## steps — los pasos (2 formas)

```yaml
steps:
  # FORMA A: run → ejecuta comandos de terminal (TUS instrucciones)
  - name: Saludar
    run: echo "Hola"

  # FORMA B: uses → usa una acción ya hecha (reutilizable)
  - name: Descargar código
    uses: actions/checkout@v4
```

- run  → comando(s) de bash
- uses → acción publicada por otros (formato: usuario/accion@version)
- name → descripción del paso (opcional, sale en logs)

Comandos de varias líneas:
```yaml
- name: Varios
  run: |
    echo "linea 1"
    echo "linea 2"
    ls -la
```

---

## Acciones útiles (uses) más comunes

```yaml
- uses: actions/checkout@v4            # descargar tu código (casi siempre va)
- uses: actions/setup-node@v4          # instalar Node.js
- uses: actions/setup-python@v5        # instalar Python
- uses: docker/build-push-action@v6    # construir y subir imagen Docker
- uses: docker/login-action@v3         # login a un registro Docker
```

---

## Variables y secretos

```yaml
# variable de entorno
env:
  MI_VARIABLE: valor

# usar un secreto (configurado en Settings > Secrets del repo)
# NUNCA pongas secretos en texto plano en el YAML
steps:
  - run: echo "token ${{ secrets.MI_TOKEN }}"
```

Regla DevSecOps: los secretos van en Settings → Secrets and variables,
nunca escritos en el archivo.

---

## jobs que dependen de otros

```yaml
jobs:
  construir:
    runs-on: ubuntu-latest
    steps: [...]

  desplegar:
    needs: construir      # espera a que "construir" termine OK
    runs-on: ubuntu-latest
    steps: [...]
```

---

## Workflow completo de ejemplo

```yaml
name: Ejemplo completo

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  validar:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar código
        uses: actions/checkout@v4

      - name: Saludar
        run: echo "Hola desde Actions"

      - name: Listar archivos
        run: ls -la
```

---

## Cómo depurar un workflow

- Pestaña "Actions" del repo → clic en la ejecución → clic en el job.
- Cada step se puede expandir para ver su salida.
- Si un step falla (exit distinto de 0), el job se marca en rojo y los
  siguientes steps NO se ejecutan (salvo que uses `if: always()`).
- `workflow_dispatch` permite relanzar a mano para probar.
```
