import graphene
from users.schema import UserMutation, UserQuery
from books.schema import BookMutation, BookQuery
from borrowings.schema import BorrowingMutation, BorrowingQuery


class Query(BorrowingQuery, BookQuery, UserQuery, graphene.ObjectType):
    pass


class Mutation(BorrowingMutation, BookMutation, UserMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)