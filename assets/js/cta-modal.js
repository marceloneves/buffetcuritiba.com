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
      "@keyframes whatsapp-float-bounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-6px);}45%{transform:translateY(-2px);}}" +
      ".whatsapp-float-btn{position:fixed;right:calc(20px + env(safe-area-inset-right,0px));bottom:calc(20px + env(safe-area-inset-bottom,0px));box-sizing:border-box;width:60px;height:60px;margin:0;padding:0;background:#25D366;border:none;border-radius:50%;box-shadow:0 4px 16px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;line-height:0;z-index:99998;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;animation:whatsapp-float-bounce 3s ease-in-out 2s infinite;transition:box-shadow .2s;}" +
      ".whatsapp-float-btn:hover,.whatsapp-float-btn:focus-visible{animation:none;transform:scale(1.08);box-shadow:0 6px 20px rgba(0,0,0,.35);}" +
      ".whatsapp-float-btn:focus-visible{outline:3px solid #fff;outline-offset:2px;}" +
      ".whatsapp-float-btn svg{display:block;flex:none;width:34px;height:34px;fill:#fff;pointer-events:none;}" +
      "@media (max-width:480px){.whatsapp-float-btn{right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));width:54px;height:54px;}.whatsapp-float-btn svg{width:30px;height:30px;}}" +
      "@media (prefers-reduced-motion:reduce){.whatsapp-float-btn{animation:none;}}";
    document.head.appendChild(style);
  }

  function buildFloatButton() {
    if (document.getElementById("whatsapp-float-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "whatsapp-float-btn";
    btn.className = "whatsapp-float-btn";
    btn.setAttribute("aria-label", "Fale conosco pelo WhatsApp");
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
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
