# crypto-ticker
Simple ticker for tracking a cryptocurrency

## Installation
`npm i`

## Documentation

`npm run doc`

## Start
`npm start`

## Explanation

This project provides a framework for retrieving a result from an external API, converting it for use,
and writing it to an output.

See `./index.js`

The `Ticker` class requires four functions that can be imported from a defined `source`:

- `initializer()` - allows for custom initialization when a Ticker is instantiated.
- `reader()` - returns a promise of a data object
- `converter()` - converts the result returned by the reader to a useable format
- `writer()` - writes the result

See `./lib/source/Dummy.js` for an example.

See `./lib/source/GDAX.js` for a live source.
