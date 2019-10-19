var productsList = $('#list-of-products');
var expensesList = $('#list-of-expenses');

function insertContentProducts(products) {
    for(var i = 0 ; i < products.length; i++) {
        var li = $('<li>').text(products[i].name + ", " + products[i].price);
        productsList.append(li);
    };
}

function loadProducts() {
        $.ajax({
            url: "products/",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function(response) {
        insertContentProducts(response);
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
    }


function insertContentExpenses(expenses) {
    for(var i = 0 ; i < expenses.length; i++) {
        var li = $('<li>').text(expenses[i].date_added);
        for(var j = 0 ; j < expenses[i].products.length; j++){
            var productsOfExpense = expenses[i].products[j];
//            console.log(typeof productsOfExpense)
            var h4 = $('<h4>').text(productsOfExpense['quantity']
                        + ', ' + productsOfExpense['name']);
            li.append(h4);
        }
        expensesList.append(li);
    };
}

function loadExpenses() {
        $.ajax({
            url: "expenses/",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function(response) {
        insertContentExpenses(response);
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
    }
/* Po załadowaniu dokumentu wywołuje się funkcja zawierająca reakcje i funkcje*/

$(function() {
    $('#show-all-products').click(function() {
      loadProducts();
      })
      $('#show-all-expenses').click(function() {
      loadExpenses();
      })
});