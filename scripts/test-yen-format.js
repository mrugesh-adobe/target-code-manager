const assert = require('assert');

// Formatter matching the one used in markup.html
const yenFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  maximumFractionDigits: 0
});

function safeNumber(v) {
  if (v === null || v === undefined || v === "") return NaN;
  return Number(String(v).replace(/[^0-9.-]+/g, ""));
}

function formatOrEmpty(v) {
  const n = safeNumber(v);
  return !isNaN(n) ? yenFormatter.format(n).replace(/\uFFE5/g, '¥') : "";
}

// Tests
const tests = [
  { in: 84920, out: '¥84,920' },
  { in: '84920', out: '¥84,920' },
  { in: '12100.00', out: '¥12,100' },
  { in: 12100.0, out: '¥12,100' },
  { in: null, out: '' },
  { in: undefined, out: '' },
  { in: '¥1,234', out: '¥1,234' },
  { in: '1,234.56', out: '¥1,235' } // rounding
];

tests.forEach(t => {
  const actual = formatOrEmpty(t.in);
  try {
    assert.strictEqual(actual, t.out);
    console.log(`PASS: input=${JSON.stringify(t.in)} => ${actual}`);
  } catch (err) {
    console.error(`FAIL: input=${JSON.stringify(t.in)} => expected=${t.out} actual=${actual}`);
    process.exitCode = 1;
  }
});

if (process.exitCode !== 1) console.log('All tests passed');
