from django import forms
from graphene_django import DjangoObjectType

from borrowings.models import Borrowing
from users.models import User

class BorrowingType(DjangoObjectType):
    class Meta:
        model = Borrowing