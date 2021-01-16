# itunes-artwork-finder

Search for artwork over iTunes using their public API.

## Accessing the app

You can access to the app from [GitHub pages](https://alexbcberio.github.io/itunes-artwork-finder/) or by downloading the repository and opening the index.html file located in the "dist" directory.

## Developing locally

In order to develop you need [NodeJS](https://nodejs.org) and a node dependency manager [yarn](https://yarnpkg.com/) (recommended) or [npm](https://www.npmjs.com/).

Once you have this installed open a terminal and install the dependencies:

```shell
> cd <project location>
> yarn
```

or with npm

```shell
> cd <project location>
> npm install
```

Then run this to start compiling in watch mode `yarn watch` or `npm run watch`, if you also want to start a webserver locally `yarn open` or `npm run open` (if you don't want to automatically open it on the browser use the `serve` script).

## Building for production use

Once you've finished you have to build the app, this will minify all js files and compile SASS into CSS. You can run the `build` script `yarn build` or `npm run build`.
