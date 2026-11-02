INTEGRATION GUIDE: docker-shrink

1. Pre-Commit Git Hook
Ensure no developer commits an unoptimized Dockerfile:

```bash
npx docker-shrink --check
```

2. GitHub Actions Workflow (.github/workflows/docker.yml)

```yaml
name: Dockerfile Lint and Shrink
on: [push, pull_request]

jobs:
  docker-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Audit Dockerfile
        run: npx docker-shrink --check
```

3. Automated Fix in Local Build Script

```bash
npx docker-shrink --fix && docker build -t myapp:latest .
```
