/** Ruta de un archivo de public/ con el prefijo del sitio (en GitHub Pages el sitio vive en /soltave/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

/** Enlace de descarga a un archivo publicado en la última «release» del repositorio en GitHub. */
export const release = (file: string) => `https://github.com/dv304/soltave/releases/latest/download/${file}`;

// Datos generales del sitio. Cambia aquí los enlaces de contacto.
export const site = {
  name: "Soltá Ve",
  tagline: "Soltá la mano, volvé a crear.",
  description:
    "App para Android y iPhone con ejercicios guiados para la muñeca y la mano. Usa la cámara del celular y detección de manos con MediaPipe, sin ningún aparato extra.",
  author: "Daniel Valderrama",
  contact: [
    // TODO: reemplaza estos enlaces por los reales antes de publicar.
    { label: "Correo", href: "mailto:correo@ejemplo.com" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};
