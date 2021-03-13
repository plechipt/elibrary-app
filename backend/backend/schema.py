import graphene
from users.schema import UserMutation, UserQuery

class Query(UserQuery, graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")


class Mutation(UserMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)