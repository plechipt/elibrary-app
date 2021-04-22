from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from books.models import Book


class Borrowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.OneToOneField(Book, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    date_borrowed = models.CharField(blank=True, null=True, max_length=50)
    date_returned = models.CharField(blank=True, null=True, max_length=50)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f'{self.user.username} borrowed {self.book.title}'