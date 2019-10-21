function safeExpense() {
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        $.ajax({
            url: "expenses/",
            headers:{
            "X-CSRFToken": csrftoken
            },
            data: JSON.stringify({
                "name": $('#dropdown-products option:selected').attr('data-name');,
                "price": $('#product-price').val(),
                "quantity": $().val()
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