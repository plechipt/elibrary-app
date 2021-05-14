import graphene
from .mutations.borrowings import *
from backend.functions import pagination

PAGE_SIZE = 12
PAGE_SIZE2 = 10 

class BorrowingMutation(graphene.ObjectType):
    borrow_book = BorrowBook.Field()
    return_book = ReturnBook.Field()


class BorrowingQuery(graphene.ObjectType):
    borrowings = graphene.List(BorrowingType, page=graphene.Int())
    users_borrowings = graphene.List(BorrowingType, page=graphene.Int())

    def resolve_borrowings(self, info, page):
        page = 1
        borrowings = Borrowing.objects.all()
        borrowings = pagination(PAGE_SIZE2, page, borrowings)

        return borrowings

    def resolve_users_borrowings(self, info, page):
        page = 1
        user = info.context.user
        borrowings = Borrowing.objects.filter(user=user, returned=False)
        borrowings = pagination(PAGE_SIZE, page, borrowings)

        return borrowings

