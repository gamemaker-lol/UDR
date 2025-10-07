function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="scale-wrap" id="scale-wrap">
      <section class="card" aria-labelledby="home-title">
        <h1 id="home-title" class="h1">Something overpowered awaits</h1>
        <p class="subtle-strong">..for the UBG community.</p>
      </section>
    </div>
  `;
  requestAnimationFrame(() => {
    document.querySelector(".scale-wrap")?.classList.add("play");
  });
  fitToViewport();
  markHomeActive(true);
}

function markHomeActive(isActive) {
  const btn = document.getElementById("btn-home");
  if (!btn) return;
  if (isActive) btn.setAttribute("aria-current", "page");
  else btn.removeAttribute("aria-current");
}

let resizeObserver;
function fitToViewport() {
  const wrap = document.getElementById("scale-wrap");
  if (!wrap) return;

  const container = document.querySelector(".container");
  const padding = 24;
  const minScale = 0.8;
  const maxScale = 1.4;

  const measureAndScale = () => {
    const containerRect = container.getBoundingClientRect();
    const availW = containerRect.width - padding * 2;
    const availH = containerRect.height - padding * 2;

    wrap.style.transform = "translateY(0) scale(1)";
    const contentRect = wrap.getBoundingClientRect();
    const contentW = contentRect.width;
    const contentH = contentRect.height;

    let scale = Math.min(availW / contentW, availH / contentH);
    scale = Math.max(minScale, Math.min(maxScale, scale));

    wrap.style.transform = `translateY(0) scale(${Number.isFinite(scale) ? scale : 1})`;
  };

  measureAndScale();

  if (resizeObserver) resizeObserver.disconnect();
  resizeObserver = new ResizeObserver(measureAndScale);
  resizeObserver.observe(document.documentElement);
  resizeObserver.observe(wrap);
  window.addEventListener("orientationchange", measureAndScale, { passive: true });
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-home")?.addEventListener("click", renderHome);
  document.querySelector(".topbar--enter")?.classList.add("play");
  renderHome();
});
