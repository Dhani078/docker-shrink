---
name: docker-shrink
description: Dockerfile multi-stage analyzer and image size minimizer. Use when user wants to optimize Docker images, reduce container size, speed up Docker builds, or convert Dockerfile to multi-stage production builds.
version: 1.0.0
author: Dhani078
---

Docker Shrink Skill

Use when reviewing or improving container setups across any repository with Dockerfile configurations.

Instructions

1. Inspect existing Dockerfile:
   ```bash
   npx docker-shrink Dockerfile --diff
   ```

2. Evaluate optimization recommendations:
   - Multi-stage build separation.
   - Switch from heavy base image to alpine or distroless.
   - Clean package manager caches in same RUN layer.
   - Enforce non-root execution user.

3. Apply optimized configuration:
   ```bash
   npx docker-shrink Dockerfile --out Dockerfile --backup
   ```

4. Verify build:
   Execute `docker build -t test-build .` to ensure container builds cleanly with zero broken paths.
