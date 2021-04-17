import os
import sys
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

STATIC_ROOT = os.path.join(BASE_DIR / 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR / 'build' / 'static'),
]