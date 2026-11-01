ARCHITECTURE: docker-shrink

Data Flow Diagram

```
+-----------------------------------------------------------+
|                        CLI Entrypoint                     |
|                   (bin/docker-shrink.js)                  |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                     Dockerfile Parser                     |
|   - Lexes instructions: FROM, RUN, COPY, ADD, CMD, EXPOSE |
|   - Preserves arguments and multi-line continuations      |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                   Stack Detection Engine                  |
|   - Identifies: Node.js, Python, Go, Rust, Java, PHP      |
|   - Evaluates package managers: npm, pnpm, yarn, pip, uv  |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                  Transformation Pipeline                  |
|   - Injects multi-stage builder boundary                  |
|   - Replaces heavy base tags with minimal variants        |
|   - Chains cache cleanup instructions                     |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|                    Diff & Emitter Engine                  |
|   - Computes unified diff for terminal preview            |
|   - Emits hardened Dockerfile to destination              |
+-----------------------------------------------------------+
```

Component Responsibilities

- bin/docker-shrink.js: Command execution and flag parsing.
- src/parser.js: Dockerfile instruction lexer.
- src/detector.js: Runtime stack identifier.
- src/transformers.js: Optimization rules and multi-stage logic.
- src/diff.js: Terminal unified diff renderer.
