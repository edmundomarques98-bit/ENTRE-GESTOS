(function () {
  var cfg = window.ENTRE_GESTOS || {};

  // Dados da turma
  document.querySelectorAll("[data-campo]").forEach(function (el) {
    var valor = cfg[el.dataset.campo];
    if (!valor) return;
    el.textContent = valor + (el.dataset.sufixo || "");
    el.hidden = false;
  });

  // Links
  var whats = cfg.whatsapp
    ? "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(cfg.mensagemWhatsapp || "")
    : "";
  var insta = cfg.instagram ? "https://instagram.com/" + cfg.instagram : "";

  document.querySelectorAll('[data-link="whatsapp"]').forEach(function (el) {
    if (whats) el.href = whats; else el.hidden = true;
  });
  document.querySelectorAll('[data-link="instagram"]').forEach(function (el) {
    if (insta) el.href = insta; else el.hidden = true;
  });

  // Botões de inscrição: plataforma, depois WhatsApp, senão rola até a turma
  var destino = cfg.linkInscricao || whats;
  if (destino) {
    document.querySelectorAll("[data-inscricao]").forEach(function (el) {
      el.href = destino;
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  // Carrossel de depoimentos
  document.querySelectorAll("[data-carrossel]").forEach(function (c) {
    var trilho = c.querySelector(".carrossel__trilho");
    c.querySelectorAll(".carrossel__seta").forEach(function (b) {
      b.addEventListener("click", function () {
        var item = trilho.firstElementChild;
        var passo = item ? item.getBoundingClientRect().width + 24 : trilho.clientWidth;
        trilho.scrollBy({ left: passo * Number(b.dataset.dir), behavior: "smooth" });
      });
    });
  });
})();
