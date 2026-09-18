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

  function getPageUrl() {
    return window.location.href.split("#")[0];
  }

  function buildWhatsAppUrl(phone) {
    var text = WHATSAPP_TEXT + " - " + getPageUrl();
    return "https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(text);
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
      ".cta-modal-btn:hover{background:#1ebe57;color:#fff;}" +
      ".whatsapp-float-btn{position:fixed;right:20px;bottom:20px;width:60px;height:60px;background:#25D366;border-radius:50%;box-shadow:0 4px 16px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;z-index:99998;cursor:pointer;border:none;transition:transform .2s;padding:0;}" +
      ".whatsapp-float-btn:hover{transform:scale(1.08);}" +
      ".whatsapp-float-btn svg{width:30px;height:30px;fill:#fff;}" +
      "@media (max-width:480px){.whatsapp-float-btn{right:14px;bottom:14px;width:52px;height:52px;}.whatsapp-float-btn svg{width:26px;height:26px;}}";
    document.head.appendChild(style);
  }

  function buildFloatButton() {
    if (document.getElementById("whatsapp-float-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "whatsapp-float-btn";
    btn.className = "whatsapp-float-btn";
    btn.setAttribute("aria-label", "Fale conosco pelo WhatsApp");
    btn.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.35.66 4.55 1.8 6.43L4 29l7.75-1.75a11.94 11.94 0 0 0 4.26.78c6.63 0 12.01-5.38 12.01-12.02C28.02 8.38 22.64 3 16.01 3Zm0 21.82c-1.92 0-3.7-.55-5.21-1.5l-.37-.22-4.6 1.04 1.03-4.48-.24-.38a9.75 9.75 0 0 1-1.58-5.27c0-5.42 4.4-9.82 9.97-9.82 5.57 0 9.97 4.4 9.97 9.82 0 5.42-4.4 9.81-9.97 9.81Zm5.46-7.34c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.48.71.3 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>';
    btn.addEventListener("click", function () {
      openModal();
    });
    document.body.appendChild(btn);
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

  function init() {
    injectStyles();
    buildFloatButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
