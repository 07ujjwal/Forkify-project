## About The Project
Forkify is a vanilla JavaScript application that interacts with the Forkify API to fetch and display recipe food data. The user can search for a specific recipe, and save to a favorites list via local storage.
The user can easily increase or decrease servings as per his need and can view detailed directions.

## Built With

This app is built with pure vanilla JavaScript along with HTML and SCSS. It uses webpack as module bundler and NPM as package manager.

HTML
SCSS
Vanilla JavaScript
Webpack
NPM

# Getting Started
  To get started with project just simply fork this repo or download locally on your System.

To get a local copy up and running follow these simple example steps.

## Prerequisites
  Start with the latest version of NPM to avoid any errors:
  ```
   npm install npm@latest -g
```
Also install additional dependencies
```
 npm i --save core-js regenerator-runtime
 npm install @parcel/transformer-sass --save-dev
```
# Installation
Get a free API Key at Forkify API_KEY
Clone the repo
```
git clone https://github.com/07ujjwal/Forkify-project/new/master?filename=README.md

```
Install NPM packages
```
npm install
```
Enter your API in config.js

```
const KEY = 'ENTER YOUR API';

```

## Usage

The Forkify Recipe App allows users to search for recipes.

Users can view the recipe along with the cook time and also increase or decrease the amount of servings they need.

Bookmarked recipes are stored in local storage so no database was required for this application.
