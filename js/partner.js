function addPartner(data) {

    $.ajax({
        url: site_url,
        type: "post",
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        data: new FormData(data),
        success: function (result) {
            if (result[0].message === "success") {
                alert('Partner added');
                $('#partner_form').trigger("reset");
            } else {
                alert('Partner exists');
                $('#partner_form').trigger("reset");
            }

        }
    });

}

function retrievePartner() {
    var data = {retrieve_partner: "yes"};
    $.ajax({
        url: site_url,
        type: "get",
        dataType: "json",
        data: data,
        success: function (result) {

            $('#partner_table tbody').empty();
            $.each(result, function (index, obj) {
                var row = $('<tr>');
                row.append('<td>' + obj.organisation + '</td>');
                row.append('<td>' + obj.phone + '</td>');
                row.append('<td>' + obj.email + '</td>');
                row.append('<td>' + obj.location + '</td>');
                row.append('<td>' + obj.programme + '</td>');
                $('#partner_table').append(row);
            });

        }
    });
}