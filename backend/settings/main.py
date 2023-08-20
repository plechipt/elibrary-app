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

DEBUG = os.getenv('DEBUG_VALUE')
SECRET_KEY = os.getenv('SECRET_KEY')
BASE_DIR = Path(__file__).resolve().parent.parent

# Database
DATABASES = {}

if DEBUG == 'TRUE':
    DEBUG = True
else:
    DEBUG = False

if DEBUG == True:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# PostgreSQL in production 
else:
    DB_URL = os.getenv('DATABASE_URL')
    DATABASES["default"] = dj_database_url.config(
        default=DB_URL,
        conn_max_age=600, 
        ssl_require=True
    )

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
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