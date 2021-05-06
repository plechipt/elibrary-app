from rest_framework import serializers
import rest_framework_filters as filters

from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class BookFilter(filters.FilterSet):
    class Meta:
        model = Book
        fields = {'title': ['istartswith'], 'title_cz': ['istartswith']}