const assert = require('assert');
const { processBatteries } = require('./src');

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');

  const presentCapacities = [113, 116, 80, 95, 92, 70];
  const counts = processBatteries(presentCapacities);

  assert.strictEqual(counts.healthy, 2);
  assert.strictEqual(counts.exchange, 3);
  assert.strictEqual(counts.failed, 1);

  console.log("Done counting :)");
}

testBucketingByHealth();