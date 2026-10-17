import { animate, stagger } from "animejs";
import { EXERCISES, FINGER_COLORS, POSES, TIPS, figColor, type ExerciseData } from "../components/sim/data";

/*
 * Controlador del simulador de la app (src/components/sim/AppSim.astro).
 * Cada teléfono [data-sim] se maneja solo: navegación, ejercicios con temporizador, manos animadas (los trazos de
 * Figma se transforman de una postura a la siguiente con anime.js), el recorrido del botón «?» y un foco que
 * resalta partes de la pantalla. El recorrido paso a paso de la página lo usa a través de element.__sim.
 */

const reduce = document.documentElement.classList.contains("reduce-motion");
const D = (ms: number) => (reduce ? 0 : ms);
const SCREEN_W = 412;
const SCREEN_H = 892;
const POSE_MS = 1600;

/** "M x y H a" o "M x y V a" → "M x y L a b", para que todas las posturas tengan la misma forma y se puedan transformar. */
function norm(d: string) {
  const m = d.match(/^M(-?[\d.]+) (-?[\d.]+)([HVL])(-?[\d.]+)(?: (-?[\d.]+))?$/);
  if (!m) return d;
  const [, x, y, c, a, b] = m;
  if (c === "H") return `M${x} ${y}L${a} ${y}`;
  if (c === "V") return `M${x} ${y}L${x} ${a}`;
  return `M${x} ${y}L${a} ${b}`;
}

const SVGNS = "http://www.w3.org/2000/svg";

/** Dibuja de nuevo todos los trazos de una postura (cuando cambia el ejercicio). */
function buildHand(svg: SVGSVGElement, poseKey: string) {
  const pose = POSES[poseKey];
  svg.setAttribute("viewBox", pose.vb);
  svg.replaceChildren(
    ...pose.p.map(([d, s, f, w, o]) => {
      const p = document.createElementNS(SVGNS, "path");
      p.setAttribute("d", norm(d));
      p.setAttribute("stroke", s ? figColor(s) : "none");
      p.setAttribute("fill", f ? figColor(f) : "none");
      if (w) p.setAttribute("stroke-width", String(w));
      p.setAttribute("stroke-linecap", "round");
      if (o) p.setAttribute("opacity", o);
      return p;
    }),
  );
}

/** Lleva la mano a otra postura: cada trazo se transforma en el trazo equivalente de la nueva postura. */
function morphHand(svg: SVGSVGElement, poseKey: string, duration = 420) {
  const pose = POSES[poseKey];
  const paths = svg.querySelectorAll("path");
  if (paths.length !== pose.p.length || svg.getAttribute("viewBox") !== pose.vb) return buildHand(svg, poseKey);
  pose.p.forEach(([d, s, f, w, o], i) => {
    const el = paths[i];
    // Como estilo (no como atributo): así Chrome repinta el color con variables CSS al instante.
    el.style.stroke = s ? figColor(s) : "none";
    el.style.fill = f ? figColor(f) : "none";
    if (o) el.setAttribute("opacity", o);
    else el.removeAttribute("opacity");
    animate(el, { d: norm(d), strokeWidth: w || 0, duration: D(duration), ease: "inOutQuad" });
  });
}

const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const TOUR = [
  { hl: null, title: "¡Bienvenido a Soltá Ve!", text: "Te mostramos en un minuto cómo funciona la app. Puedes saltar el recorrido cuando quieras." },
  { hl: "hoy", title: "Tu terapia de hoy", text: "Te dice cuánto te falta de la rutina del día. Toca el botón para empezar." },
  { hl: "racha", title: "Tu racha", text: "Los días seguidos que llevas haciendo tu terapia. Un ejercicio al día la mantiene encendida." },
  { hl: "semana", title: "Tu semana", text: "Cada barra es un día; en verde, los días con la rutina completa." },
  { hl: "logro", title: "Próximo logro", text: "El logro que tienes más cerca y cuánto te falta para conseguirlo." },
  { hl: "consejo", title: "Consejo del día", text: "Un consejo de ergonomía nuevo cada día. Tócalo para ver más." },
  { hl: "ayuda", title: "¿Quieres repasarlo?", text: "Toca este botón cuando quieras para volver a ver este recorrido." },
];

export class Sim {
  el: HTMLElement;
  screen: HTMLElement;
  page = "";
  visible = false;
  private k = 1;
  private spot: HTMLElement;
  private card: HTMLElement;
  private demoTimer = 0;
  private demoStep = 0;
  private run: { ex: ExerciseData; phase: number; left: number; total: number; timer: number; started: number; loop: boolean } | null = null;
  private tipIndex = 0;
  private tourIndex = -1;
  private done = new Set(EXERCISES.filter((e) => e.done).map((e) => e.id));
  private grown = new Set<string>();

  constructor(el: HTMLElement) {
    this.el = el;
    this.screen = el.querySelector(".sim-screen")!;
    this.spot = el.querySelector(".sim-spot")!;
    this.card = el.querySelector(".sim-tourcard")!;
    const viewport = el.querySelector<HTMLElement>(".sim-viewport")!;

    // Escala de la pantalla (diseñada a 412 px de ancho) al tamaño del teléfono.
    const fit = () => {
      this.k = viewport.clientWidth / SCREEN_W || 1;
      el.style.setProperty("--k", String(this.k));
    };
    fit();
    new ResizeObserver(fit).observe(viewport);

    // Las manos de los tutoriales llevan los trazos de Figma ya normalizados.
    el.querySelectorAll<SVGPathElement>("svg[data-hand] path").forEach((p) => p.setAttribute("d", norm(p.getAttribute("d")!)));

    new IntersectionObserver((entries) => {
      this.visible = entries.some((e) => e.isIntersecting);
      if (this.visible) this.growCharts();
    }, { threshold: 0.15 }).observe(el);

    if (el.dataset.mode === "interactive") el.addEventListener("click", (e) => this.onClick(e));
    this.show(el.dataset.start || "inicio", true);
    this.demoTimer = window.setInterval(() => this.demoTick(), POSE_MS);
    (el as HTMLElement & { __sim?: Sim }).__sim = this;
  }

  // ---------------------------------------------------------------- navegación

  show(page: string, instant = false) {
    const next = this.el.querySelector<HTMLElement>(`[data-page="${page}"]`);
    if (!next || page === this.page) return;
    if (this.run && page !== "ejercicio") this.stopRun();
    this.el.querySelectorAll(".sim-page.is-active").forEach((p) => p.classList.remove("is-active"));
    next.classList.add("is-active");
    next.scrollTop = 0;
    this.page = page;
    const tabs = ["inicio", "terapia", "rachas", "perfil"].includes(page);
    this.el.dataset.tabs = tabs ? "on" : "off";
    this.el.querySelectorAll<HTMLElement>("[data-tab]").forEach((t) => t.classList.toggle("on", t.dataset.tab === page));
    this.demoStep = 0;
    this.applyDemo(next, 0, true);
    if (!instant) animate(next, { opacity: [0, 1], translateX: [18, 0], duration: D(320), ease: "outQuad" });
    this.grown.delete(page);
    if (this.visible) this.growCharts();
  }

  /** Barras y progresos que crecen la primera vez que se ve cada pantalla. */
  private growCharts() {
    if (this.grown.has(this.page)) return;
    this.grown.add(this.page);
    const page = this.el.querySelector(`[data-page="${this.page}"]`);
    if (!page || reduce) return;
    const bars = page.querySelectorAll("[data-grow]");
    if (bars.length) animate(bars, { scaleY: [0, 1], duration: 700, delay: stagger(45), ease: "outBack(1.4)" });
    const tracks = page.querySelectorAll<HTMLElement>("[data-grow-x]");
    tracks.forEach((t) => (t.style.transformOrigin = "left"));
    if (tracks.length) animate(tracks, { scaleX: [0, 1], duration: 900, delay: stagger(80), ease: "outQuart" });
  }

  private onClick(e: Event) {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-act]");
    if (!target || !this.el.contains(target)) return;
    const [act, arg] = target.dataset.act!.split(":");
    switch (act) {
      case "go": case "back": this.show(arg); break;
      case "toggle": this.toggleExercise(arg); break;
      case "tutorial": this.show(`tutorial-${arg}`); break;
      case "start": this.startRun(arg); break;
      case "finish": this.finishRun(); break;
      case "home": this.show("inicio"); break;
      case "tip": this.nextTip(); break;
      case "tour": this.startTour(); break;
      case "tour-next": this.tourNext(); break;
      case "tour-skip": this.endTour(); break;
      case "theme": this.setTheme(this.el.dataset.theme === "dark" ? "light" : "dark"); break;
    }
  }

  setTheme(theme: "light" | "dark") {
    this.el.dataset.theme = theme;
    this.el.dispatchEvent(new CustomEvent("sim:theme", { detail: theme, bubbles: true }));
  }

  toggleExercise(id: string, open?: boolean) {
    const page = this.el.querySelector<HTMLElement>('[data-page="terapia"]');
    if (!page) return;
    page.querySelectorAll<HTMLElement>(".ex").forEach((c) => {
      const isIt = c.dataset.ex === id;
      const willOpen = isIt ? (open ?? !c.classList.contains("is-open")) : false;
      if (willOpen && !c.classList.contains("is-open")) {
        c.classList.add("is-open");
        const more = c.querySelector<HTMLElement>(".more")!;
        animate(more, { opacity: [0, 1], translateY: [-8, 0], duration: D(300), ease: "outQuad" });
      } else if (!willOpen) c.classList.remove("is-open");
    });
  }

  private nextTip() {
    this.tipIndex = (this.tipIndex + 1) % TIPS.length;
    const title = this.el.querySelector<HTMLElement>('[data-bind="tip-title"]')!;
    const text = this.el.querySelector<HTMLElement>('[data-bind="tip-text"]')!;
    animate([title, text], {
      opacity: [1, 0], duration: D(150),
      onComplete: () => {
        title.textContent = TIPS[this.tipIndex].title;
        text.textContent = TIPS[this.tipIndex].text;
        animate([title, text], { opacity: [0, 1], duration: D(250) });
      },
    });
  }

  // ---------------------------------------------------------------- ejemplo animado de los tutoriales

  private demoTick() {
    if (!this.visible || reduce) return;
    const page = this.el.querySelector<HTMLElement>(`[data-page="${this.page}"]`);
    if (!page?.querySelector("[data-demo]")) return;
    this.demoStep++;
    this.applyDemo(page, this.demoStep);
  }

  private applyDemo(page: HTMLElement, step: number, instant = false) {
    const demo = page.querySelector<HTMLElement>("[data-demo]");
    if (!demo) return;
    const ex = EXERCISES.find((e) => e.id === demo.dataset.ex)!;
    const i = step % ex.poses.length;
    const svg = demo.querySelector<SVGSVGElement>("svg[data-hand]")!;
    morphHand(svg, ex.poses[i], instant ? 0 : 420);
    demo.querySelector("[data-pose-label]")!.textContent = ex.labels[i];
    demo.querySelector("[data-pose-hint]")!.textContent = ex.hints[i];
    demo.querySelectorAll<HTMLElement>("[data-pose-step]").forEach((s) => s.classList.toggle("on", Number(s.dataset.poseStep) === i));
  }

  // ---------------------------------------------------------------- ejercicio con temporizador

  startRun(id: string, loop = false) {
    const ex = EXERCISES.find((e) => e.id === id);
    if (!ex) return;
    this.stopRun();
    this.show("ejercicio");
    const page = this.el.querySelector<HTMLElement>('[data-page="ejercicio"]')!;
    const q = (k: string) => page.querySelector<HTMLElement>(`[data-run="${k}"]`)!;
    q("title").textContent = ex.title;
    q("segs").innerHTML = ex.labels.map((_, i) => `<i data-seg="${i}">${i + 1}</i>`).join("");
    buildHand(page.querySelector<SVGSVGElement>('svg[data-run="hand"]')!, ex.poses[0]);
    this.run = { ex, phase: -1, left: 0, total: ex.rounds * ex.poses.length, timer: 0, started: Date.now(), loop };
    this.nextPhase();
    this.run.timer = window.setInterval(() => this.tick(), 1000);
  }

  private nextPhase() {
    const r = this.run!;
    r.phase++;
    if (r.phase >= r.total) {
      if (r.loop) r.phase = 0;
      else return this.finishRun();
    }
    const page = this.el.querySelector<HTMLElement>('[data-page="ejercicio"]')!;
    const q = (k: string) => page.querySelector<HTMLElement>(`[data-run="${k}"]`)!;
    const n = r.ex.poses.length;
    const i = r.phase % n;
    r.left = r.ex.phaseSeconds;
    morphHand(page.querySelector<SVGSVGElement>('svg[data-run="hand"]')!, r.ex.poses[i]);
    q("round").textContent = r.ex.id === "apertura_cierre" ? `Repetición ${Math.floor(r.phase / n) + 1} de ${r.ex.rounds}` : `Ronda ${Math.floor(r.phase / n) + 1} de ${r.ex.rounds}`;
    q("label").textContent = r.ex.labels[i];
    q("hint").textContent = r.ex.hints[i];
    q("next").textContent = `Siguiente: ${r.ex.labels[(i + 1) % n]}`;
    q("count").textContent = String(r.left);
    q("count").style.color = r.ex.colorByFinger ? FINGER_COLORS[i] : "";
    page.querySelectorAll<HTMLElement>("[data-seg]").forEach((s) => s.classList.toggle("on", Number(s.dataset.seg) === i));
    animate(q("label"), { opacity: [0, 1], translateY: [6, 0], duration: D(300) });
  }

  private tick() {
    const r = this.run;
    if (!r || !this.visible) return;
    r.left--;
    const count = this.el.querySelector<HTMLElement>('[data-run="count"]')!;
    if (r.left <= 0) return this.nextPhase();
    count.textContent = String(r.left);
    animate(count, { scale: [1.25, 1], duration: D(350), ease: "outBack(2)" });
  }

  private stopRun() {
    if (this.run) clearInterval(this.run.timer);
    this.run = null;
  }

  finishRun() {
    const r = this.run;
    if (!r) return;
    const secs = Math.max(1, Math.round((Date.now() - r.started) / 1000));
    const reps = Math.max(1, Math.floor((r.phase + 1) / r.ex.poses.length));
    this.stopRun();
    this.done.add(r.ex.id);
    this.updateProgress(r.ex.id);
    this.show("completada");
    const q = (k: string) => this.el.querySelector<HTMLElement>(`[data-run="${k}"]`)!;
    q("done-title").textContent = r.ex.title;
    q("done-reps").textContent = String(reps);
    q("done-time").textContent = fmtTime(secs);
    animate(this.el.querySelector(".done-check")!, { scale: [0, 1], rotate: [-45, 0], duration: D(700), ease: "outBack(2)" });
  }

  /** Marca el ejercicio como hecho y actualiza Inicio y Terapia, como en la app. */
  private updateProgress(id: string) {
    const n = this.done.size;
    const card = this.el.querySelector<HTMLElement>(`.ex[data-ex="${id}"]`);
    const ico = card?.querySelector<HTMLElement>("[data-ex-ico]");
    if (ico) {
      ico.style.background = "var(--green)";
      ico.style.color = "#1b1712";
      ico.querySelector("path")!.setAttribute("d", "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z");
    }
    const set = (k: string, v: string) => this.el.querySelectorAll<HTMLElement>(`[data-bind="${k}"]`).forEach((e) => (e.textContent = v));
    set("done-count", `${n}/5`);
    set("summary", `${n} de 5 ejercicios · ~6 min en total`);
    set("pct", `${n * 20}%`);
    this.el.querySelectorAll<HTMLElement>('[data-bind="pct-bar"]').forEach((e) => (e.style.width = `${n * 20}%`));
    set("today-title", n >= 5 ? "¡Terapia de hoy completada!" : `Vas ${n} de 5 ejercicios`);
    set("today-text", n >= 5 ? "Hiciste los 5 ejercicios. Tus manos te lo agradecen." : `Te faltan ${5 - n} ejercicios para completar la terapia de hoy. ¡Sigue así!`);
  }

  // ---------------------------------------------------------------- foco y recorrido

  /** Resalta un elemento [data-hl=key] de la pantalla actual: oscurece el resto y lo enmarca. */
  highlight(key: string | null, color = "#ff5a3c") {
    const page = this.el.querySelector<HTMLElement>(`[data-page="${this.page}"]`);
    const target = key ? this.el.querySelector<HTMLElement>(`.sim-page.is-active [data-hl="${key}"], .sim-screen > [data-hl="${key}"]`) : null;
    this.spot.style.setProperty("--spot", color);
    if (!target || !page) {
      // Sin elemento: todo oscuro, con el foco cerrado en el centro (como el paso de bienvenida).
      animate(this.spot, { left: SCREEN_W / 2, top: SCREEN_H / 2, width: 0, height: 0, opacity: 1, duration: D(450), ease: "inOutQuad" });
      return null;
    }
    // Posición dentro de la pantalla en sus propias medidas (412 × 892), sin contar escalas ni inclinaciones.
    let x = 0, y = 0;
    for (let n: HTMLElement | null = target; n && n !== this.screen; n = n.offsetParent as HTMLElement | null) {
      x += n.offsetLeft;
      y += n.offsetTop;
    }
    const top = y - page.scrollTop;
    const h = target.offsetHeight;
    // Si el elemento está fuera de la vista, la pantalla se desplaza hasta él.
    const visibleTop = 60, visibleBottom = SCREEN_H - (this.el.dataset.tabs === "on" ? 100 : 30);
    let delta = 0;
    if (top < visibleTop || top + h > visibleBottom) delta = top - Math.max(visibleTop + 20, (SCREEN_H - h) / 2 - 40);
    // No se puede desplazar más allá del principio o del final de la pantalla.
    const maxScroll = page.scrollHeight - page.clientHeight;
    delta = Math.min(Math.max(page.scrollTop + delta, 0), maxScroll) - page.scrollTop;
    if (delta) page.scrollTo({ top: page.scrollTop + delta, behavior: reduce ? "auto" : "smooth" });
    const pad = 6;
    const rect = {
      left: x - pad,
      top: top - delta - pad,
      width: target.offsetWidth + pad * 2,
      height: h + pad * 2,
    };
    animate(this.spot, { ...rect, opacity: 1, duration: D(600), ease: "inOutQuart" });
    return rect;
  }

  clearHighlight() {
    animate(this.spot, { opacity: 0, duration: D(300) });
    animate(this.card, { opacity: 0, duration: D(200) });
    this.card.classList.remove("is-on");
  }

  /** Muestra la tarjeta del recorrido de la app (paso n de 18), junto al elemento resaltado. */
  tourCard(step: number, total: number, title: string, text: string, rect: { top: number; height: number } | null, last = false) {
    const c = this.card;
    c.querySelector('[data-tour="step"]')!.textContent = `Paso ${step} de ${total}`;
    c.querySelector('[data-tour="title"]')!.textContent = title;
    c.querySelector('[data-tour="text"]')!.textContent = text;
    (c.querySelector('[data-tour="bar"]') as HTMLElement).style.width = `${(step / total) * 100}%`;
    c.querySelector('[data-act="tour-next"]')!.textContent = last ? "¡Empecemos!" : "Siguiente";
    c.classList.add("is-on");
    const ch = c.offsetHeight || 170;
    let top = SCREEN_H / 2 - ch / 2;
    if (rect) top = rect.top + rect.height / 2 < SCREEN_H / 2 ? rect.top + rect.height + 14 : rect.top - ch - 14;
    animate(c, { top, opacity: [0, 1], duration: D(400), ease: "outQuad" });
  }

  startTour() {
    this.show("inicio");
    this.tourIndex = 0;
    this.showTourStep();
  }

  private showTourStep() {
    const s = TOUR[this.tourIndex];
    const rect = this.highlight(s.hl);
    const stepNo = this.tourIndex === TOUR.length - 1 ? 18 : this.tourIndex + 1;
    window.setTimeout(() => this.tourCard(stepNo, 18, s.title, s.text, rect, this.tourIndex === TOUR.length - 1), D(s.hl ? 450 : 200));
  }

  private tourNext() {
    if (this.tourIndex < 0) return;
    this.tourIndex++;
    if (this.tourIndex >= TOUR.length) return this.endTour();
    this.showTourStep();
  }

  private endTour() {
    this.tourIndex = -1;
    this.clearHighlight();
  }
}

document.querySelectorAll<HTMLElement>("[data-sim]").forEach((el) => {
  if (!(el as HTMLElement & { __sim?: Sim }).__sim) new Sim(el);
});
document.dispatchEvent(new CustomEvent("sims:ready"));
