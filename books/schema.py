import graphene

from .mutations.books import *
from users.models import User
from borrowings.models import Borrowing
from backend.functions import pagination

PAGE_SIZE = 12

class BookMutation(graphene.ObjectType):
    delete_book = DeleteBook.Field()


class BookQuery(graphene.ObjectType):
    books = graphene.List(BookType)
    not_borrowed_books = graphene.List(BookType, page=graphene.Int())
    not_borrowed_books_count = graphene.Int()

    def resolve_books(self, info):
        return Book.objects.all()

    def resolve_not_borrowed_books(self, info, page):
        page = 1
        books = Book.objects.filter(borrowed=False) 
        books = pagination(PAGE_SIZE, page, books)
        
        return books 
    
    def resolve_not_borrowed_books_count(self, info):
        return Book.objects.filter(borrowed=False).count()
      