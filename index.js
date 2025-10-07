function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="card center" aria-labelledby="home-title">
      <h1 id="home-title" class="h1">Something overpowered awaits</h1>
      <p class="subtle-strong">..for the UBG community.</p>
    </section>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  renderHome();
});
