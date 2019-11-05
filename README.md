# Budget Manager

This is a web application using Django, which thanks to AJAX communicates with browser.
App allows user to manipulate with budget data such as: product and it's price and expenses.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install all required modules running pip with the provided file:

```
pip install -r requirements.txt
```

### Installing

As a first step upgrade SQLite database, by:

```
$ python manage.py migrate
```

In order to run the application the command should be typed:

```
$ python manage.py runserver
```

All interaction happens in the browser. User can create and modify products and prices, add and delete expenses.
Data will be saved in the database.