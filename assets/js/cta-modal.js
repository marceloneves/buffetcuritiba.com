(function () {
  "use strict";

  var PLACEHOLDER_MATCH = "987654321";

  var OPTIONS = [
    {
      key: "local",
      title: "Buffet com local para festa",
      description: "Nosso espaço pronto, decorado e estruturado para receber você e seus convidados com toda a comodidade.",
      phone: "554132055960",
      display: "(41) 3205-5960"
    },
    {
      key: "gastronomico",
      title: "Buffet apenas serviço gastronômico/alimentos",
      description: "Levamos todo o cardápio e a equipe até o local do seu evento, sem a necessidade do nosso espaço.",
      phone: "554197164842",
      display: "(41) 9716-4842"
    }
  ];

  var WHATSAPP_TEXT = "Olá, estou entrando em contato pelo site";

  function buildWhatsAppUrl(phone) {
    return "https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(WHATSAPP_TEXT);
  }

  function injectStyles() {
    if (document.getElementById("cta-modal-styles")) return;
    var style = document.createElement("style");
    style.id = "cta-modal-styles";
    style.textContent =
      ".cta-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;display:none;align-items:center;justify-content:center;padding:20px;}" +
      ".cta-modal-overlay.is-open{display:flex;}" +
      ".cta-modal-box{background:#fff;border-radius:12px;max-width:760px;width:100%;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3);position:relative;}" +
      ".cta-modal-close{position:absolute;top:10px;right:14px;background:none;border:none;font-size:26px;line-height:1;color:#606060;cursor:pointer;z-index:2;}" +
      ".cta-modal-close:hover{color:#212529;}" +
      ".cta-modal-header{text-align:center;padding:24px 20px 12px;}" +
      ".cta-modal-header h2{margin:0;font-size:20px;color:#212529;}" +
      ".cta-modal-columns{display:flex;flex-wrap:wrap;}" +
      ".cta-modal-col{flex:1 1 50%;min-width:260px;padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;}" +
      ".cta-modal-col + .cta-modal-col{border-left:1px solid #e9ecef;}" +
      "@media (max-width:600px){.cta-modal-col + .cta-modal-col{border-left:none;border-top:1px solid #e9ecef;}}" +
      ".cta-modal-col h3{font-size:17px;color:#8224e3;margin:0 0 10px;}" +
      ".cta-modal-col p{font-size:14px;color:#606060;margin:0 0 18px;line-height:1.5;}" +
      ".cta-modal-btn{display:inline-block;background:#25D366;color:#fff;font-weight:700;padding:12px 20px;border-radius:6px;text-decoration:none;transition:.3s;}" +
      ".cta-modal-btn:hover{background:#1ebe57;color:#fff;}";
    document.head.appendChild(style);
  }

  function buildModal() {
    if (document.getElementById("cta-modal-overlay")) {
      return document.getElementById("cta-modal-overlay");
    }

    var overlay = document.createElement("div");
    overlay.className = "cta-modal-overlay";
    overlay.id = "cta-modal-overlay";

    var columnsHtml = "";
    OPTIONS.forEach(function (opt) {
      columnsHtml +=
        '<div class="cta-modal-col">' +
        "<h3>" + opt.title + "</h3>" +
        "<p>" + opt.description + "</p>" +
        '<a class="cta-modal-btn" target="_blank" rel="noopener nofollow" href="' + buildWhatsAppUrl(opt.phone) + '">' + opt.display + "</a>" +
        "</div>";
    });

    overlay.innerHTML =
      '<div class="cta-modal-box" role="dialog" aria-modal="true" aria-labelledby="cta-modal-title">' +
      '<button type="button" class="cta-modal-close" aria-label="Fechar">&times;</button>' +
      '<div class="cta-modal-header"><h2 id="cta-modal-title">Como podemos te atender?</h2></div>' +
      '<div class="cta-modal-columns">' + columnsHtml + "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.closest(".cta-modal-close")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });

    return overlay;
  }

  function openModal() {
    injectStyles();
    var overlay = buildModal();
    overlay.classList.add("is-open");
  }

  function closeModal() {
    var overlay = document.getElementById("cta-modal-overlay");
    if (overlay) overlay.classList.remove("is-open");
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest("a[href]");
    if (!link) return;
    if (link.href.indexOf(PLACEHOLDER_MATCH) === -1) return;
    e.preventDefault();
    openModal();
  });
})();
