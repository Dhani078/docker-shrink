const assert = require('node:assert');
const { optimizeDockerfile } = require('../bin/cli.js');

console.log('Running docker-shrink tests...');
const input = 'FROM node:20\nRUN apt-get update && apt-get install -y curl\n';
const res = optimizeDockerfile(input);
assert(res.optimized.includes('node:20-alpine'), 'Should convert to alpine base');
assert(res.suggestions.length >= 2, 'Should have multiple suggestions');
console.log('docker-shrink tests passed cleanly.');
process.exit(0);
