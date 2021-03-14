import graphene
from users.schema import UserMutation, UserQuery
from books.schema import BookMutation, BookQuery


class Query(BookQuery, UserQuery, graphene.ObjectType):
    pass


class Mutation(BookMutation, UserMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)