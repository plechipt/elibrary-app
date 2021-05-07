import graphene
from graphene_django_extras import DjangoListObjectType, DjangoObjectType
from graphene_django_extras.paginations import LimitOffsetGraphqlPagination

from books.models import Book


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        description = " Type definition for book list "
        pagination = LimitOffsetGraphqlPagination(default_limit=12)


class DeleteBook(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    message = graphene.String()

    def mutate(self, info, id):
        try:
            book = Book.objects.get(id=id)
            book.delete()
            message = 'Success!'
        except: 
            message = 'Book not found!'

        return DeleteBook(message)