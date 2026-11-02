TROUBLESHOOTING: docker-shrink

Diagnostic Runbook for Common Failures

Problem 1: Container build fails after switching to Alpine
- Symptom: Error loading shared libraries (e.g., libc.musl).
- Cause: Application depends on native C libraries compiled for glibc.
- Solution: Use slim variants (e.g., node:20-slim or python:3.11-slim) which retain glibc compatibility.

Problem 2: Error: Dockerfile not found
- Symptom: CLI exits with code 2.
- Cause: No Dockerfile exists in current directory.
- Solution: Specify path explicitly: npx docker-shrink deploy/Dockerfile.

Problem 3: Cache cleaning causes subsequent RUN to fail
- Symptom: apt-get package not found in subsequent instruction.
- Cause: Running apt-get install in a separate RUN step after cache was removed.
- Solution: Combine apt-get update and install within the same single RUN command.
