import graphene
from .mutations.books import *

from users.models import User
from borrowings.models import Borrowing


class BookMutation(graphene.ObjectType):
    delete_book = DeleteBook.Field()


class BookQuery(graphene.ObjectType):
    books = graphene.List(BookType)
    not_borrowed_books = graphene.List(BookType)

    def resolve_books(self, info):
        return Book.objects.all()

    def resolve_not_borrowed_books(self, info):
        return Book.objects.filter(borrowed=False)