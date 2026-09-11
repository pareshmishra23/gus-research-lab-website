#!/usr/bin/env bash

# ==============================================================================
# Samsung M31 (SM-M315F) Environment Inspection Script
# BEAD: M31-DOCKER-001 — Phase 1
# ==============================================================================

set -u

echo "=============================================================================="
echo "          SAMSUNG M31 (SM-M315F) ENVIRONMENT INSPECTION REPORT               "
echo "=============================================================================="
echo "Timestamp: $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
echo ""

echo "=== 1. USER & PERMISSIONS ==="
id

echo ""
echo "=== 2. ARCHITECTURE ==="
uname -m

echo ""
echo "=== 3. CPU ABI ==="
if command -v getprop &>/dev/null; then
    getprop ro.product.cpu.abi
else
    echo "getprop not available (running in non-Android environment)"
fi

echo ""
echo "=== 4. KERNEL VERSION ==="
uname -r

echo ""
echo "=== 5. TUN/TAP DEVICE CHECK ==="
ls -l /dev/net/tun 2>&1 || echo "/dev/net/tun missing or restricted"

echo ""
echo "=== 6. CGROUPS SUBSYSTEM CHECK ==="
ls -ld /sys/fs/cgroup 2>&1 || echo "/sys/fs/cgroup missing or restricted"
mount | grep cgroup 2>&1 || echo "No cgroup mounts found in user space"

echo ""
echo "=== 7. NAMESPACES CHECK ==="
ls -l /proc/self/ns 2>&1 || echo "/proc/self/ns missing or restricted"

echo ""
echo "=== 8. TERMUX CONTAINER PACKAGE AVAILABILITY ==="
if command -v pkg &>/dev/null; then
    echo "Searching Termux repositories for container runtimes..."
    echo "--- package: docker ---"
    pkg search docker 2>&1 || true
    echo "--- package: udocker ---"
    pkg search udocker 2>&1 || true
    echo "--- package: podman ---"
    pkg search podman 2>&1 || true
    echo "--- package: runc / crun ---"
    pkg search runc 2>&1 || true
    pkg search crun 2>&1 || true
    echo "--- package: proot / proot-distro ---"
    pkg search proot 2>&1 || true
else
    echo "pkg command not available (not running inside Termux)"
fi

echo ""
echo "=============================================================================="
echo "                     END OF M31 INSPECTION REPORT                             "
echo "=============================================================================="
