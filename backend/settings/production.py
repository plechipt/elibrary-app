import os
from dotenv import load_dotenv

# Load dotenv
load_dotenv()

DEBUG = False
SECRET_KEY = os.getenv("SECRET_KEY")

# Server is running in production
if DEBUG == False:
    # HTTPS settings
    CSRF_COOKIE_HTTPONLY = False
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True

    # HSTS settings
    SECURE_HSTS_SECONDS = 31536000 # 1 year
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True