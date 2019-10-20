var productsList = $('#list-of-products');
var ctnProductsList = $('#content-list-product')
var expensesList = $('#list-of-expenses');
var ctnExpensesList = $('#content-list-expenses');
var addProductForm = $('#add-product-form');

function insertContentProducts(products) {
    ctnProductsList.empty()
    for(var i = 0 ; i < products.length; i++) {
        var li = $('<li>').text('Nazwa: ' + products[i].name + ", Cena: " + products[i].price);
        var delete_btn = $('<a>').text('[ Usuń ]').addClass('delete_btn')
        li.append(' ', delete_btn)
        ctnProductsList.append(li);
    };
}

function loadProducts(name) {
        var url = "products/"
        if (name !== undefined){
           url = "products?name=" + name
        }
        $.ajax({
            url: url,
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
            var h4 = $('<h4>').text('Ilość: ' + productsOfExpense['quantity']
                        + ', ' + productsOfExpense['name']);
            li.append(h4);
        }
        ctnExpensesList.append(li);
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

//function addNewProduct(){
//
//}
//
//function saveProduct() {
//        $.ajax({
//            url: "products/",
//            data: {},
//            type: "POST",
//            dataType: "json"
//        }).done(function(response) {
//        addNewProduct(response);
//        }).fail(function(xhr,status,err) {
//        }).always(function(xhr,status) {
//        });
//}


/* Po załadowaniu dokumentu wywołuje się funkcja zawierająca reakcje i funkcje*/

$(function() {

     loadProducts();
    $('#show-all-products').click(function() {
//        var $this = $(this);
        if (productsList.hasClass("hidden")) {
           productsList.removeClass("hidden");
        }
        else {
            productsList.addClass("hidden");
        }
      })
    $('#btn-show-products').click(function() {
        var name = $('#input-show-products').val()
        console.log(name)
        loadProducts(name);
    })

     loadExpenses();

      $('#show-all-expenses').click(function() {
        if (expensesList.hasClass("hidden")) {
           expensesList.removeClass("hidden");
        }
        else {
            expensesList.addClass("hidden");
        }

      })

            $('#add-product').click(function() {
        if (addProductForm.hasClass("hidden")) {
           addProductForm.removeClass("hidden");
        }
        else {
            addProductForm.addClass("hidden");
        }

      })
});