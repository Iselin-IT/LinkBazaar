const stores = [
  {
    name: "Aldi",
    urlScheme: "https://www.aldi-now.ch/de/search?q=",
    favicon: "https://www.aldi-now.ch/favicon.ico",
  },
  {
    name: "Coop",
    urlScheme: "https://www.coop.ch/de/search/?text=",
    favicon: "https://www.coop.ch/_ui/23.3.1.237/desktop/common/img/core/global-images/img/favicons/apple-touch-icon.png",
  },
  {
    name: "Migros",
    urlScheme: "https://www.migros.ch/en/search?query=",
    favicon: "https://www.migros.ch/favicon.ico",
  },
  {
    name: "Galaxus",
    urlScheme: "https://www.galaxus.ch/de/search?q=",
    favicon: "https://www.galaxus.ch/favicon.ico",
  },
  {
    name: "K-Tipp",
    urlScheme: "https://www.ktipp.ch/tests/produktetests/?q=",
    extraParams: "&searchDoctype=Produktetest&searchTheme=",
    favicon: "https://www.ktipp.ch/fileadmin/templates/favicon/ktipp/apple-icon-57x57.png",
  },
  {
    name: "Saldo",
    urlScheme: "https://www.saldo.ch/tests/produktetests/?q=",
    extraParams: "&searchDoctype=Produktetest&searchTheme=",
    favicon: "https://www.saldo.ch/fileadmin/templates/favicon/saldo/apple-icon-57x57.png",
  },
];

let allUrls = [];

function prepopulateItems() {
  const urlParams = new URLSearchParams(window.location.search);
  const itemsParam = urlParams.get("items");
  if (itemsParam) {
    document.getElementById("inputList").value = itemsParam.replace(/,/g, "\n");
  }
  // Call convertListToUrls to enable/disable the "Open All URLs" button based on prepopulated items
convertListToUrls();
}

function convertListToUrls() {
  allUrls = [];
  const inputList = document.getElementById("inputList");
  const items = inputList.value.split("\n");
  const cardsContainer = document.getElementById("cardsContainer");

  cardsContainer.innerHTML = "";

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
        allUrls.push(url);
        const button = document.createElement("button");
        const favicon = document.createElement("img");
        favicon.src = store.favicon;
        favicon.width = 16;
        favicon.height = 16;
        button.appendChild(favicon);
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

  function removeItemAndCard(index) {
    const inputList = document.getElementById("inputList");
    const items = inputList.value.split("\n");
    items.splice(index, 1);
    inputList.value = items.join("\n");

    const cardToRemove = document.querySelector(`.card[data-index="${index}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }

    convertListToUrls();
  }


  stores.forEach((store) => {
    const openAllStoreButton = document.createElement("button");
    openAllStoreButton.innerText = "Open All " + store.name;
    openAllStoreButton.onclick = function () {
      allUrls
        .filter((url) => url.startsWith(store.urlScheme))
        .forEach((url) => {
          window.open(url, "_blank");
        });
    };
    cardsContainer.appendChild(openAllStoreButton);
  });
  // Enable or disable the "Open All URLs" button
openAllUrlsButton.disabled = allUrls.length === 0;
}

function openUrls() {
  allUrls.forEach((url) => {
    window.open(url, "_blank");
  });
}

document.getElementById("convertButton").onclick = convertListToUrls;
document.getElementById("openAllUrlsButton").onclick = openUrls;

prepopulateItems();
