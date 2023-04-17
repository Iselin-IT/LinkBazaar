function getUrlParameter(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function prepopulateItems() {
  const itemsParam = getUrlParameter("items");
  if (itemsParam) {
    const items = itemsParam.split(",").join("\n");
    document.getElementById("inputList").value = items;
    convertListToUrls();
  }
}

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
    urlScheme: "https://www.migros.ch/en/search?query=",
    emoji: "🛍️",
  },

  {
    name: "Galaxus",
    urlScheme: "https://www.galaxus.ch/de/search?q=",
    emoji: "🌌",
  },
  {
    name: "K-Tipp",
    urlScheme: "https://www.ktipp.ch/tests/produktetests/?q=",
    extraParams: "&searchDoctype=Produktetest&searchTheme=",
    emoji: "🔍",
  },
  {
  name: "Saldo",
  urlScheme: "https://www.saldo.ch/tests/produktetests/?q=",
  extraParams: "&searchDoctype=Produktetest&searchTheme=",
  emoji: "💰",
},
];

let urls = [];

function convertListToUrls() {
  const inputList = document.getElementById("inputList");
  const items = inputList.value.split("\n");
  const cardsContainer = document.getElementById("cardsContainer");

  cardsContainer.innerHTML = "";
  urls = [];

  items.forEach((item) => {
    if (item.trim() !== "") {
      const encodedItem = encodeURIComponent(item.trim());

      const card = document.createElement("div");
      card.className = "card";
      cardsContainer.appendChild(card);

      const itemLabel = document.createElement("h3");
      itemLabel.textContent = item.trim();
      card.appendChild(itemLabel);

      const itemUrls = [];
      stores.forEach((store) => {
        const url = `${store.urlScheme}${encodedItem}${store.extraParams || ""}`;
        itemUrls.push(url);
        urls.push(url);
        const button = document.createElement("button");
        button.innerText = store.emoji;
        button.onclick = function () {
          window.open(url, "_blank");
        };
        card.appendChild(button);
      });

      const openAllButton = document.createElement("button");
      openAllButton.innerText = "Open All";
      openAllButton.onclick = function () {
        itemUrls.forEach((url) => {
          window.open(url, "_blank");
        });
      };
      card.appendChild(openAllButton);

      const separator = document.createElement("hr");
      card.appendChild(separator);
    }
  });

  // Add buttons for opening all URLs for specific stores
  stores.forEach((store) => {
    const openAllStoreButton = document.createElement("button");
    openAllStoreButton.innerText = `Open All ${store.name}`;
    openAllStoreButton.onclick = function () {
      urls
        .filter((url) => url.startsWith(store.urlScheme))
        .forEach((url) => {
          window.open(url, "_blank");
        });
    };
    cardsContainer.appendChild(openAllStoreButton);
  });

  document.getElementById("openUrlsBtn").disabled = urls.length === 0;
}

// Call prepopulateItems at the end of the script
prepopulateItems();
