import os
import sys
import django_heroku
import dj_database_url
from pathlib import Path
from dotenv import load_dotenv

from .basic import *
from .development import *
from .graphene import *
from .rest_framework import *
from .production import *

BASE_DIR = Path(__file__).resolve().parent.parent.parent


'''
Frontend integration
'''

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Connect Postgres
db_from_env = dj_database_url.config(conn_max_age=600, ssl_require=True)
DATABASES['default'].update(db_from_env) 

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR / 'build'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# S3 bucket config
if USE_S3 == 'TRUE':
    MEDIA_URL = '/media/'
    STATIC_URL = BUCKET_URL + '/static/'
    MEDIA_ROOT = BUCKET_URL + '/static/images/'

    AWS_ACCESS_KEY_ID = os.getenv('ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.getenv('STORAGE_BUCKET_NAME')
    AWS_S3_CUSTOM_DOMAIN = os.getenv('CUSTOM_DOMAIN')

    AWS_LOCATION = 'static'
    #AWS_S3_FILE_OVERWRITE = False
    AWS_DEFAULT_ACL = None

    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'

else:
    MEDIA_URL = '/media/'
    STATIC_URL = '/static/'
    MEDIA_ROOT = os.path.join(BASE_DIR / 'public' / 'static' / 'images')


STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR / 'build' / 'static'),
]

django_heroku.settings(locals(), staticfiles=False)