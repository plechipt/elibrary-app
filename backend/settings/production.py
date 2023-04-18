import os
from dotenv import load_dotenv
from pathlib import Path

DEBUG_VALUE = os.getenv('DEBUG_VALUE')

# Server is running in production
if DEBUG_VALUE == 'FALSE':
    # HTTPS settings
    CSRF_COOKIE_HTTPONLY = False
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True

    # HSTS settings
    SECURE_HSTS_SECONDS = 31536000 # 1 year
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True


MEDIA_URL = '/media/'
MEDIA_ROOT = 'public/static/images/'
STATIC_URL = '/static/'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'