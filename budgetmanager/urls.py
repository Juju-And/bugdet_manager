"""budgetmanager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import re_path, path
from django.conf.urls import url
from django.contrib import admin
from expenses_products.views import create_db, show_db, ShowProducts, ProductId, ShowExpenses, ExpenseId, MainPage


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('create/', create_db),
    re_path('', MainPage.as_view()),
    re_path('show/', show_db),
    re_path(r'^products/(?P<product_id>(\d)+)$', ProductId.as_view()),
    re_path('products/', ShowProducts.as_view()),
    re_path(r'^expenses/(?P<expense_id>(\d)+)$', ExpenseId.as_view()),
    re_path('expenses/', ShowExpenses.as_view()),

]

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()
