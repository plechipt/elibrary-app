import graphene
from users.models import User
from .mutations.users import *
from .mutations.jwt import *


class UserMutation(AuthMutation, graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    logout = Logout.Field()
    verify_access_token = VerifyAccessToken.Field() 
    
    
class UserQuery(graphene.ObjectType):
    me = graphene.Field(UserType)
    all_users = graphene.List(UserType)

    def resolve_me(self, info):
        user = info.context.user

        if user.is_authenticated:
            return user
        else:
            return None
    
    def resolve_all_users(self, info):
        return User.objects.filter(is_superuser=False)

