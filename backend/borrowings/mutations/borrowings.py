from django import forms
from graphene_django import DjangoObjectType

from borrowings.models import Borrowing

class BorrowingType(DjangoObjectType):
    class Meta:
        model = Borrowing