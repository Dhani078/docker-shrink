ARCHITECTURE: docker-shrink

1. Architectural Pipeline

```
+-------------------------------------------------------------+
|                      INPUT PROVIDER                         |
|   - Reads target Dockerfile (node:fs)                       |
|   - Inspects project root for .dockerignore                 |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     DOCKERFILE PARSER                       |
|   - Tokenizes instructions: FROM, RUN, COPY, ADD, WORKDIR   |
|   - Handles line continuation backslashes                   |
|   - Maps layer sequence and dependency chain                |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     RULE EVALUATION ENGINE                  |
|   - Compares base image tags against size index             |
|   - Detects unchained package installations                 |
|   - Analyzes build cache invalidation hierarchy             |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                   TRANSFORMER & REWRITER                    |
|   - Creates Dockerfile.backup on --fix                      |
|   - Generates formatted, optimized Dockerfile instructions  |
|   - Computes estimated megabyte and percentage savings      |
+-------------------------------------------------------------+
```

2. Standard Library Mapping
- Filesystem: Uses node:fs readFileSync, writeFileSync, existsSync.
- Path Resolution: Uses node:path.

3. Performance Guarantees
- Sub-20ms analysis on standard Dockerfiles.
- Zero npm package dependencies.
