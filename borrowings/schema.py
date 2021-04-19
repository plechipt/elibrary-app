import graphene
from .mutations.borrowings import *


class BorrowingMutation(graphene.ObjectType):
    borrow_book = BorrowBook.Field()
    return_book = ReturnBook.Field()


class BorrowingQuery(graphene.ObjectType):
    borrowings = graphene.List(BorrowingType)
    users_borrowings = graphene.List(BorrowingType)

    def resolve_borrowings(self, info):
        return Borrowing.objects.all()

    def resolve_users_borrowings(self, info):
        user = info.context.user
        return Borrowing.objects.filter(user=user)

