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
   

    def perform_create(self, serializer, **kwargs):
        serializer.save(owner=self.request.user)
    
    @action(detail=True, methods=['post'])
    def upload_file(self, request, pk):
        try:
            file = request.data['file']
        except KeyError:
            return Response('Request has no resource file attached')

        print(pk)
        book = Product.objects.get(id=id)

        return Response(book)