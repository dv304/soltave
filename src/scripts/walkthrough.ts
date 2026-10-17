import { animate, createDrawable, utils } from "animejs";

/*
 * Recorrido con scroll (anime.js):
 *  - al entrar la sección, el contorno del teléfono se dibuja;
 *  - al llegar a cada paso, la pantalla cambia con un deslizamiento, el marco de color se borra, se mueve a la
 *    función que se explica y se vuelve a dibujar, y el teléfono se inclina un poco hacia un lado.
 */
const section = document.getElementById("paso-a-paso");

if (section) {
  const reduce = document.documentElement.classList.contains("reduce-motion");
  const d = (ms: number) => (reduce ? 0 : ms);

  // Medidas del área de pantalla en el SVG (deben coincidir con Walkthrough.astro)
  const PAD = 16, SW = 368, SH = 856;

  const images = [...section.querySelectorAll<SVGImageElement>("[data-wt-img]")];
  const steps = [...section.querySelectorAll<HTMLElement>("[data-wt-step]")];
  const cards = steps.map((s) => s.querySelector<HTMLElement>("[data-wt-card]")!);
  const dots = [...section.querySelectorAll<HTMLButtonElement>("[data-wt-dot]")];
  const count = document.getElementById("wt-count")!;
  const hl = document.getElementById("wt-hl") as unknown as SVGRectElement;
  const ring = document.getElementById("wt-ring") as unknown as SVGCircleElement;
  const dot = document.getElementById("wt-dot") as unknown as SVGCircleElement;
  const phone = document.getElementById("wt-phone-g");
  const hole = document.getElementById("wt-hole") as unknown as SVGRectElement;
  const spot = document.getElementById("wt-spot") as unknown as SVGRectElement;
  const [hlDrawable] = createDrawable(hl);

  let current = -1;
  let centered = 0; // paso que está cruzando el centro de la ventana
  let started = false; // ya terminó la animación de entrada

  /** Pone el marco y el punto de aviso en la zona [x, y, ancho, alto] (fracciones de la pantalla). */
  function placeHighlight(i: number) {
    const [fx, fy, fw, fh] = steps[i].dataset.hl!.split(",").map(Number);
    const color = steps[i].dataset.color!;
    const x = PAD + fx * SW, y = PAD + fy * SH, w = fw * SW, h = fh * SH;
    utils.set(hl, { x, y, width: w, height: h, stroke: color });
    utils.set(hole, { x, y, width: w, height: h });
    utils.set([ring, dot], { cx: x + w - 4, cy: y + 4 });
    utils.set(ring, { stroke: color });
    utils.set(dot, { fill: color });
  }

  function go(i: number) {
    if (i === current || i < 0 || i >= steps.length) return;
    const prev = current;
    current = i;

    // Pantalla: la anterior sube y se desvanece; la nueva entra desde abajo.
    if (prev >= 0) animate(images[prev], { opacity: 0, translateY: -30, duration: d(450), ease: "inQuad" });
    animate(images[i], { opacity: [0, 1], translateY: [50, 0], duration: d(750), ease: "outExpo" });

    // Foco: se aclara mientras cambia de lugar y vuelve a oscurecer el resto de la pantalla.
    // El primer paso ya es una captura del recorrido de la app (con su propio foco), así que ahí no se oscurece.
    animate(spot, { opacity: 0, duration: d(prev < 0 ? 0 : 250), ease: "inQuad" });
    animate(spot, { opacity: i === 0 ? 0 : 0.5, duration: d(700), delay: d(prev < 0 ? 300 : 500), ease: "outQuad" });

    // Marco: se borra, cambia de lugar y se vuelve a dibujar.
    animate(hlDrawable, {
      draw: "1 1",
      duration: d(prev < 0 ? 0 : 250),
      ease: "inQuad",
      onComplete: () => {
        placeHighlight(i);
        animate(hlDrawable, { draw: ["0 0", "0 1"], duration: d(900), delay: d(150), ease: "inOutSine" });
        animate(dot, { scale: [0, 1], duration: d(500), delay: d(700), ease: "outBack(3)" });
      },
    });

    // El teléfono se inclina un poco hacia un lado y hacia el otro en cada paso.
    if (phone) animate(phone, { rotate: i % 2 ? 1.6 : -1.6, duration: d(900), ease: "inOutQuad" });

    // Texto y progreso
    cards.forEach((c, k) => (c.style.opacity = k === i ? "1" : "0.35"));
    animate(cards[i], { scale: [0.96, 1], duration: d(500), ease: "outQuad" });
    dots.forEach((b, k) => (k === i ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
    count.textContent = `Paso ${i + 1} de ${steps.length}`;
  }

  // Estado inicial: el marco empieza borrado hasta que la sección entra en pantalla.
  placeHighlight(0);
  utils.set(hlDrawable, { draw: "0 0" });
  utils.set(dot, { scale: 0 });
  cards.forEach((c, k) => (c.style.opacity = k === 0 ? "1" : "0.35"));
  dots[0]?.setAttribute("aria-current", "step");

  // El anillo alrededor del punto late todo el tiempo.
  if (!reduce) animate(ring, { scale: [1, 2.2], opacity: [0.8, 0], duration: 1400, loop: true, ease: "outQuad" });
  else utils.set(ring, { opacity: 0 });

  // Al entrar la sección: se dibuja el contorno del teléfono y arranca el paso 1.
  const intro = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      intro.disconnect();
      animate(createDrawable(".wt-outline"), { draw: ["0 0", "0 1"], duration: d(1400), ease: "inOutQuart" });
      animate("#wt-body", { opacity: [0.4, 1], duration: d(900), ease: "outQuad" });
      setTimeout(() => {
        started = true;
        go(centered);
      }, d(600));
    },
    { threshold: 0.3 },
  );
  // Se observa el teléfono y no la sección completa: la sección es más alta que la pantalla.
  intro.observe(document.getElementById("wt-phone")!);

  // El paso activo es el de la tarjeta que cruza la línea de lectura: el centro de la ventana en computador, y en
  // celular la zona de abajo, porque arriba está el teléfono fijo.
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        centered = Number((e.target as HTMLElement).closest<HTMLElement>("[data-wt-step]")!.dataset.wtStep);
        if (started) go(centered);
      });
    },
    { rootMargin: wide ? "-45% 0px -45% 0px" : "-72% 0px -24% 0px" },
  );
  cards.forEach((c) => observer.observe(c));

  // Los puntos de progreso llevan al paso correspondiente.
  dots.forEach((b, k) => b.addEventListener("click", () => steps[k].scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })));
}
