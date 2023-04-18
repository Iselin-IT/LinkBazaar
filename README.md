A simple web application that allows users to input a list of items and generate search URLs for various Swiss online stores. Users can open individual search URLs or all URLs at once with a single click.

## Features

- Currently Supported Websites:
  - Aldi
  - Coop
  - Migros
  - Galaxus
  - K-Tipp
  - Saldo
- Prepopulate items via URL parameters
- Open individual search URLs or all URLs at once
- Remove items/cards from the list
- Responsive card-based design

## Usage

1. Open [https://iselin-it.github.io/LinkBazaar/](https://iselin-it.github.io/LinkBazaar/) in a web browser.
2. Enter a list of items in the input field (one item per line).
3. Click the "Convert List to URLs" button to generate search URLs for each store.
4. Click individual store buttons to open search URLs in new tabs or click the "Open All URLs" button to open all search URLs at once.

## Prepopulating Items via URL Parameters

To prepopulate the input field with a list of items, add the \`items\` parameter to the URL with a comma-separated list of items:

https://iselin-it.github.io/LinkBazaar/?items=Milch,Brot,Eier,Äpfel,Käse,Orangen,Schokolade,Reis,Nudeln,Tomaten


This will prepopulate the input field with the items.

## Technologies

- HTML
- CSS
- JavaScript

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
