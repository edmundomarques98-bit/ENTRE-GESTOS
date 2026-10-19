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

  // Arte da seção "Você anda se sentindo assim?": mente cheia de fios que viram gesto
  var cv = document.getElementById("mente");
  if (cv && cv.getContext) {
    var ctx = cv.getContext("2d");
    var k = cv.width / 400;
    var seed = 7;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    var cabeca = new Path2D("M150 362 L150 300 C108 288 78 248 78 196 C78 116 140 56 220 56 C292 56 342 108 342 174 C342 194 338 206 348 222 L364 250 C368 258 362 263 354 264 L346 265 L348 290 C348 306 336 313 320 311 L292 307 L294 362");
    ctx.scale(k, k);
    ctx.lineCap = "round";

    // contorno
    ctx.strokeStyle = "rgba(53,62,59,.6)";
    ctx.lineWidth = 1.6;
    ctx.stroke(cabeca);

    // fios emaranhados dentro da cabeça
    ctx.save();
    ctx.clip(cabeca);
    for (var i = 0; i < 140; i++) {
      var cx = 200 + (rnd() - .5) * 190, cy = 165 + (rnd() - .5) * 170;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.bezierCurveTo(cx + (rnd() - .5) * 160, cy + (rnd() - .5) * 160,
                        cx + (rnd() - .5) * 160, cy + (rnd() - .5) * 160,
                        cx + (rnd() - .5) * 120, cy + (rnd() - .5) * 120);
      ctx.strokeStyle = "rgba(53,62,59," + (.05 + rnd() * .14).toFixed(2) + ")";
      ctx.lineWidth = .5 + rnd() * .9;
      ctx.stroke();
    }
    ctx.restore();

    // três fios da marca saindo da cabeça e virando gesto
    var fios = [
      ["#C77E61", [190, 150, 130, 230, 60, 250, 30, 330]],
      ["#DBA64B", [215, 175, 170, 280, 120, 300, 70, 372]],
      ["#376463", [240, 140, 270, 250, 210, 330, 140, 388]]
    ];
    fios.forEach(function (f) {
      var p = f[1];
      ctx.beginPath();
      ctx.moveTo(p[0], p[1]);
      ctx.bezierCurveTo(p[2], p[3], p[4], p[5], p[6], p[7]);
      ctx.strokeStyle = f[0];
      ctx.lineWidth = 7;
      ctx.stroke();
    });
  }
})();
