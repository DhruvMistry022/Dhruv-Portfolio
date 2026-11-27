(function () {
  const $ = (id) => document.getElementById(id);
  const toggle = $("menuToggle"),
    nav = $("navLinks");
  if (toggle && nav)
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  document.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      document
        .querySelectorAll(".nav-links a")
        .forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    }),
  );
  $("year").textContent = new Date().getFullYear();
  const total = $("totalVisits"),
    active = $("activeVisitors"),
    status = $("firebaseStatus"),
    form = $("reviewForm"),
    list = $("reviewList"),
    msg = $("reviewStatus");
  function safe(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }
  function init() {
    if (!window.portfolioDB?.ready) {
      if (status)
        status.textContent =
          "To enable shared visitor statistics and reviews, complete Firebase setup in README.md.";
      if (total) total.textContent = "Setup needed";
      if (active) active.textContent = "Setup needed";
      return;
    }
    const db = window.portfolioDB.db;
    status.textContent = "Connected to shared live data.";
    db.ref("stats/totalVisits").on(
      "value",
      (s) => (total.textContent = (s.val() || 0).toLocaleString()),
    );
    db.ref("presence").on(
      "value",
      (s) => (active.textContent = (s.numChildren() || 0).toLocaleString()),
    );
    db.ref("reviews")
      .limitToLast(20)
      .on("value", (s) => {
        let arr = [];
        s.forEach((x) => arr.push(x.val()));
        arr.reverse();
        list.innerHTML =
          arr
            .map(
              (r) =>
                `<div class="review-item"><strong>${safe(r.name)}</strong> <span class="stars">${"★".repeat(Math.max(1, Math.min(5, Number(r.rating) || 5)))}</span><p>${safe(r.text)}</p><small class="muted">${safe(r.date || "")}</small></div>`,
            )
            .join("") || '<p class="muted">No reviews yet.</p>';
      });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim(),
        text = form.elements.review.value.trim(),
        rating = Number(form.elements.rating.value);
      if (name.length < 2 || text.length < 5) {
        msg.textContent =
          "Enter your name and a review of at least 5 characters.";
        return;
      }
      const btn = form.querySelector("button");
      btn.disabled = true;
      try {
        await db
          .ref("reviews")
          .push({ name, text, rating, date: new Date().toLocaleDateString() });
        form.reset();
        msg.textContent = "Thanks! Your review has been submitted.";
      } catch (e) {
        msg.textContent = "Could not submit. Check Firebase database rules.";
      } finally {
        btn.disabled = false;
      }
    });
  }
  document.addEventListener("portfolio-db-ready", init);
  if (window.portfolioDB?.ready || window.portfolioDB) init();
})();
