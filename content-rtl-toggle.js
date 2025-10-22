(function() {
  const id = "translator-web-rtl-toggle";

  let toggled = document.body.getAttribute("data-rtl-toggled") === "true";

  if (!toggled) {
    document.body.style.direction = "rtl";
    document.body.style.textAlign = "right";

    const all = document.querySelectorAll("*");
    all.forEach(el => {
      el.setAttribute("data-rtl-original-dir", el.style.direction || "");
      el.setAttribute("data-rtl-original-align", el.style.textAlign || "");
      el.style.direction = "rtl";
      el.style.textAlign = "right";
    });

    document.body.setAttribute("data-rtl-toggled", "true");
    toggled = true;

    showToast("✅ صفحه راست‌چین شد!");
  } else {
    const all = document.querySelectorAll("*");
    all.forEach(el => {
      el.style.direction = el.getAttribute("data-rtl-original-dir") || "";
      el.style.textAlign = el.getAttribute("data-rtl-original-align") || "";
      el.removeAttribute("data-rtl-original-dir");
      el.removeAttribute("data-rtl-original-align");
    });
    document.body.style.direction = "";
    document.body.style.textAlign = "";
    document.body.setAttribute("data-rtl-toggled", "false");
    toggled = false;

    showToast("✅ صفحه به حالت اولیه برگشت!");
  }

  chrome.runtime.sendMessage({ action: "rtlToggle", state: toggled });

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#4e54c8",
      color: "white",
      padding: "10px 20px",
      borderRadius: "10px",
      fontFamily: "sans-serif",
      zIndex: 9999
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
})();