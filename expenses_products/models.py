from django.db import models


# Create your models here.

class Product(models.Model):
    name = models.TextField(max_length=64)
    price = models.FloatField()


class Expenses(models.Model):
    products = models.ManyToManyField(Product, through="ExpenseProduct")
    date_added = models.DateTimeField(auto_now_add=True)


class ExpenseProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    expense = models.ForeignKey(Expenses, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

