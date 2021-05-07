import graphene
from graphene_django_extras import all_directives

from users.schema import UserMutation, UserQuery
from books.schema import BookMutation, BookQuery
from borrowings.schema import BorrowingMutation, BorrowingQuery


class Query(BorrowingQuery, BookQuery, UserQuery, graphene.ObjectType):
    pass


class Mutation(BorrowingMutation, BookMutation, UserMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
    directives=all_directives
)