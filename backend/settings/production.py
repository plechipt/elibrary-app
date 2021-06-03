import os
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load dotenv
load_dotenv()

DEBUG = os.getenv('DEBUG_VALUE')
SECRET_KEY = os.getenv("SECRET_KEY")
USE_S3 = os.getenv('USE_S3')
BUCKET_URL = os.getenv('REACT_APP_BUCKET_URL')

# Server is running in production
if DEBUG == 'FALSE':
    # HTTPS settings
    CSRF_COOKIE_HTTPONLY = False
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True

    # HSTS settings
    SECURE_HSTS_SECONDS = 31536000 # 1 year
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True

AWS_ACCESS_KEY_ID = os.getenv('ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = os.getenv('CUSTOM_DOMAIN')

AWS_LOCATION = 'static'
#AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = None
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# S3 bucket config
if USE_S3 == 'TRUE':
    STATIC_URL = BUCKET_URL + '/static/'
    MEDIA_URL = BUCKET_URL + '/static/images/'

    #DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'

else:
    MEDIA_URL = '/media/'
    STATIC_URL = '/static/'
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'