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

  var calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animações de entrada. O conteúdo só fica oculto quando o JS está ativo,
  // e uma trava de segurança revela tudo se algo falhar.
  if (!calmo && "IntersectionObserver" in window) {
    // títulos: cada palavra sobe em sequência
    document.querySelectorAll("h1, h2").forEach(function (h) {
      var n = 0;
      (function quebra(no) {
        Array.prototype.slice.call(no.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function (parte) {
              if (!parte) return;
              if (/^\s+$/.test(parte)) { frag.appendChild(document.createTextNode(parte)); return; }
              var sp = document.createElement("span");
              sp.className = "palavra";
              sp.style.setProperty("--i", n++);
              sp.textContent = parte;
              frag.appendChild(sp);
            });
            c.replaceWith(frag);
          } else if (c.nodeType === 1 && c.tagName !== "BR") {
            quebra(c);
          }
        });
      })(h);
    });

    // listas e grupos: itens entram um após o outro
    document.querySelectorAll(".checks, .beneficios, .lista, .roteiro, .cards, .papeis, .turma__dados, .faq__inner").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (el, idx) {
        el.classList.add("item-anim");
        el.style.setProperty("--i", idx);
      });
    });

    document.documentElement.classList.add("anim");
    var alvos = document.querySelectorAll("h1, h2, .checks, .beneficios, .lista, .roteiro, .cards, .papeis, .turma__dados, .faq__inner, .para-quem__arte, .arco, .moldura, .traco");
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visivel"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    alvos.forEach(function (el) { io.observe(el); });
    setTimeout(function () { alvos.forEach(function (el) { el.classList.add("visivel"); }); }, 4000);
  }

  // Arte da seção "Você anda se sentindo assim?": mente cheia de fios que viram gesto
  var cv = document.getElementById("mente");
  if (cv && cv.getContext) {
    var ctx = cv.getContext("2d");
    var k = cv.width / 400;
    var cabeca = new Path2D("M150 362 L150 300 C108 288 78 248 78 196 C78 116 140 56 220 56 C292 56 342 108 342 174 C342 194 338 206 348 222 L364 250 C368 258 362 263 354 264 L346 265 L348 290 C348 306 336 313 320 311 L292 307 L294 362");
    var seed = 7;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    var emaranhado = [];
    for (var i = 0; i < 140; i++) {
      var cx = 200 + (rnd() - .5) * 190, cy = 165 + (rnd() - .5) * 170;
      emaranhado.push({
        p: [cx, cy,
            cx + (rnd() - .5) * 160, cy + (rnd() - .5) * 160,
            cx + (rnd() - .5) * 160, cy + (rnd() - .5) * 160,
            cx + (rnd() - .5) * 120, cy + (rnd() - .5) * 120],
        a: (.05 + rnd() * .14).toFixed(2),
        w: .5 + rnd() * .9
      });
    }
    var fios = [
      ["#C77E61", [190, 150, 130, 230, 60, 250, 30, 330]],
      ["#DBA64B", [215, 175, 170, 280, 120, 300, 70, 372]],
      ["#376463", [240, 140, 270, 250, 210, 330, 140, 388]]
    ];

    // desenha só a fração t (0 a 1) de uma curva de Bézier
    var curva = function (p, t) {
      var passos = Math.max(2, Math.round(40 * t));
      ctx.beginPath();
      ctx.moveTo(p[0], p[1]);
      for (var j = 1; j <= passos; j++) {
        var u = t * j / passos, v = 1 - u;
        ctx.lineTo(
          v*v*v*p[0] + 3*v*v*u*p[2] + 3*v*u*u*p[4] + u*u*u*p[6],
          v*v*v*p[1] + 3*v*v*u*p[3] + 3*v*u*u*p[5] + u*u*u*p[7]);
      }
      ctx.stroke();
    };
    var suave = function (x) { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };

    var desenha = function (t, oscila) {
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.clearRect(0, 0, 400, 400);
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(53,62,59,.6)";
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = suave(t * 3);
      ctx.stroke(cabeca);
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.clip(cabeca);
      emaranhado.forEach(function (f, idx) {
        var tf = suave((t * 1.6) - idx / 140 * .6);
        if (tf <= 0) return;
        ctx.strokeStyle = "rgba(53,62,59," + f.a + ")";
        ctx.lineWidth = f.w;
        curva(f.p, tf);
      });
      ctx.restore();

      fios.forEach(function (f, idx) {
        var tf = suave((t - .45 - idx * .08) / .45);
        if (tf <= 0) return;
        var p = f[1].slice();
        var o = Math.sin(oscila + idx * 1.7) * 4;   // respiração leve das pontas
        p[4] += o; p[6] += o * 1.6; p[7] += o * .6;
        ctx.strokeStyle = f[0];
        ctx.lineWidth = 7;
        curva(p, tf);
      });
    };

    if (calmo || !("IntersectionObserver" in window)) {
      desenha(1, 0);
    } else {
      desenha(0, 0);
      var inicio = null, rodando = false;
      var quadro = function (agora) {
        if (inicio === null) inicio = agora;
        var t = Math.min(1, (agora - inicio) / 2600);
        desenha(t, (agora - inicio) / 1400);
        if (rodando) requestAnimationFrame(quadro);
      };
      new IntersectionObserver(function (e) {
        var antes = rodando;
        rodando = e[0].isIntersecting;
        if (rodando && !antes) requestAnimationFrame(quadro);
      }, { threshold: 0.2 }).observe(cv);
    }
  }
})();
