[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

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

[npm-image]: https://img.shields.io/npm/v/dump-tile.svg
[npm-url]: https://npmjs.org/package/dump-tile

[travis-url]: https://travis-ci.org/pirxpilot/dump-tile
[travis-image]: https://img.shields.io/travis/pirxpilot/dump-tile.svg

[gemnasium-image]: https://img.shields.io/gemnasium/pirxpilot/dump-tile.svg
[gemnasium-url]: https://gemnasium.com/pirxpilot/dump-tile
