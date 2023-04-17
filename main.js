const stores = [
  {
    name: "Aldi",
    urlScheme: "https://www.aldi-now.ch/de/search?q=",
  },
  {
    name: "Coop",
    urlScheme: "https://www.coop.ch/de/search/?text=",
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

      stores.forEach((store) => {
        const url = `${store.urlScheme}${encodedItem}`;
        urls.push(url);
        const button = document.createElement("button");
        button.innerText = `Search ${store.name}: ${item.trim()}`;
        button.onclick = function () {
          window.open(url, "_blank");
        };
        urlList.appendChild(button);
      });

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
