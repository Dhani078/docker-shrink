FAQ: docker-shrink

Q: Will docker-shrink break my production build scripts?
A: docker-shrink creates a separate optimized file (`Dockerfile.optimized`) by default, leaving your original Dockerfile untouched until you review the diff.

Q: How does it achieve 70 percent image size reductions?
A: It replaces bloated base images (such as `node:latest` which is 1.1GB) with minimal alternatives (`node:22-alpine` or `distroless` at 180MB) and collapses chained RUN commands to delete temporary apt/apk package caches in the same layer.
