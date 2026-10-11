# YAML — Guía de referencia

> YAML es el idioma de la configuración en DevOps.
> Lo usan: Docker Compose, GitHub Actions, Kubernetes, Ansible, y más.
> Aprenderlo una vez sirve para todo.

---

## Para qué sirve

Representar configuración legible usando 2 ideas:
1. Pares clave-valor
2. Listas
Organizadas con INDENTACIÓN (espacios) para mostrar jerarquía.

---

## Regla 1 — Clave y valor

```yaml
nombre: Nestor
edad: 30
```
Siempre UN ESPACIO después de los dos puntos.
- `nombre:Nestor`  ❌ mal
- `nombre: Nestor` ✅ bien

---

## Regla 2 — Indentación = jerarquía (LA MÁS IMPORTANTE)

```yaml
persona:
  nombre: Nestor
  edad: 30
```
`nombre` y `edad` están DENTRO de `persona` por los 2 espacios.

⚠️ REGLA DE ORO: solo ESPACIOS, nunca TAB.
Usa 2 espacios por nivel. El Tab rompe YAML. Es el error nº1.

---

## Regla 3 — Listas (con guion)

```yaml
frutas:
  - manzana
  - pera
  - platano
```
Cada `-` es un elemento de la lista.

---

## Regla 4 — Listas de objetos (lo más común en la vida real)

```yaml
empleados:
  - nombre: Ana
    puesto: disenadora
  - nombre: Luis
    puesto: programador
```
El `-` marca dónde empieza cada objeto.
Las propiedades del mismo objeto se alinean entre sí.

---

## Tipos de valores

```yaml
texto: hola                    # string
numero: 42                     # número
decimal: 3.14                  # número
booleano: true                 # true / false
nulo: null                     # vacío
texto_con_espacios: "hola mundo"   # comillas si hay caracteres raros
texto_con_dos_puntos: "algo: raro" # comillas si el valor tiene :
```

Cuándo usar comillas:
- Si el valor tiene `:` dentro  → "8080:80"
- Si empieza por símbolos raros
- En la duda, las comillas no estorban.

---

## Listas en una línea (forma compacta)

```yaml
# forma larga
colores:
  - rojo
  - verde

# forma compacta (equivalente)
colores: [rojo, verde]
```

Objetos compactos:
```yaml
persona: { nombre: Ana, edad: 30 }
```

---

## Comentarios

```yaml
# esto es un comentario, YAML lo ignora
nombre: Nestor  # también se puede al final de una línea
```

---

## Errores más comunes (y cómo evitarlos)

1. Usar TAB en vez de espacios → el error nº1. Configura tu editor para espacios.
2. Olvidar el espacio tras los dos puntos: `clave:valor` ❌
3. Mala indentación (niveles desalineados).
4. Mezclar 2 y 4 espacios en el mismo archivo.
5. No poner comillas en valores con `:` → "clave: valor con : dentro"

---

## Cómo VALIDAR tu YAML

En la terminal (si tienes Python, que viene en Ubuntu):
```bash
python3 -c "import yaml,sys; yaml.safe_load(open('archivo.yml')); print('YAML válido')"
```

Para docker-compose específicamente:
```bash
docker compose -f docker-compose.yml config
```
Si hay error de sintaxis, te dice la línea.

Online: pegar en un validador YAML del navegador.

---

## Reconócelo en docker-compose

```yaml
services:                    # clave (objeto)
  lizbella:                  #   objeto dentro
    image: nginx:latest      #     clave: valor
    ports:                   #     clave con LISTA
      - "8080:80"            #       elemento de lista
    restart: unless-stopped  #     clave: valor
```

No es magia: clave-valor + listas + indentación.
