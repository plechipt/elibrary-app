import graphene
from datetime import datetime
from graphene_django import DjangoObjectType

from users.models import User
from books.models import Book
from borrowings.models import Borrowing

class BorrowingType(DjangoObjectType):
    class Meta:
        model = Borrowing


class BorrowBook(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    borrowing = graphene.Field(BorrowingType)

    def mutate(self, info, id):
        user = info.context.user
        book = Book.objects.get(id=id)
        date = datetime.now().strftime('%d.%m %Y')

        borrowing = Borrowing.objects.create(user=user, book=book, date_borrowed=date)

        return BorrowBook(borrowing)


class ReturnBook(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    message = graphene.String()

    def mutate(self, info, id):
        user = info.context.user
        book = Book.objects.get(id=id)

        borrowing = Borrowing.objects.get(user=user, book=book)
        borrowing.delete() 

        return ReturnBook(message='Success')
