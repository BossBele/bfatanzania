function addSponsor(data) {

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
                alert('Sponsor added');
                $('#sponsor_form').trigger("reset");
            } else {
                alert('Sponsor exists');
                $('#sponsor_form').trigger("reset");
            }

        }
    });

}

function retrieveSponsor() {
    var data = {retrieve_sponsor: "yes"};
    $.ajax({
        url: site_url,
        type: "get",
        dataType: "json",
        data: data,
        success: function (result) {

            $('#sponsor_table tbody').empty();
            $.each(result, function (index, obj) {
                var row = $('<tr>');
                row.append('<td>' + obj.organisation + '</td>');
                row.append('<td>' + obj.phone + '</td>');
                row.append('<td>' + obj.email + '</td>');
                row.append('<td>' + obj.location + '</td>');
                row.append('<td>' + obj.programme + '</td>');
                $('#sponsor_table').append(row);
            });

        }
    });
}