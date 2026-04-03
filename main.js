const assert = require('assert');

const RATED_CAPACITY = 120;

function calculateSoH(presentCapacity) {
  return (presentCapacity / RATED_CAPACITY) * 100;
}

function classifyBattery(soh) {
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
    const soh = calculateSoH(capacity);
    const category = classifyBattery(soh);
    counts[category]++;
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