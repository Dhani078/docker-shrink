#!/usr/bin/env node
const fs = require('node:fs');

function optimizeDockerfile(content) {
  const lines = content.split('\n');
  const suggestions = [];
  const optimizedLines = [];

  for (let line of lines) {
    let opt = line;
    if (/^FROM\s+node:(?:latest|[0-9]+)$/i.test(line.trim())) {
      opt = line.trim() + '-alpine';
      suggestions.push({ rule: 'Use Alpine Base', original: line, improved: opt });
    }
    if (/^FROM\s+python:(?:latest|[0-9]+)$/i.test(line.trim())) {
      opt = line.trim() + '-slim';
      suggestions.push({ rule: 'Use Slim Base', original: line, improved: opt });
    }
    if (/apt-get\s+install/i.test(line) && !line.includes('rm -rf /var/lib/apt/lists')) {
      opt = line.trim() + ' && apt-get clean && rm -rf /var/lib/apt/lists/*';
      suggestions.push({ rule: 'Clean Apt Lists', original: line, improved: opt });
    }
    optimizedLines.push(opt);
  }

  return {
    original: content,
    optimized: optimizedLines.join('\n'),
    suggestions
  };
}

function run() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h') || !args.length) {
    console.log('docker-shrink - Dockerfile size optimizer');
    console.log('Usage: npx docker-shrink <Dockerfile> [options]');
    process.exit(0);
  }
  if (args.includes('--version') || args.includes('-v')) {
    console.log('docker-shrink v1.0.0');
    process.exit(0);
  }

  const file = args[0];
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    process.exit(1);
  }

  const content = fs.readFileSync(file, 'utf-8');
  const res = optimizeDockerfile(content);
  console.log('Optimization Suggestions:');
  console.log('--------------------------------------------------');
  res.suggestions.forEach(s => console.log(`[${s.rule}] ${s.original} -> ${s.improved}`));
  console.log('--------------------------------------------------');
  console.log('\nOptimized Dockerfile:\n');
  console.log(res.optimized);
}

if (require.main === module) {
  run();
}

module.exports = { optimizeDockerfile, run };
