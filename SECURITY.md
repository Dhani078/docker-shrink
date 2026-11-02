SECURITY POLICY: docker-shrink

1. Security Posture
docker-shrink enhances container security as a direct consequence of shrinking image attack surface:
- Smaller Base Images: Alpine and Slim images contain 85% fewer installed packages and known CVEs.
- Non-Root Recommendation: Flags missing USER instructions to prevent running containers as root.
- Purely Offline: Reads target files locally with zero network connectivity.

2. Vulnerability Reporting
- Maintainer: Dhani078
- Security Contact: dhanisepeda@gmail.com
