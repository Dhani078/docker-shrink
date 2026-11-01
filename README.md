docker-shrink

[![Release](https://img.shields.io/github/v/release/Dhani078/docker-shrink?color=blue)](https://github.com/Dhani078/docker-shrink/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green.svg)](https://nodejs.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](#)

Automated Dockerfile multi-stage analyzer and image size minimizer. Analyzes Dockerfiles, strips build-time bloat, converts single-stage containers to multi-stage distroless/alpine builds, and cuts final image size by 70 to 90 percent.

---

The Problem

Modern application Docker images frequently swell to 1 GB or 2 GB:
- Build dependencies (compilers, git, devDependencies) are shipped into production containers.
- Package manager cache directories (npm cache, pip cache, apt cache) are retained in intermediate layers.
- Oversized base images (ubuntu, debian, node:latest) are used instead of minimal runtimes.
- Massive images cause slow CI/CD deployments and fill production server disks.

---

The Solution

docker-shrink parses Dockerfile instructions, detects the target runtime (Node, Python, Go, Rust, Java, PHP), and outputs an optimized multi-stage Dockerfile:
- Stage 1: Build stage with full compiler and development toolchain.
- Stage 2: Minimal production runtime (alpine or gcr.io/distroless) containing only compiled artifacts.
- Automatically injects package manager cache cleanup commands.
- Configures non-root user execution for container hardening.

---

Installation and Usage

Run directly via npx:

```bash
npx docker-shrink Dockerfile
```

Output optimized Dockerfile to a new file:

```bash
npx docker-shrink Dockerfile --out Dockerfile.prod
```

Display diff preview without writing:

```bash
npx docker-shrink Dockerfile --diff
```

---

CLI Options

- `--diff`: Show colorized unified diff between current and proposed Dockerfile.
- `--out <path>`: Write optimized output to specified file path.
- `--base <type>`: Choose production base image type: alpine, distroless, or slim.
- `--non-root`: Ensure production stage enforces non-root USER directive.
- `--json`: Output analysis metrics and projected size savings as JSON.

---

Optimization Strategy

1. Multi-Stage Separation
Separates compilation assets from deployment runtime.

2. Cache Busting Layer Optimization
Combines `RUN apt-get update && apt-get install && rm -rf /var/lib/apt/lists` into single layer.

3. Production Dependency Trimming
Applies `npm prune --production` or `--no-dev` flags during dependency copying.

4. Non-Root Security
Adds dedicated non-privileged system user for container execution.

---

Author

Dhani078
