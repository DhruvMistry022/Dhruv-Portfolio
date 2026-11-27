(function () {
  const c = window.FIREBASE_CONFIG || {};
  const ok =
    c.apiKey &&
    !c.apiKey.startsWith("PASTE_") &&
    c.projectId &&
    !c.projectId.startsWith("YOUR_") &&
    c.databaseURL;
  window.portfolioDB = { ready: false };
  if (!ok) {
    document.dispatchEvent(new Event("portfolio-db-ready"));
    return;
  }
  const a = document.createElement("script");
  a.src = "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js";
  a.onload = () => {
    const b = document.createElement("script");
    b.src =
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-database-compat.js";
    b.onload = () => {
      firebase.initializeApp(c);
      const db = firebase.database();
      window.portfolioDB = { ready: true, db };
      document.dispatchEvent(new Event("portfolio-db-ready"));
      let id = sessionStorage.getItem("dmVisitorId");
      if (!id) {
        id = db.ref("presence").push().key;
        sessionStorage.setItem("dmVisitorId", id);
      }
      const ref = db.ref("presence/" + id);
      ref.set({ online: true });
      ref.onDisconnect().remove();
      if (!sessionStorage.getItem("dmVisitCounted")) {
        db.ref("stats/totalVisits").transaction((v) => (v || 0) + 1);
        sessionStorage.setItem("dmVisitCounted", "1");
      }
    };
    document.head.appendChild(b);
  };
  document.head.appendChild(a);
})();
