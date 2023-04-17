const stores = [
  {
    name: "Aldi",
    urlScheme: "https://www.aldi-now.ch/de/search?q=",
    emoji: "🛒",
  },
  {
    name: "Coop",
    urlScheme: "https://www.coop.ch/de/search/?text=",
    emoji: "🏪",
  },
  {
    name: "Migros",
    urlScheme: "https://www.migros.ch/de/search?query=",
    emoji: "🛍️",
  },
];

let urls = [];

function convertListToUrls() {
  const inputList = document.getElementById("inputList");
  const items = inputList.value.split("\n");
  const urlList = document.getElementById("urlList");

  urlList.innerHTML = "";
  urls = [];

  items.forEach((item) => {
    if (item.trim() !== "") {
      const encodedItem = encodeURIComponent(item.trim());

      const itemLabel = document.createElement("h3");
      itemLabel.textContent = item.trim();
      urlList.appendChild(itemLabel);

      const itemUrls = [];
      stores.forEach((store) => {
        const url = `${store.urlScheme}${encodedItem}`;
        itemUrls.push(url);
        urls.push(url);
        const button = document.createElement("button");
        button.innerText = store.emoji;
        button.onclick = function () {
          window.open(url, "_blank");
        };
        urlList.appendChild(button);
      });

      const openAllButton = document.createElement("button");
      openAllButton.innerText = "Open All";
      openAllButton.onclick = function () {
        itemUrls.forEach((url) => {
          window.open(url, "_blank");
        });
      };
      urlList.appendChild(openAllButton);

      const separator = document.createElement("hr");
      urlList.appendChild(separator);
    }
  });

  document.getElementById("openUrlsBtn").disabled = urls.length === 0;
}

function openAllUrls() {
  urls.forEach((url) => {
    window.open(url);
  });
}

convertListToUrls();
