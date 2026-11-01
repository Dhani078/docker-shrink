EXAMPLES: docker-shrink

1. Analyze and Print Optimization Report
Command:
```bash
npx docker-shrink Dockerfile
```

---

2. Generate Optimized Dockerfile
Command:
```bash
npx docker-shrink Dockerfile --output Dockerfile.optimized
```

---

3. Enforce Alpine Base and Multi-Stage Pipeline
Command:
```bash
npx docker-shrink Dockerfile --target alpine --multi-stage
```
