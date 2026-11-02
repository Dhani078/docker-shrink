FAQ: docker-shrink

Q1: Why is Alpine not always recommended for Python?
A: Alpine uses musl libc instead of glibc. For Python packages with pre-compiled C-extensions (numpy, pandas), Alpine requires compiling from source, increasing build times. For Python, docker-shrink recommends python:3.11-slim or distroless.

Q2: Does docker-shrink modify my working container configuration?
A: Only when --fix is explicitly passed. A backup file (Dockerfile.backup) is always created first.

Q3: Can docker-shrink create multi-stage builds?
A: Yes. When it detects both build tools and runtime execution in the same stage, it recommends splitting into builder and runner stages.

Q4: Does docker-shrink require the Docker daemon to be running?
A: No. docker-shrink performs static text and AST analysis. You do not need Docker installed or running to optimize your Dockerfiles.
