ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost:3000',
    'awesome-elibrary-app.herokuapp.com',
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'https://awesome-elibrary-app.herokuapp.com',
]

# Files
ROOT_URLCONF = 'backend.urls'
WSGI_APPLICATION = 'backend.wsgi.application'

# Whitenoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True