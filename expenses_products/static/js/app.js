var productsList = $('#list-of-products');
var ctnProductsList = $('#content-list-product')
var expensesList = $('#list-of-expenses');
var ctnExpensesList = $('#content-list-expenses');
var addProductForm = $('#add-product-form');

function insertContentProducts(products) {
    ctnProductsList.empty()
    for(var i = 0 ; i < products.length; i++) {
        var li = $('<li data-id=' + products[i].id + '>').text('Nazwa: ' + products[i].name + ", Cena: " + products[i].price);
        var delete_btn = $('<a>').text('[ Usuń ]').addClass('delete_product')
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
function saveProduct() {
    console.log("create post is working!") // sanity check
    console.log($('#product-name').val())

    var csrftoken = $("[name=csrfmiddlewaretoken]").val();

        $.ajax({
            url: "products/",
            headers:{
            "X-CSRFToken": csrftoken
            },
            data: JSON.stringify({
                "name": $('#product-name').val(),
                "price": $('#product-price').val(),
            }),
            type: "POST",
            dataType: "json"
        }).done(function(response) {
        // po wykonaniu należy odświeżyć listę produktów, inaczej trzeba przeładować całą stronę
            loadProducts()
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
}

function deleteProduct (productId) {
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        var url = "products/" + productId
        $.ajax({
            url: url,
            headers:{
            "X-CSRFToken": csrftoken
            },
            data: {},
            type: "DELETE",
            dataType: "json"
        }).done(function(response) {
            loadProducts()
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
}


/* Po załadowaniu dokumentu wywołuje się funkcja zawierająca reakcje i funkcje*/

$(function() {
     console.log("dupa")
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

        // Pokazywanie wszystkich produktów /na klik chowanie ich
            $('#add-product').click(function() {
        if (addProductForm.hasClass("hidden")) {
           addProductForm.removeClass("hidden");
        }
        else {
            addProductForm.addClass("hidden");
        }

      })
        // Dodawanie nowego produktu
          $('#post-product-form').on('submit', function(event){
        event.preventDefault();
//        console.log("form submitted!")  // sanity check
        saveProduct();
    });
//        // Usuwanie pojedyńczego produktu
//    console.log($('.delete_product'))
        $('body').on("click", $('.delete_product'), function(event){
//            console.log(event)
            // łapię kliknięty element
            var x = $(event.target);
            // łapię rodzica klikniętego elementu i jego id
            var productId = x.parent().attr('data-id');
//            console.log(productId) // sanity check
            if (productId !== undefined){
                deleteProduct(productId)
            }
        })

});