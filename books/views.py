from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['post'])
    def upload_file(self, request):
        try:
            file = request.data['image_file']
        except KeyError:
            return Response('Request has no resource file attached')

        print(file)
        book = Book.objects.last()
        print(book)
        book.image = file
        book.save()
        serializer = BookSerializer(book)

        return Response(serializer.data)