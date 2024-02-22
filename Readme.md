[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# dump-tile

Dumps MVT tiles encoded in .pbf to JSON

## Install

```sh
$ npm -g install dump-tile
```

## Usage

```sh
# dump tile from tile service
curl --compress https://tiles.example.com/tile/2/3/5/pbf | dump-tile

# dump tile from file
cat tile.pbf | dump-tile > tile.json
```

## License

MIT © [Damian Krzeminski](https://furkot.com)

[npm-image]: https://img.shields.io/npm/v/dump-tile
[npm-url]: https://npmjs.org/package/dump-tile

[build-url]: https://github.com/pirxpilot/dump-tile/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/dump-tile/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/dump-tile
[deps-url]: https://libraries.io/npm/dump-tile
