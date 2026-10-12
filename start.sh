#!/bin/sh
set -eu
exec php -S 0.0.0.0:"${PORT:-8080}" -t /app /app/router.php
