import graphene
from .mutations.borrowings import *


class BorrowingMutation(graphene.ObjectType):
    pass


class BorrowingQuery(graphene.ObjectType):
    borrowings = graphene.List(BorrowingType)
    users_borrowings = graphene.List(BorrowingType)

    def resolve_borrowings(self, info):
        return Borrowing.objects.all()

    def resolve_users_borrowings(self, info):
        admin = User.objects.get(username='admin')
        user = admin
        return Borrowing.objects.filter(user=user)

