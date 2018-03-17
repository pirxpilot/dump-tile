const concat = require('concat-stream');
const Pbf = require('pbf');
const { VectorTile } = require('@mapbox/vector-tile');

function dump(input, output) {
  input.pipe(concat(buffer => dumpBuffer(buffer, output)));
}

function dumpBuffer(buffer, output) {
  let vt = new VectorTile(new Pbf(buffer));
  let tile = dumpTile(vt);
  output.write(JSON.stringify(tile, null, 2));
  output.write('\n');
}

function dumpTile({ layers }) {
  let tile = {};
  tile.layers = Object.values(layers).map(dumpLayer);
  return tile;
}

function dumpLayer(vl) {
  let { version, name, extent, length } = vl;
  let layer = { version, name, extent, features: [] };
  for (let i = 0; i < length; i++) {
    layer.features.push(dumpFeature(vl.feature(i)));
  }
  return layer;
}

function dumpFeature(vf) {
  let { type, extent, id, properties } = vf;
  let geometry = dumpGeometry(vf.loadGeometry());
  return { type, extent, id, properties, geometry };
}

function dumpGeometry(vg) {
  function convertRing(ring) {
    return ring.reduce(function(r, { x, y }) {
      r.push(x, y);
      return r;
    }, []);
  }
  return vg.map(convertRing);
}

if (!module.parent) {
  dump(process.stdin, process.stdout);
}

