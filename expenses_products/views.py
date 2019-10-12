from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from expenses_products.models import Product, Expenses


# Create your views here.


def create_db(request):
    product1 = Product.objects.create(name="Szampon", price=10.5)
    product2 = Product.objects.create(name="Tampon", price=5.5)
    product3 = Product.objects.create(name="Szminka", price=28)
    product4 = Product.objects.create(name="Perfumy", price=150)
    expense1 = Expenses.objects.create()
    expense2 = Expenses.objects.create()

    products1 = [product1, product2, product4]
    products2 = [product1, product3, product4]

    expense1.products.set(products1)
    expense1.save()
    expense2.products.set(products2)
    expense2.save()


def show_db(request):
    expenses = Expenses.objects.all()
    products = Product.objects.all()

    for expense in expenses:
        print(expense.products.all())

    context = {
        'expenses': expenses,
        'products': products,

    }
    return render(request, 'demo.html', context)
