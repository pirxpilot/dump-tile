#!/usr/bin/env node

import { buffer } from 'node:stream/consumers';
import Pbf from '@mapwhit/pbf';
import { VectorTile } from '@mapwhit/vector-tile';

export default function dump(input, output) {
  return buffer(input).then(buffer => dumpBuffer(buffer, output));
}

function dumpBuffer(buffer, output) {
  const vt = new VectorTile(new Pbf(buffer));
  const tile = dumpTile(vt);
  output.write(JSON.stringify(tile, null, 2));
  output.write('\n');
}

function dumpTile({ layers }) {
  const tile = {};
  tile.layers = Object.values(layers).map(dumpLayer);
  return tile;
}

function dumpLayer(vl) {
  const { version, name, extent, length } = vl;
  const layer = { version, name, extent, features: [] };
  for (let i = 0; i < length; i++) {
    layer.features.push(dumpFeature(vl.feature(i)));
  }
  return layer;
}

function dumpFeature(vf) {
  const { type, extent, id, properties } = vf;
  const geometry = dumpGeometry(vf.loadGeometry());
  return { type, extent, id, properties, geometry };
}

function dumpGeometry(vg) {
  function convertRing(ring) {
    return ring.reduce((r, { x, y }) => {
      r.push(x, y);
      return r;
    }, []);
  }
  return vg.map(convertRing);
}

if (import.meta.main) {
  dump(process.stdin, process.stdout);
}
