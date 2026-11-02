---
name: docker-shrink
description: Dockerfile analyzer and layer optimizer CLI and agent skill. Shrinks container image sizes by 40 to 80 percent by detecting bloated base images, combining RUN instructions, and clearing package caches.
risk: safe
version: 1.0.0
---

NAME
docker-shrink - Dockerfile layer optimizer and size reducer

SYNOPSIS
npx docker-shrink [file] [options]

COMMANDS
- analyze [file]: Scan Dockerfile for size anti-patterns.
- --fix: Automatically apply recommended layer and base image fixes.
- --check: CI gate mode, exits with code 1 if optimizations exist.

OPTIONS
- --json: Emit structured JSON findings report.
- --output <path>: Write optimized content to specific path.

DETERMINISTIC BEHAVIOR AND INVARIANTS
1. The tool must never overwrite a Dockerfile without saving a backup copy at Dockerfile.backup.
2. In --check mode, if any rule flags bloat, the exit code must be 1.
3. If no optimizations are required, the exit code must be 0.
4. Output must calculate estimated megabyte reduction based on empirical base image tables.

AGENT INTEGRATION INSTRUCTIONS
When auditing container configurations or preparing deployment:
1. Run npx docker-shrink --json Dockerfile.
2. If issues are found, review suggested changes.
3. Apply fixes using npx docker-shrink --fix.

AUTHOR
Dhani078 (dhanisepeda@gmail.com)
