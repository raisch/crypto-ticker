# crypto-ticker

Simple ticker for tracking the price of a crytocurrency.

## Installation
`npm i`

## Documentation

`npm run doc`

## Start
`npm start`

## Explanation

This project provides a framework for retrieving a result from an external API, converting it for use,
and writing it to an output.

The `Ticker` class used four functions that are typically imported from a predefined `source`:

- `initializer()` - allows for custom initialization when a Ticker is instantiated. (Optional)
- `reader()` - returns a promise of a data object
- `converter()` - converts the result returned by the reader to a format useable by the writer (Optional)
- `writer()` - writes the result


See `./index.js` which creates and starts a Ticker instance using the predefined GDAX source.

See `./lib/source/Dummy.js` for an example of a source.

See `./lib/source/GDAX.js` for a live source.
