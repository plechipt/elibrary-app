import graphene
from graphene_django_extras import DjangoFilterListField

from .mutations.books import *
from users.models import User
from borrowings.models import Borrowing

PAGE_SIZE = 12

class BookMutation(graphene.ObjectType):
    delete_book = DeleteBook.Field()


class BookQuery(graphene.ObjectType):
    books = graphene.List(BookType)
    not_borrowed_books = graphene.List(BookType, page=graphene.Int())

    def resolve_books(self, info):
        return Book.objects.all()

    def resolve_not_borrowed_books(self, info, page):
        books = Book.objects.filter(borrowed=False) 

        # Skip books by amount of pages
        if page != 1:
            amount_of_skipped_pages = PAGE_SIZE * page
            books = book[amount_of_skipped_pages:]
        
        # Get first books of page size
        else:
            books = books[:PAGE_SIZE]


        return books 