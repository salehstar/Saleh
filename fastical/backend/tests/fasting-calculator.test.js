const { calculateFastHours } = require('../logic/fasting-calculator');
const assert = require('assert');

function runTests() {
  // Test case 1: Basic calculation
  let fastHours = calculateFastHours(500, 2000);
  assert.strictEqual(fastHours, 6, 'Test Case 1 Failed: Basic calculation');

  // Test case 2: Zero calories
  fastHours = calculateFastHours(0, 2000);
  assert.strictEqual(fastHours, 0, 'Test Case 2 Failed: Zero calories');

  // Test case 3: Calories equal to TDEE
  fastHours = calculateFastHours(2000, 2000);
  assert.strictEqual(fastHours, 24, 'Test Case 3 Failed: Calories equal to TDEE');

  // Test case 4: TDEE is zero
  assert.throws(() => calculateFastHours(500, 0), Error, 'Test Case 4 Failed: TDEE is zero');

  // Test case 5: TDEE is negative
  assert.throws(() => calculateFastHours(500, -100), Error, 'Test Case 5 Failed: TDEE is negative');

  console.log('All tests passed!');
}

runTests();
