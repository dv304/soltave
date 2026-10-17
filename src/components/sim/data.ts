/*
 * Datos del simulador de la app: los mismos textos y ejercicios del código de Soltá Ve (Exercises.kt)
 * y las manos ilustradas exportadas de Figma como trazos SVG.
 *
 * Cada trazo: [d, stroke, fill, strokeWidth, opacity]. Los colores de la figura se cambian por variables CSS
 * (ver figColor) para que la mano sea durazno en modo claro y clara en modo oscuro, como en la app.
 */

export type Stroke = [string, string, string, number, string];
export interface Pose { vb: string; p: Stroke[] }

const KNUCKLE = (d: string): Stroke => [d, "", "ink", 0, "0.18"];

export const POSES: Record<string, Pose> = {
  abierta: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L177.9 71.1", "#E9A47F", "", 14.6, ""], ["M177.9 71.1L182.2 52.3", "#E9A47F", "", 13.9, ""],
    ["M157.6 94.1L159.4 66.4", "#E9A47F", "", 14.6, ""], ["M159.4 66.4L160.9 43.8", "#E9A47F", "", 13.9, ""],
    ["M142.4 94.1L139.8 67.9", "#E9A47F", "", 14.6, ""], ["M139.8 67.9L137.6 46.4", "#E9A47F", "", 13.9, ""],
    ["M127.3 94.1L122.1 73.9", "#E9A47F", "", 14.6, ""], ["M122.1 73.9L117.9 57.5", "#E9A47F", "", 13.9, ""],
    ["M176.5 123.4L200.2 109", "#E9A47F", "", 17.1, ""], ["M200.2 109L216.5 93.3", "#E9A47F", "", 15.1, ""],
  ] },
  puno: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L172.7 81.5", "#FF5A3C", "", 14.6, ""], ["M172.7 81.5L172.7 114.2", "#FF5A3C", "", 13.9, ""],
    ["M157.6 94.1L157.6 81.5", "#FF5A3C", "", 14.6, ""], ["M157.6 81.5L157.6 114.2", "#FF5A3C", "", 13.9, ""],
    ["M142.4 94.1L142.4 81.5", "#FF5A3C", "", 14.6, ""], ["M142.4 81.5L142.4 114.2", "#FF5A3C", "", 13.9, ""],
    ["M127.3 94.1L127.3 81.5", "#FF5A3C", "", 14.6, ""], ["M127.3 81.5L127.3 114.2", "#FF5A3C", "", 13.9, ""],
    ["M176.5 123.4L159.5 101.5", "#E9A47F", "", 17.1, ""], ["M159.5 101.5L137.4 106.7", "#E9A47F", "", 15.1, ""],
  ] },
  abanico: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L180.7 71.9", "#FF5A3C", "", 14.6, ""], ["M180.7 71.9L187.3 53.9", "#FF5A3C", "", 13.9, ""],
    ["M157.6 94.1L160.5 66.5", "#FF5A3C", "", 14.6, ""], ["M160.5 66.5L162.8 44", "#FF5A3C", "", 13.9, ""],
    ["M142.4 94.1L138.3 68.1", "#FF5A3C", "", 14.6, ""], ["M138.3 68.1L134.9 46.8", "#FF5A3C", "", 13.9, ""],
    ["M127.3 94.1L119.2 74.9", "#FF5A3C", "", 14.6, ""], ["M119.2 74.9L112.6 59.3", "#FF5A3C", "", 13.9, ""],
    ["M176.5 123.4L202.5 113.9", "#FF5A3C", "", 17.1, ""], ["M202.5 113.9L222.5 103.2", "#FF5A3C", "", 15.1, ""],
  ] },
  juntos: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L172.3 70.5", "#E9A47F", "", 14.6, ""], ["M172.3 70.5L172 51", "#E9A47F", "", 13.9, ""],
    ["M157.6 94.1L157.6 66.3", "#E9A47F", "", 14.6, ""], ["M157.6 66.3L157.6 43.7", "#E9A47F", "", 13.9, ""],
    ["M142.4 94.1L142.8 67.7", "#E9A47F", "", 14.6, ""], ["M142.8 67.7L143 46.2", "#E9A47F", "", 13.9, ""],
    ["M127.3 94.1L128 73.3", "#E9A47F", "", 14.6, ""], ["M128 73.3L128.4 56.4", "#E9A47F", "", 13.9, ""],
    ["M176.5 123.4L195.6 106.6", "#E9A47F", "", 17.1, ""], ["M195.6 106.6L205.5 89.3", "#E9A47F", "", 15.1, ""],
  ] },
  indice: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L170.8 70.1", "#A68FE3", "", 14.6, ""], ["M170.8 70.1L168.9 76.4", "#A68FE3", "", 13.9, ""],
    ["M157.6 94.1L158 66.3", "#6FD08C", "", 14.6, ""], ["M158 66.3L158.4 43.7", "#6FD08C", "", 13.9, ""],
    ["M142.4 94.1L141.5 67.7", "#F5B841", "", 14.6, ""], ["M141.5 67.7L140.8 46.2", "#F5B841", "", 13.9, ""],
    ["M127.3 94.1L125.9 73.3", "#5BB4EA", "", 14.6, ""], ["M125.9 73.3L124.7 56.4", "#5BB4EA", "", 13.9, ""],
    ["M176.5 123.4L180.4 96", "#FF5A3C", "", 17.1, ""], ["M180.4 96L168.9 76.4", "#FF5A3C", "", 15.1, ""],
  ] },
  medio: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L174.3 70.6", "#A68FE3", "", 14.6, ""], ["M174.3 70.6L175.7 51.3", "#A68FE3", "", 13.9, ""],
    ["M157.6 94.1L158.2 72.6", "#6FD08C", "", 14.6, ""], ["M158.2 72.6L158.8 81.5", "#6FD08C", "", 13.9, ""],
    ["M142.4 94.1L141.5 67.7", "#F5B841", "", 14.6, ""], ["M141.5 67.7L140.8 46.2", "#F5B841", "", 13.9, ""],
    ["M127.3 94.1L125.9 73.3", "#5BB4EA", "", 14.6, ""], ["M125.9 73.3L124.7 56.4", "#5BB4EA", "", 13.9, ""],
    ["M176.5 123.4L176.5 95.7", "#FF5A3C", "", 17.1, ""], ["M176.5 95.7L158.8 81.5", "#FF5A3C", "", 15.1, ""],
  ] },
  anular: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L174.3 70.6", "#A68FE3", "", 14.6, ""], ["M174.3 70.6L175.7 51.3", "#A68FE3", "", 13.9, ""],
    ["M157.6 94.1L158 66.3", "#6FD08C", "", 14.6, ""], ["M158 66.3L158.4 43.7", "#6FD08C", "", 13.9, ""],
    ["M142.4 94.1L146.2 75.2", "#F5B841", "", 14.6, ""], ["M146.2 75.2L150 86.5", "#F5B841", "", 13.9, ""],
    ["M127.3 94.1L125.9 73.3", "#5BB4EA", "", 14.6, ""], ["M125.9 73.3L124.7 56.4", "#5BB4EA", "", 13.9, ""],
    ["M176.5 123.4L170.4 96.3", "#FF5A3C", "", 17.1, ""], ["M170.4 96.3L150 86.5", "#FF5A3C", "", 15.1, ""],
  ] },
  menique: { vb: "0 0 300 214", p: [
    ["M150 122.3V174.2", "#F2C9AE", "", 42.8, ""],
    ["M136.1 89H163.9C173.6 89 181.5 96.9 181.5 106.7V126.8C181.5 136.6 173.6 144.5 163.9 144.5H136.1C126.4 144.5 118.5 136.6 118.5 126.8V106.7C118.5 96.9 126.4 89 136.1 89Z", "", "#E9A47F", 0, ""],
    ["M172.7 94.1L174.3 70.6", "#A68FE3", "", 14.6, ""], ["M174.3 70.6L175.7 51.3", "#A68FE3", "", 13.9, ""],
    ["M157.6 94.1L158 66.3", "#6FD08C", "", 14.6, ""], ["M158 66.3L158.4 43.7", "#6FD08C", "", 13.9, ""],
    ["M142.4 94.1L141.5 67.7", "#F5B841", "", 14.6, ""], ["M141.5 67.7L140.8 46.2", "#F5B841", "", 13.9, ""],
    ["M127.3 94.1L134.9 77.7", "#5BB4EA", "", 14.6, ""], ["M134.9 77.7L142.4 91.5", "#5BB4EA", "", 13.9, ""],
    ["M176.5 123.4L164 98.6", "#FF5A3C", "", 17.1, ""], ["M164 98.6L142.4 91.5", "#FF5A3C", "", 15.1, ""],
  ] },
  plana: { vb: "0 0 300 214", p: [
    ["M44.2 143H99.6", "#F2C9AE", "", 37.8, ""],
    ["M119 154.3L142.3 163.7", "#E9A47F", "", 17.6, ""], ["M142.3 163.7L159.8 173.8", "#E9A47F", "", 15.6, ""],
    ["M99.6 143H160.1", "#E9A47F", "", 40.3, ""], ["M160.1 143H191.6", "#E9A47F", "", 21.4, ""],
    ["M191.6 143H213", "#E9A47F", "", 19.7, ""], ["M213 143H229.4", "#E9A47F", "", 17.6, ""],
  ] },
  gancho: { vb: "0 0 300 214", p: [
    ["M44.2 143H99.6", "#F2C9AE", "", 37.8, ""],
    ["M119 154.3L142.3 163.7", "#E9A47F", "", 17.6, ""], ["M142.3 163.7L159.8 173.8", "#E9A47F", "", 15.6, ""],
    ["M99.6 143H160.1", "#E9A47F", "", 40.3, ""], ["M160.1 143H191.6", "#FF5A3C", "", 21.4, ""],
    ["M191.6 143L189.7 164.3", "#FF5A3C", "", 19.7, ""], ["M189.7 164.3L173.4 165.7", "#FF5A3C", "", 17.6, ""],
  ] },
  punoLado: { vb: "0 0 300 214", p: [
    ["M44.2 143H99.6", "#F2C9AE", "", 37.8, ""],
    ["M119 154.3L135.2 173.6", "#E9A47F", "", 17.6, ""], ["M135.2 173.6L155.3 173.6", "#E9A47F", "", 15.6, ""],
    ["M99.6 143H160.1", "#E9A47F", "", 40.3, ""], ["M160.1 143L160.1 174.5", "#FF5A3C", "", 21.4, ""],
    ["M160.1 174.5L138.7 172.6", "#FF5A3C", "", 19.7, ""], ["M138.7 172.6L133.1 157.2", "#FF5A3C", "", 17.6, ""],
  ] },
  extension: { vb: "0 0 300 214", p: [
    ["M44.2 143H99.6", "#F2C9AE", "", 37.8, ""],
    ["M120 133.6L141.8 121", "#E9A47F", "", 17.6, ""], ["M141.8 121L160.5 113.5", "#E9A47F", "", 15.6, ""],
    ["M99.6 143L134.3 93.4", "#FF5A3C", "", 40.3, ""], ["M134.3 93.4L152.4 67.6", "#E9A47F", "", 21.4, ""],
    ["M152.4 67.6L164.6 50.1", "#E9A47F", "", 19.7, ""], ["M164.6 50.1L174 36.6", "#E9A47F", "", 17.6, ""],
  ] },
  palma: { vb: "0 0 330 237", p: [
    ["M110 133.5L222.2 229.2L221.9 240.7L110.3 142.6L110 133.5Z", "", "table", 0, "0.55"],
    ["M110 133.5L266.1 109.3L411.4 187.9L222.2 229.2L110 133.5Z", "", "table", 0, "0.4"],
    ["M224.7 233.4L220 398.9", "table", "", 8, "0.55"], ["M121.1 144.6L123.7 280.8", "table", "", 8, "0.55"],
    ["M96.4 180.6L104.6 338.7", "table", "", 21.3, "0.7"], ["M112.7 197.3L121.5 363.5", "table", "", 22.3, "0.7"],
    ["M124.7 126L137.3 171.7", "#E9A47F", "", 11.7, ""],
    ["M121.1 71.9L124.7 126", "#A68FE3", "", 15.4, "0.85"],
    ["M121.1 71.9L152.2 92.3L112.7 197.3L96.4 180.6L121.1 71.9Z", "", "#A68FE3", 0, "0.85"],
    ["M104.4 188.7L135.9 75", "#A68FE3", "", 46, "0.85"],
    ["M170.5 142.6L199.2 178.7", "#E9A47F", "", 13.5, ""], ["M135.9 75L140 58.6", "#E9A47F", "", 14, ""],
    ["M148.1 59.3C159.1 59.3 168.1 50.4 168.1 39.3C168.1 28.3 159.1 19.3 148.1 19.3C137 19.3 128 28.3 128 39.3C128 50.4 137 59.3 148.1 59.3Z", "", "#E9A47F", 0, ""],
    ["M152.2 92.3L170.5 142.6", "#A68FE3", "", 16.9, "0.85"],
    ["M213.6 175.4L227.5 172.1", "#E9A47F", "", 4.9, ""], ["M199 177.4L208.2 172.3", "#E9A47F", "", 5.8, ""],
    ["M215.9 177.1L232.3 173.8", "#E9A47F", "", 4.9, ""], ["M218.3 178.9L234.2 176.1", "#E9A47F", "", 4.9, ""],
    ["M195 178.2L212.3 174.4L222 181.7L203.3 184.7L195 178.2Z", "", "#E9A47F", 0, ""],
    ["M220.7 180.7L234.2 178.7", "#E9A47F", "", 5, ""],
  ] },
  dorso: { vb: "0 0 330 237", p: [
    ["M110 133.5L222.2 229.2L221.9 240.7L110.3 142.6L110 133.5Z", "", "table", 0, "0.55"],
    ["M110 133.5L266.1 109.3L411.4 187.9L222.2 229.2L110 133.5Z", "", "table", 0, "0.4"],
    ["M224.7 233.4L220 398.9", "table", "", 8, "0.55"], ["M121.1 144.6L123.7 280.8", "table", "", 8, "0.55"],
    ["M96.4 180.6L104.6 338.7", "table", "", 21.3, "0.7"], ["M112.7 197.3L121.5 363.5", "table", "", 22.3, "0.7"],
    ["M124.7 126L137.3 171.7", "#E9A47F", "", 11.7, ""],
    ["M121.1 71.9L124.7 126", "#A68FE3", "", 15.4, "0.85"],
    ["M121.1 71.9L152.2 92.3L112.7 197.3L96.4 180.6L121.1 71.9Z", "", "#A68FE3", 0, "0.85"],
    ["M104.4 188.7L135.9 75", "#A68FE3", "", 46, "0.85"],
    ["M183.4 140.4L223.1 174.2", "#E9A47F", "", 13.4, ""], ["M135.9 75L140 58.6", "#E9A47F", "", 14, ""],
    ["M148.1 59.3C159.1 59.3 168.1 50.4 168.1 39.3C168.1 28.3 159.1 19.3 148.1 19.3C137 19.3 128 28.3 128 39.3C128 50.4 137 59.3 148.1 59.3Z", "", "#E9A47F", 0, ""],
    ["M152.2 92.3L183.4 140.4", "#A68FE3", "", 16.8, "0.85"],
    ["M214.8 174.4L198.5 167.9", "#E9A47F", "", 5.8, ""], ["M201.7 177.6L186 179.9", "#E9A47F", "", 5, ""],
    ["M204 179.4L186.6 182.4", "#E9A47F", "", 5, ""], ["M206.3 181.2L190.3 184.4", "#E9A47F", "", 5, ""],
    ["M218.7 173.7L200.5 176.6L209.9 184L227.4 180.1L218.7 173.7Z", "", "#E9A47F", 0, ""],
    ["M208.6 183L196.1 186.1", "#E9A47F", "", 5, ""],
  ] },
};

/** Colores de la figura → variables CSS del simulador (cambian con el modo claro u oscuro). */
export function figColor(c: string): string {
  switch (c) {
    case "#E9A47F": return "var(--fig)";
    case "#F2C9AE": return "var(--fig-dim)";
    case "table": return "var(--s-dim)";
    case "ink": return "var(--s-text)";
    default: return c;
  }
}

export interface ExerciseData {
  id: string;
  title: string;
  subtitle: string;
  minutes: string;
  color: string;
  done: boolean;
  icon: "hand" | "fan" | "wave" | "stretch" | "pinch";
  tech: string;
  description: string;
  benefits: string[];
  poses: string[];
  labels: string[];
  hints: string[];
  /** Tarjeta del tutorial: chip con el resumen */
  chip: string;
  rounds: number;
  phaseSeconds: number;
  colorByFinger?: boolean;
}

// Mismos ejercicios, textos y orden que la app.
export const EXERCISES: ExerciseData[] = [
  {
    id: "apertura_cierre", title: "Abre y cierra la mano", subtitle: "15 repeticiones", minutes: "~2 min", color: "#FF5A3C", done: true, icon: "hand",
    tech: "Apertura y cierre de mano",
    description: "Cierra la mano en un puño suave y luego ábrela estirando bien todos los dedos. Hazlo frente a la cámara: la app reconoce tu mano y cuenta cada repetición por ti.",
    benefits: ["Movilidad de dedos", "Circulación", "Calentamiento"],
    poses: ["abierta", "puno"], labels: ["Mano abierta", "Puño"],
    hints: ["Estira bien todos los dedos, con la mano abierta.", "Cierra la mano en un puño suave, sin apretar."],
    chip: "15 repeticiones", rounds: 15, phaseSeconds: 2,
  },
  {
    id: "separacion_dedos", title: "Dedos en abanico", subtitle: "2 posturas · 8 rondas", minutes: "~48 s", color: "#A68FE3", done: true, icon: "fan",
    tech: "Separación de dedos",
    description: "Con la palma apoyada sobre la mesa, separa los dedos lo más que puedas sin dolor, como un abanico, y vuelve a juntarlos. La app te marca el ritmo: 3 segundos abiertos y 3 juntos.",
    benefits: ["Fuerza de la mano", "Control de los dedos"],
    poses: ["abanico", "juntos"], labels: ["Abre los dedos", "Junta los dedos"],
    hints: ["Separa los dedos lo más que puedas sin dolor, como un abanico, y sostén.", "Vuelve a juntar los dedos, estirados y relajados."],
    chip: "2 posturas · 8 rondas", rounds: 8, phaseSeconds: 3,
  },
  {
    id: "deslizamiento_nervio", title: "Cuatro posturas para el nervio", subtitle: "4 posturas · 3 rondas", minutes: "~36 s", color: "#F5B841", done: true, icon: "wave",
    tech: "Deslizamiento del nervio mediano",
    description: "Pasa por cuatro posturas seguidas: mano plana, gancho, puño y muñeca extendida, 3 segundos cada una. Ayuda a que el nervio de la muñeca se deslice con suavidad dentro del túnel carpiano. Si sientes hormigueo fuerte, detente.",
    benefits: ["Alivia el hormigueo", "Menos rigidez"],
    poses: ["plana", "gancho", "punoLado", "extension"], labels: ["Mano plana", "Gancho", "Puño", "Extensión"],
    hints: ["Mano abierta y recta, con los dedos juntos y estirados.", "Dobla solo las puntas de los dedos, como una garra. Los nudillos quedan rectos.", "Cierra la mano en un puño suave, con el pulgar por fuera.", "Abre la mano y lleva la muñeca hacia atrás, con los dedos estirados."],
    chip: "4 posturas · 3 rondas", rounds: 3, phaseSeconds: 3,
  },
  {
    id: "estiramiento_muneca", title: "Estira la muñeca", subtitle: "2 posturas · 30 s · 2 series", minutes: "~2 min", color: "#6FD08C", done: false, icon: "stretch",
    tech: "Estiramiento de flexores y extensores de muñeca",
    description: "Dos estiramientos con la mano apoyada en la mesa. Sobre la palma: dedos hacia adelante y el cuerpo un poco sobre la mano. Sobre el dorso: dedos hacia ti. Sostén cada uno 30 segundos, sin rebotar ni llegar al dolor.",
    benefits: ["Relaja el antebrazo", "Flexibilidad"],
    poses: ["palma", "dorso"], labels: ["Sobre la palma", "Sobre el dorso"],
    hints: ["Apoya la palma en la mesa con los dedos hacia adelante y lleva el cuerpo un poco sobre la mano.", "Apoya el dorso de la mano en la mesa con los dedos hacia ti y mantén el brazo recto."],
    chip: "2 posturas · 30 s · 2 series", rounds: 4, phaseSeconds: 5,
  },
  {
    id: "pinza_oposicion", title: "Pulgar a cada dedo", subtitle: "4 dedos · 3 rondas", minutes: "~36 s", color: "#5BB4EA", done: false, icon: "pinch",
    tech: "Pinza de oposición del pulgar",
    description: "Toca la punta de cada dedo con la punta del pulgar, del índice al meñique. La app te marca el ritmo: 3 segundos por dedo y pasa sola al siguiente. Es el gesto con el que sostienes un lápiz o un pincel.",
    benefits: ["Coordinación", "Precisión al agarrar"],
    poses: ["indice", "medio", "anular", "menique"], labels: ["Índice", "Medio", "Anular", "Meñique"],
    hints: ["Dobla el índice hasta que su punta toque la del pulgar, formando un círculo.", "Ahora baja el dedo medio hasta el pulgar.", "Ahora baja el anular hasta el pulgar.", "Y por último baja el meñique hasta el pulgar."],
    chip: "4 dedos · 3 rondas", rounds: 3, phaseSeconds: 3, colorByFinger: true,
  },
];

export const FINGER_COLORS = ["#A68FE3", "#6FD08C", "#F5B841", "#5BB4EA"];

// Consejos del día (tomados de la app)
export const TIPS = [
  { title: "Muñeca neutra", text: "Al dibujar o escribir, intenta que la muñeca quede recta, alineada con el antebrazo, sin doblarla hacia arriba ni hacia los lados." },
  { title: "Mouse a la altura del codo", text: "Coloca el mouse y el teclado a la altura de tus codos, cerca del cuerpo, para no estirar el brazo." },
  { title: "Pausas cada 45 minutos", text: "Cada 45 minutos suelta la herramienta, abre y cierra la mano unas veces y mueve la muñeca en círculos." },
  { title: "Agarre suave", text: "Sostén el lápiz o el pincel sin apretar: un agarre suave cansa menos los tendones de la mano." },
];
