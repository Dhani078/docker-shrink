SPECIFICATION: docker-shrink

1. Scope and Objective

docker-shrink parses Dockerfile instruction streams, detects runtime stacks, and deterministically applies optimization transforms to produce minimal, secure, multi-stage production images.

2. Optimization Transformations

2.1. TRANS-01: Multi-Stage Build Splitting
- Detects single-stage builds containing compilation tools.
- Converts to builder stage (`FROM base AS builder`) and production runner stage (`FROM runtime AS runner`).

2.2. TRANS-02: Base Image Modernization
- Replaces generic default images (e.g. `node:20`, `python:3.11`) with minimal verified alternatives (`node:20-alpine`, `python:3.11-slim`).

2.3. TRANS-03: Package Cache Purging
- Appends cache cleanup directives (`apt-get clean`, `rm -rf /var/lib/apt/lists`, `npm cache clean --force`) to eliminate layer bloat.

2.4. TRANS-04: Non-Root User Hardening
- Injects `USER 10001` or dedicated application user directive before production CMD.

3. Exit Codes

- 0: Successful analysis and optimization output.
- 1: Dockerfile not found or unreadable.
- 2: Invalid syntax in Dockerfile.
- 3: Output write failure.
