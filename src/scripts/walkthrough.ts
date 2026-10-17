import { animate } from "animejs";
import type { Sim } from "./sim";

/*
 * Recorrido con scroll: al llegar a cada paso, la app simulada del teléfono fijo va a la pantalla del paso,
 * hace la acción (abrir un ejercicio, empezar el temporizador, mostrar el recorrido) y resalta la función.
 */
const section = document.getElementById("paso-a-paso");

function init() {
  if (!section) return;
  const simEl = section.querySelector<HTMLElement & { __sim?: Sim }>("[data-sim]");
  const sim = simEl?.__sim;
  if (!sim) return;

  const reduce = document.documentElement.classList.contains("reduce-motion");
  const d = (ms: number) => (reduce ? 0 : ms);
  const steps = [...section.querySelectorAll<HTMLElement>("[data-wt-step]")];
  const cards = steps.map((s) => s.querySelector<HTMLElement>("[data-wt-card]")!);
  const dots = [...section.querySelectorAll<HTMLButtonElement>("[data-wt-dot]")];
  const count = document.getElementById("wt-count")!;
  const phone = document.getElementById("wt-phone");

  let current = -1;
  let centered = 0;
  let started = false;
  let pending = 0;

  function go(i: number) {
    if (i === current || i < 0 || i >= steps.length) return;
    current = i;
    const s = steps[i].dataset;
    window.clearTimeout(pending);
    sim!.clearHighlight();

    // Acción del paso en la app
    const [act, arg] = (s.action || "").split(":");
    if (act === "run") sim!.startRun(arg, true);
    else sim!.show(s.page!);
    if (act === "open") sim!.toggleExercise(arg, true);

    // Foco sobre la función (o el recorrido de bienvenida)
    pending = window.setTimeout(() => {
      if (act === "tour") {
        sim!.highlight(null);
        sim!.tourCard(1, 18, "¡Bienvenido a Soltá Ve!", "Te mostramos en un minuto cómo funciona la app. Puedes saltar el recorrido cuando quieras.", null);
      } else if (s.hl) {
        sim!.highlight(s.hl, s.color);
      }
    }, d(act === "open" ? 450 : 350));

    if (phone) animate(phone, { rotate: i % 2 ? 1.5 : -1.5, duration: d(900), ease: "inOutQuad" });
    cards.forEach((c, k) => (c.style.opacity = k === i ? "1" : "0.35"));
    animate(cards[i], { scale: [0.96, 1], duration: d(500), ease: "outQuad" });
    dots.forEach((b, k) => (k === i ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
    count.textContent = `Paso ${i + 1} de ${steps.length}`;
  }

  cards.forEach((c, k) => (c.style.opacity = k === 0 ? "1" : "0.35"));
  dots[0]?.setAttribute("aria-current", "step");

  // Arranca cuando el teléfono entra en pantalla, en el paso que esté a la vista.
  const intro = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    intro.disconnect();
    animate(phone!, { opacity: [0, 1], translateY: [40, 0], duration: d(700), ease: "outExpo" });
    started = true;
    go(centered);
  }, { threshold: 0.3 });
  intro.observe(phone!);

  // Paso activo: la tarjeta que cruza la línea de lectura (centro en computador; abajo en celular).
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      centered = Number((e.target as HTMLElement).closest<HTMLElement>("[data-wt-step]")!.dataset.wtStep);
      if (started) go(centered);
    });
  }, { rootMargin: wide ? "-45% 0px -45% 0px" : "-72% 0px -24% 0px" });
  cards.forEach((c) => observer.observe(c));

  dots.forEach((b, k) => b.addEventListener("click", () => cards[k].scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })));
}

// El simulador se crea en su propio script; se espera a que esté listo.
if (section?.querySelector<HTMLElement & { __sim?: Sim }>("[data-sim]")?.__sim) init();
else document.addEventListener("sims:ready", init, { once: true });
