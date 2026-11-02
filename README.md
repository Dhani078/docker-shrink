docker-shrink

[![Release](https://img.shields.io/github/v/release/Dhani078/docker-shrink?color=blue)](https://github.com/Dhani078/docker-shrink/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green.svg)](https://nodejs.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](#)

Zero-dependency Dockerfile analyzer and layer optimizer. Shrinks container image sizes by 40 to 80 percent by detecting bloated base images, combining RUN instructions, clearing package caches, and suggesting multi-stage builds.

---

THE PROBLEM

Bloated Docker images degrade developer velocity and cloud budgets:
- Base images like node:latest or python:latest introduce 800MB to 1.2GB of unused tools.
- Multiple consecutive RUN commands create immutable layered file bloat.
- Package managers (apt, apk, pip, npm) leave hundreds of megabytes of cached tarballs on disk.
- Missing .dockerignore causes local node_modules, logs, and git folders to be bundled into production containers.
- Deployment pull times slow down Kubernetes autoscaling and CI pipelines.

---

THE SOLUTION

docker-shrink statically inspects your Dockerfile and project structure:
- Base Image Optimization: Recommends Alpine, Slim, or Distroless alternatives.
- Layer Consolidation: Identifies chained RUN patterns to eliminate intermediate layer bloat.
- Cache Purging: Detects missing cache cleanups (apt-get clean, rm -rf /var/lib/apt/lists).
- .dockerignore Verification: Audits and generates standard ignore templates.
- Automated Fix Mode: Automatically writes optimized Dockerfile with --fix flag.

---

QUICKSTART

Analyze Dockerfile in current directory:

```bash
npx docker-shrink
```

Inspect a specific Dockerfile:

```bash
npx docker-shrink path/to/Dockerfile
```

Automatically apply recommended optimizations:

```bash
npx docker-shrink --fix
```

---

COMMAND MATRIX

Command | Argument | Description | Default
--- | --- | --- | ---
docker-shrink | [file] | Analyze specified or local Dockerfile | ./Dockerfile
docker-shrink --fix | [file] | Apply optimizations directly to file | Creates backup
docker-shrink --check | [file] | CI mode, fails with code 1 if bloat detected | Read only
docker-shrink --help | None | Print comprehensive command list and flags | Flag
docker-shrink --version | None | Print current semantic version | Flag

---

CLI OPTIONS

- `--fix`: Rewrite Dockerfile with verified layer optimizations.
- `--check`: Run in strict lint mode for CI/CD pipeline checks.
- `--json`: Output findings and layer metrics as structured JSON.
- `--output <path>`: Write optimized output to new file instead of overwriting.

---

INTERACTIVE WORKFLOW PREVIEW

```
$ npx docker-shrink Dockerfile

[docker-shrink] Inspecting Dockerfile layer efficiency...

Line | Rule Triggered         | Current Instruction            | Recommended Optimization
-----|------------------------|--------------------------------|------------------------------------
1    | Heavy Base Image       | FROM node:latest               | FROM node:20-alpine
5    | Package Cache Bloat    | RUN apt-get install -y curl    | RUN apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists
8    | Uncached Layer Order   | COPY . .                       | COPY package.json package-lock.json ./ (order before app source)

Estimated size reduction: 940 MB -> 180 MB (80.8% reduction)
Run 'npx docker-shrink --fix' to automatically apply optimizations.
```

---

DATA SAFETY GUARANTEES

- Automatic Backup: Modifying a Dockerfile via --fix automatically creates Dockerfile.backup.
- Offline Standard Library: Pure Node.js filesystem analysis with zero external dependencies.

---

LICENSE AND AUTHOR

- License: MIT License
- Author: Dhani078 (dhanisepeda@gmail.com)
- Source Repository: https://github.com/Dhani078/docker-shrink
