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

Then run this to start compiling in watch mode `yarn watch` or `npm run watch`, if you also want to start a webserver locally `yarn serve` or `npm run serve` this will start a [browser-sync](https://classic.yarnpkg.com/en/package/browser-sync) webserver where all interactions are synched between sessions.

You can access the non browser-sync server from the port `8001`.

## Building for production use

Once you've finished you have to build the app, this will minify all js files and compile SASS into CSS. You can run the `build` script `yarn build` or `npm run build`.
