import graphene

from backend.functions import pagination
from users.models import User
from .mutations.users import *
from .mutations.jwt import *

PAGE_SIZE = 10

class UserMutation(AuthMutation, graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    logout = Logout.Field()
    verify_access_token = VerifyAccessToken.Field() 
    make_superuser = MakeSuperuser.Field()
    
    
class UserQuery(graphene.ObjectType):
    me = graphene.Field(UserType)
    all_users = graphene.List(UserType, page=graphene.Int())
    all_users_count = graphene.Int()

    def resolve_me(self, info):
        user = info.context.user

        if user.is_authenticated:
            return user
        else:
            return None
    
    def resolve_all_users(self, info, page):
        users = User.objects.filter(is_superuser=False) 
        users = pagination(PAGE_SIZE, page, users)

        return users

    def resolve_all_users_count(self, info):
        return User.objects.filter(is_superuser=False).count()

