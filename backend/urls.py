import os
from django.contrib import admin
from django.urls import path, re_path, include
from graphene_django.views import GraphQLView
from django.views.generic import TemplateView
from graphql_jwt.decorators import jwt_cookie
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv

from django.conf import settings
from django.conf.urls.static import static

# Load dotenv
load_dotenv()

ADMIN_PATH = os.getenv("ADMIN_PATH")
GRAPHIQL_IS_ON = os.getenv('GRAPHIQL')

if GRAPHIQL_IS_ON == 'TRUE':
    GRAPHIQL_TURN_ON = True
else:
    GRAPHIQL_TURN_ON = False

urlpatterns = [
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('books/', include('books.urls')),
    path("graphql/", jwt_cookie(GraphQLView.as_view(graphiql=GRAPHIQL_TURN_ON))),
    path('robots.txt', TemplateView.as_view(template_name='static/text/robots.txt')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)