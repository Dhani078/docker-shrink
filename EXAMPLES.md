EXAMPLES: docker-shrink

Scenario 1: Analyzing Standard Node.js Dockerfile
```bash
$ npx docker-shrink
[docker-shrink] Inspecting Dockerfile...
Rule: Heavy Base Image
  Found: FROM node:latest
  Fix: FROM node:20-alpine
Rule: Missing Clean in apt-get
  Found: RUN apt-get update && apt-get install -y git
  Fix: RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists
Estimated Savings: 740 MB (78%)
```

Scenario 2: Applying Automatic Optimizations
```bash
$ npx docker-shrink --fix
[docker-shrink] Saved backup to Dockerfile.backup
[docker-shrink] Optimized Dockerfile written successfully.
```

Scenario 3: CI/CD Pipeline Build Check
```bash
$ npx docker-shrink --check
[docker-shrink] Error: Dockerfile has 2 unoptimized layers. Build failed.
```

Scenario 4: Generating JSON Report
```bash
$ npx docker-shrink --json
{
  "file": "Dockerfile",
  "baseImage": "node:latest",
  "recommendedBase": "node:20-alpine",
  "optimizations": 2,
  "estimatedSavingsMb": 740
}
```
