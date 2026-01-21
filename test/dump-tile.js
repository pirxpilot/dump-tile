import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { PassThrough } from 'node:stream';
import { buffer } from 'node:stream/consumers';
import test from 'node:test';
import dumpTile from '../index.js';

test('dump tile', async t => {
  await t.test('empty tile', async () => {
    const o = await parseToObject('test/fixtures/empty.pbf');
    assert.deepEqual(o, { layers: [] });
  });

  await t.test('simple tile', async () => {
    const o = await parseToObject('test/fixtures/data.pbf');
    assert(Array.isArray(o.layers));
    assert.equal(o.layers.length, 16);
  });
});

async function parseToObject(filename) {
  const from = createReadStream(filename);
  const to = new PassThrough();
  await dumpTile(from, to);
  to.end();
  return JSON.parse(await buffer(to));
}
