var productsList = $('#list-of-products');
var ctnProductsList = $('#content-list-product')
var dropdownProducts = $('#dropdown-products')
var expensesList = $('#list-of-expenses');
var ctnExpensesList = $('#content-list-expenses');
var addProductForm = $('#add-product-form');
var addExpenseForm = $('#add-expense-form');

function insertContentProducts(products) {
    ctnProductsList.empty()
    for(var i = 0 ; i < products.length; i++) {
        var li = $('<li data-id=' + products[i].id + '>').text('Nazwa: ' + products[i].name + ", Cena: " + products[i].price);
        var delete_product = $('<a>').text('[ Usuń ]').addClass('delete_product')
        var edit_product = $('<a>').text('[ Edytuj ]').addClass('edit_product')
        li.append(' ', edit_product,' ', delete_product )
        ctnProductsList.append(li);
    };
}

// lista produktów do dropdownu
function insertProductsDropdown(products) {
       ctnProductsList.empty()
       for(var i = 0 ; i < products.length; i++) {
       var option = $('<option data-id=' + products[i].id + ' '
                + 'value=' + products[i].id +  '>').text(products[i].name + ", Cena: " + products[i].price);
       console.l
       dropdownProducts.append(option);
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

function loadDropdown() {
        var url = "products/"
        $.ajax({
            url: url,
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function(response) {
        insertProductsDropdown(response);
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
}


function insertContentExpenses(expenses) {
    ctnExpensesList.empty()
    for(var i = 0 ; i < expenses.length; i++) {
        var li = $('<li data-id=' + expenses[i].id + '>').text(expenses[i].date_added);
        for(var j = 0 ; j < expenses[i].products.length; j++){
            var productsOfExpense = expenses[i].products[j];
//            console.log(typeof productsOfExpense)
            var h4 = $('<h4>').text('Ilość: ' + productsOfExpense['quantity']
                        + ', ' + productsOfExpense['name']);
            li.append(h4);
        }
        var delete_expense = $('<a>').text('[ Usuń ]').addClass('delete_expense')
        var edit_expense = $('<a>').text('[ Edytuj ]').addClass('edit_expense')

        li.append(delete_expense, ' ', edit_expense, '<br>', '<br>')
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

function saveProduct() {
//    console.log("create post is working!") // sanity check
//    console.log($('#product-name').val())

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
            loadDropdown()
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
}

function safeExpense() {
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        $.ajax({
            url: "expenses/",
            headers:{
            "X-CSRFToken": csrftoken
            },
            data: JSON.stringify({
                "product_id": $('#dropdown-products option:selected').attr('data-id'),
                "quantity": $('#quantity-of-product').val()
            }),
            type: "POST",
            dataType: "json"
        }).done(function(response) {
        // po wykonaniu należy odświeżyć listę expense, inaczej trzeba przeładować całą stronę
            loadExpenses()
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
            loadDropdown()
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
}

function deleteExpense (expenseId) {
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        var url = "expenses/" + expenseId
        $.ajax({
            url: url,
            headers:{
            "X-CSRFToken": csrftoken
            },
            data: {},
            type: "DELETE",
            dataType: "json"
        }).done(function(response) {
            loadExpenses()
        }).fail(function(xhr,status,err) {
        }).always(function(xhr,status) {
        });
}

/* Po załadowaniu dokumentu wywołuje się funkcja zawierająca reakcje i funkcje*/

$(function() {
//     console.log("dupa")
     loadProducts();
     loadDropdown();

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

      $('#add-expense').click(function() {
        if (addExpenseForm.hasClass("hidden")) {
           addExpenseForm.removeClass("hidden");
        }
        else {
            addExpenseForm.addClass("hidden");
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
        $('body').on("click", '.delete_product', function(event){
//            console.log(event)
            // łapię kliknięty element
            var x = $(event.target);
            // łapię rodzica klikniętego elementu i jego id
            var productId = x.parent().attr('data-id');

            if (productId !== undefined && confirm("Serio? Do kosza? Zastanów się dobrze!")){
                deleteProduct(productId)
            }
//            console.log(productId) // sanity check
        })

        $('#add-product-btn').click(function() {
            event.preventDefault();
            safeExpense();
        })

        //        // Usuwanie pojedyńczego wydatku
        $('body').on("click", '.delete_expense', function(event){
            // łapię kliknięty element
            var x = $(event.target);
            // łapię rodzica klikniętego elementu i jego id
            var expenseId = x.parent().attr('data-id');

            if (expenseId !== undefined && confirm("Serio? Usuwanie wydatków nie zwróci Ci hajsików!")){
                deleteExpense(expenseId)
            }
//            console.log(productId) // sanity check
        })

});