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
        user = info.context.user

        book_titles = []
        users_books = Borrowing.objects.filter(user=user)

        for book in users_books:
            title = book.book.title
            book_titles.append(title)

        return Book.objects.exclude(title__in=book_titles)