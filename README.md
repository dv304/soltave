# Soltá Ve · Landing page

Página de presentación de **Soltá Ve**, la app para Android de ejercicios guiados para la muñeca con detección de manos (MediaPipe).

Hecha con **Astro**, **Tailwind CSS 4** y **Motion**.

## Comandos (pnpm)

Así se creó el proyecto:

```bash
pnpm create astro@latest . --template minimal --install --no-git
pnpm astro add tailwind
pnpm add motion
```

Para trabajar en él:

```bash
pnpm install      # instala dependencias (solo la primera vez)
pnpm dev          # servidor local en http://localhost:4321
pnpm build        # genera el sitio estático en dist/
pnpm preview      # revisa la versión compilada
```

## Estructura

```text
public/
  favicon.png
  img/logo.png          logo de la app
  img/app/              capturas de la app (nombre-claro.png / nombre-oscuro.png)
  img/tour/             capturas del recorrido guiado (paso-01.png …)
src/
  data/site.ts          nombre, textos y enlaces de contacto  ← cambia aquí los enlaces
  layouts/BaseLayout.astro   <head>, fuentes, estilos y el script de animaciones
  components/
    Header.astro        barra superior
    Hero.astro          encabezado con el logo y el nombre animados
    AppInfo.astro       cómo funciona (3 pilares + 3 pasos)
    Screens.astro       galería de pantallas con interruptor claro/oscuro
    MissionVision.astro misión y visión
    Footer.astro        llamado final y pie de página
    PhoneFrame.astro    marco de teléfono para las capturas
  scripts/animations.ts todas las animaciones con Motion
  styles/global.css     Tailwind + paleta y fuentes de la marca
```

## Cómo están hechas las animaciones

Astro genera HTML estático y no carga JavaScript en los componentes. Por eso las animaciones no viven dentro de cada
componente: los componentes solo **marcan** sus elementos con atributos, y un único script
(`src/scripts/animations.ts`, importado en el layout) los busca y los anima con la versión de JavaScript puro de Motion
(`animate`, `inView`, `hover`, `press`, `scroll`, `stagger`). No hace falta React.

| Atributo        | Qué hace                                                       |
| --------------- | -------------------------------------------------------------- |
| `data-hero`     | entra con un desvanecimiento al cargar la página               |
| `data-letter`   | letra del nombre que sube con su color, una tras otra          |
| `data-reveal`   | aparece al entrar en pantalla                                  |
| `data-stagger`  | sus hijos aparecen en cascada al entrar en pantalla            |
| `data-button`   | crece al pasar el cursor y se encoge al presionar              |
| `data-card`     | se eleva un poco al pasar el cursor                            |

Para animar un elemento nuevo basta con ponerle uno de estos atributos. Los elementos empiezan ocultos desde el CSS para
que no parpadeen, y si el usuario tiene activada la opción de **reducir el movimiento**, todo se muestra quieto.
