type Command = "copyDefault" | "copyMd";

function injectedScript(command: Command, title: string, url: string) {
  function copy(plain: string) {
    const listener = (event: ClipboardEvent) => {
      event.clipboardData?.setData("text/plain", plain);
      event.preventDefault();
    };
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  }
  const copyText =
    command === "copyDefault" ? `${title} ${url}` : `[${title}](${url})`;
  copy(copyText);
}

chrome.commands.onCommand.addListener((cmd) => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    async (tabs) => {
      const command = cmd as Command;
      async function run() {
        try {
          const [tab] = tabs;
          const isAccessRestrictedUrl =
            !!tab.url?.startsWith("chrome://") ||
            !!tab.url?.startsWith("https://chrome.google.com/webstore/");
          if (isAccessRestrictedUrl) return;
          await chrome.scripting.executeScript({
            target: { tabId: tab.id ?? 0 },
            func: injectedScript,
            args: [command, tab.title ?? "", tab.url ?? ""],
          });
          const text = command === "copyDefault" ? "Plain" : "MD";
          const color = command === "copyDefault" ? "#bac8ff" : "#b2f2bb";
          await chrome.action.setBadgeBackgroundColor({ color });
          await chrome.action.setBadgeText({ text });
        } catch (error) {
          console.error(error);
          await chrome.action.setBadgeBackgroundColor({ color: "#ffa8a8" });
          await chrome.action.setBadgeText({ text: "error" });
        } finally {
          await new Promise((resolve) => setTimeout(resolve, 2_000));
          await chrome.action.setBadgeText({ text: "" });
        }
      }
      run();
    }
  );
});

export {};
