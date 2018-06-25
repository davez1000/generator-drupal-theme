# generator-drupal-theme

> Generates custom Webpack-based themes for Drupal 8

## Installation

First, install [Yeoman](http://yeoman.io) and generator-drupal-theme using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @davez1000/generator-drupal-theme
```

## Usage

Say you want to generate a theme called "My Custom Theme"

```bash
mkdir -p custom/my_drupal_theme
cd custom/my_drupal_theme
yo @davez1000/drupal-theme
```

Then at the prompts

1. Enter your theme name (e.g. My Drupal Theme)
2. Enter your local drupal server's URI (e.g. http://dev-site.dev:8080)

Finally start your webpack dev server

```bash
npm start
```

## Building
After development, build the JS bundle
```bash
npm run-script build
```


