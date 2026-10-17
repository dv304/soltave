import { animate, hover, inView, press, scroll, stagger } from "motion";

/*
 * Todas las animaciones de la página. Astro manda este archivo como un único script al navegador;
 * los componentes solo marcan sus elementos con atributos:
 *   data-hero      → entra al cargar la página (hero)
 *   data-letter    → letras del nombre que suben una tras otra
 *   data-reveal    → aparece al entrar en pantalla
 *   data-stagger   → sus hijos aparecen en cascada al entrar en pantalla
 *   data-button    → crece un poco al pasar el cursor y se encoge al presionar
 */

const reduceMotion = document.documentElement.classList.contains("reduce-motion");
const spring = { type: "spring", stiffness: 260, damping: 22 } as const;

// --- Hero: el logo aparece y "saluda", las letras suben con los colores de la mano ---
function heroIntro() {
  if (reduceMotion) return;
  const logo = document.getElementById("hero-logo");
  const letters = document.querySelectorAll<HTMLElement>("[data-letter]");
  const others = [...document.querySelectorAll<HTMLElement>("[data-hero]")].filter((el) => el !== logo);

  if (logo) {
    animate(logo, { opacity: [0, 1], scale: [0.4, 1] }, spring);
    // Se inclina desde la base, como una mano que saluda.
    animate(logo, { rotate: [0, -12, 10, -6, 0] }, { duration: 0.9, delay: 0.35, ease: "easeInOut" });
  }
  letters.forEach((letter, i) => {
    animate(
      letter,
      { opacity: [0, 1], y: [40, 0], rotate: [i % 2 ? 18 : -18, 0], scale: [0.6, 1] },
      { ...spring, delay: 0.25 + i * 0.06 },
    );
  });
  animate(others, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: stagger(0.08, { startDelay: 0.5 }) });

  // Los teléfonos flotan suavemente y se separan un poco al hacer scroll.
  const back = document.getElementById("hero-phone-back");
  const front = document.getElementById("hero-phone-front");
  if (front) animate(front, { y: [0, -10, 0] }, { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 });
  if (back) animate(back, { y: [0, 8, 0] }, { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 });
  const hero = document.getElementById("inicio");
  if (hero && back) scroll(animate(back, { x: [0, 30] }), { target: hero, offset: ["start start", "end start"] });
}

// --- Apariciones al entrar en pantalla ---
function reveals() {
  if (reduceMotion) return;
  inView(
    "[data-reveal]",
    (el) => {
      animate(el, { opacity: [0, 1], y: [32, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    },
    { amount: 0.25 },
  );
  inView(
    "[data-stagger]",
    (el) => {
      animate(Array.from(el.children), { opacity: [0, 1], y: [40, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: stagger(0.1) });
    },
    { amount: 0.2 },
  );
}

// --- Botones y tarjetas: hover y presión ---
function interactions() {
  if (reduceMotion) return;
  hover("[data-button]", (el) => {
    animate(el, { scale: 1.04 }, spring);
    return () => animate(el, { scale: 1 }, spring);
  });
  press("[data-button]", (el) => {
    animate(el, { scale: 0.96 }, { duration: 0.12 });
    return () => animate(el, { scale: 1 }, spring);
  });
  hover("[data-card]", (el) => {
    animate(el, { y: -6 }, spring);
    return () => animate(el, { y: 0 }, spring);
  });
}

// --- «Pruébala»: interruptor de modo claro/oscuro del teléfono simulado ---
function screenModeToggle() {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-mode-btn]");
  const phone = document.querySelector<HTMLElement & { __sim?: { setTheme(t: string): void } }>("#try-phone [data-sim]");
  if (!phone) return;
  const sync = (mode: string) => buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.modeBtn === mode)));
  buttons.forEach((btn) => btn.addEventListener("click", () => phone.__sim?.setTheme(btn.dataset.modeBtn!)));
  // El tema también se cambia desde Ajustes, dentro de la app.
  phone.addEventListener("sim:theme", (e) => sync((e as CustomEvent<string>).detail));
}

heroIntro();
reveals();
interactions();
screenModeToggle();
