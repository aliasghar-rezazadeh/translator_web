const rtlBtn = document.getElementById("rtlBtn");

rtlBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // تزریق content script toggle
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-rtl-toggle.js"]
  });
});

// دریافت پیام از content.js و تغییر نام دکمه
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "rtlToggle") {
    if (msg.state) {
      rtlBtn.textContent = "بازگشت";
    } else {
      rtlBtn.textContent = "راست‌چین کن";
    }
  }
});