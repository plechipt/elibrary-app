# Generated by Django 3.1.7 on 2021-05-11 14:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0007_book_borrowed'),
        ('borrowings', '0007_remove_borrowing_book'),
    ]

    operations = [
        migrations.AddField(
            model_name='borrowing',
            name='book',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='books.book'),
            preserve_default=False,
        ),
    ]