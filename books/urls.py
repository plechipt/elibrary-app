from .views import BookViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns = router.urls