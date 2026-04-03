const assert = require('assert');
const { processBatteries } = require('../src');

function runTests() {
  console.log("Running tests...");

  // Base test (given in assignment)
  let result = processBatteries([113, 116, 80, 95, 92, 70]);
  assert.strictEqual(result.healthy, 2);
  assert.strictEqual(result.exchange, 3);
  assert.strictEqual(result.failed, 1);

  // Boundary: exactly 83% → exchange
  result = processBatteries([99.6]);
  assert.strictEqual(result.exchange, 1);

  //Boundary: exactly 63% → exchange
  result = processBatteries([75.6]);
  assert.strictEqual(result.exchange, 1);

  // Above rated capacity → clamp to healthy
  result = processBatteries([130]);
  assert.strictEqual(result.healthy, 1);

  //Zero capacity → failed
  result = processBatteries([0]);
  assert.strictEqual(result.failed, 1);

  //  Negative values → ignored
  result = processBatteries([-10]);
  assert.deepStrictEqual(result, { healthy: 0, exchange: 0, failed: 0 });

  // Invalid values → ignored
  result = processBatteries([100, null, "abc", undefined]);
  assert.strictEqual(result.healthy, 1);

  //  Empty array
  result = processBatteries([]);
  assert.deepStrictEqual(result, { healthy: 0, exchange: 0, failed: 0 });

  console.log("All tests passed ");
}

// Run only when executed directly
if (require.main === module) {
  runTests();
}