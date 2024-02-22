const test = require('node:test');
const assert = require('node:assert/strict');

const { createReadStream } = require('node:fs');
const { PassThrough } = require('node:stream');
const { buffer } = require('node:stream/consumers');

const dumpTile = require('../');

test('dump tile', async function (t) {

  await t.test('empty tile', async function () {
    const o = await parseToObject('test/fixtures/empty.pbf');
    assert.deepEqual(o, { layers: [] });
  });

  await t.test('simple tile', async function () {
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
  return JSON.parse((await buffer(to)));
}
