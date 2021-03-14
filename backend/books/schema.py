import graphene
from .mutations.books import *


class BookMutation(graphene.ObjectType):
    pass


class BookQuery(graphene.ObjectType):
   books = graphene.List(BookType)

   def resolve_books(root, info):
       return Book.objects.all()

