SPECIFICATION: docker-shrink

1. Scope and Technical Purpose
docker-shrink parses Dockerfile grammar, identifies image size anti-patterns, evaluates layer caching order, and generates optimized single-stage or multi-stage instructions.

2. Optimization Rule Catalog

2.1. RULE-BASE: Heavy Base Image Detection
- Match: FROM node:latest, FROM python:latest, FROM golang:latest, FROM ubuntu:latest
- Optimization: Replace with official Alpine (e.g., node:20-alpine) or Slim variants.
- Impact: Immediate 500MB to 900MB image size reduction.

2.2. RULE-CACHE: Package Manager Cache Elimination
- Match: apt-get install without rm -rf /var/lib/apt/lists, apk add without --no-cache, pip install without --no-cache-dir
- Optimization: Append cache cleaning command in same RUN instruction.
- Impact: Eliminates 30MB to 150MB of dead package index cache.

2.3. RULE-ORDER: Cache Invalidation Order
- Match: COPY . . before package dependency install steps.
- Optimization: Move dependency manifest copy (package.json, requirements.txt, go.mod) before source copy.
- Impact: Drastically improves build layer caching on source code edits.

2.4. RULE-IGNORE: Missing Dockerignore
- Match: Project root missing .dockerignore file.
- Optimization: Generate standard .dockerignore excluding .git, node_modules, dist, logs.
- Impact: Prevents multi-gigabyte build context uploads to Docker daemon.

3. Exit Codes
- 0: Dockerfile is fully optimized.
- 1: Optimizations available or CI check failed.
- 2: Dockerfile not found or unreadable.
