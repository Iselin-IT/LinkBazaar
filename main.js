let urls = [];

function convertListToUrls() {
    const inputList = document.getElementById("inputList");
    const items = inputList.value.split("\n");
    const urlList = document.getElementById("urlList");

    urlList.innerHTML = "";
    urls = [];

    items.forEach(item => {
        if (item.trim() !== "") {
            const encodedItem = encodeURIComponent(item.trim());
            const url = `https://www.aldi-now.ch/de/search?q=${encodedItem}`;
            urls.push(url);
            const button = document.createElement("button");
            button.innerText = `Search: ${item.trim()}`;
            button.onclick = function () {
                window.open(url, "_blank");
            };
            urlList.appendChild(button);
        }
    });

    document.getElementById("openUrlsBtn").disabled = urls.length === 0;
}

function openAllUrls() {
    urls.forEach(url => {
        window.open(url);
    });
}
