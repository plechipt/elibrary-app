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
        print(book.image_name)
        date = datetime.now().strftime('%d.%m %Y')

        try:
            borrowing, created = Borrowing.objects.get_or_create(
                user=user, book=book, date_borrowed=date
            )
        except:
            borrowing = Borrowing.objects.get(book=book)
            book = Book.objects.get(id=id) 

        borrowing.returned = False
        borrowing.save()

        book.borrowed = True
        book.save()

        return BorrowBook(borrowing)


class ReturnBook(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    message = graphene.String()

    def mutate(self, info, id):
        user = info.context.user
        book = Book.objects.get(id=id)
        date = datetime.now().strftime('%d.%m %Y')

        borrowing = Borrowing.objects.get(user=user, book=book)
        borrowing.date_returned = date
        borrowing.returned = True
        borrowing.save()

        book.borrowed = False
        book.save()

        return ReturnBook(message='Success')
