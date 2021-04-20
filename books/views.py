from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [
        permissions.IsAdminUser
    ]

    def perform_create(self, serializer, **kwargs):
        serializer.save(owner=self.request.user)