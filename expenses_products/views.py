from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views import View
from django.views.decorators.csrf import csrf_exempt
import json
from expenses_products.models import Product, Expenses, ExpenseProduct


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
    expenses = list(Expenses.objects.all().values())
    for expense in expenses:
        products = ExpenseProduct.objects.filter(expense=expense['id'])
        expense['products'] = []
        list_of_products = list(products.values())
        for product in list_of_products:
            del product['expense_id']
            product_name = Product.objects.get(id=product['product_id'])
            product.update({'name': product_name.name})
            expense['products'].append(product)

    return JsonResponse(expenses, safe=False)


class ShowProducts(View):
    def get(self, request):
        products = list(Product.objects.all().values())
        return JsonResponse(products, safe=False)

    def post(self, request):
        pass


class ProductId(View):
    def get(self, request, product_id):
        product = Product.objects.get(id=product_id)
        product_data = {
            'name': product.name,
            'price': product.price
        }
        return JsonResponse(product_data, safe=False)

    def put(self):
        pass

    def delete(self):
        pass


class ShowExpenses(View):
    def get(self, request):
        expenses = list(Expenses.objects.all().values())
        for expense in expenses:
            products = ExpenseProduct.objects.filter(expense=expense['id'])
            expense['products'] = []
            list_of_products = list(products.values())
            for product in list_of_products:
                del product['expense_id']
                product_name = Product.objects.get(id=product['product_id'])
                product.update({'name': product_name.name})
                expense['products'].append(product)

        return JsonResponse(expenses, safe=False)

    def post(self):
        pass


class ExpenseId(View):
    def get(self, request, expense_id):
        expense = Expenses.objects.get(id=expense_id)
        products = ExpenseProduct.objects.filter(expense=expense_id)
        # print(products)
        list_of_products = []
        for product in products:
            list_of_products.append(product.product.name)

        expense_data = {
            'id': expense.id,
            'date_added': expense.date_added,
            'products': list_of_products
        }

        return JsonResponse(expense_data, safe=False)

        # def put(self):
        #     pass
        #
        # def delete(self):
        #     pass
