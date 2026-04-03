const assert = require('assert');

const RATED_CAPACITY = 120;

function isValidNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

function calculateSoH(presentCapacity) {
  if (presentCapacity < 0) return null;

  const soh = (presentCapacity / RATED_CAPACITY) * 100;
  return Math.min(Math.max(soh, 0), 100);
}

function classifyBattery(soh) {
  if (soh === null) return null;

  if (soh > 83 && soh <= 100) return 'healthy';
  if (soh >= 63 && soh <= 83) return 'exchange';
  return 'failed';
}

function countBatteriesByHealth(presentCapacities) {
  const counts = {
    healthy: 0,
    exchange: 0,
    failed: 0
  };

  for (const capacity of presentCapacities) {
    if (!isValidNumber(capacity)) continue;

    const soh = calculateSoH(capacity);
    const category = classifyBattery(soh);

    if (category) counts[category]++;
  }

  return counts;
}

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');

  const presentCapacities = [113, 116, 80, 95, 92, 70];
  const counts = countBatteriesByHealth(presentCapacities);

  assert.strictEqual(counts.healthy, 2);
  assert.strictEqual(counts.exchange, 3);
  assert.strictEqual(counts.failed, 1);

  console.log("Done counting :)");
}

testBucketingByHealth();