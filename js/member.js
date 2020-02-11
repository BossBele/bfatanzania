function addMember(data) {

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
                alert('Membership added');
                $('#member_form').trigger("reset");
            } else {
                alert('Membership exists');
                $('#member_form').trigger("reset");
            }

        }
    });

}

function retrieveMember() {
    var data = {retrieve_member: "yes"};
    $.ajax({
        url: site_url,
        type: "get",
        dataType: "json",
        data: data,
        success: function (result) {
            if (result[0].AUTH === "failed") {
                location.href = "../";
            } else {
                $('#member_table tbody').empty();
                $.each(result, function (index, obj) {
                    var row = $('<tr>');
                    row.append('<td>' + obj.name + '</td>');
                    row.append('<td>' + obj.phone + '</td>');
                    row.append('<td>' + obj.email + '</td>');
                    row.append('<td>' + obj.why + '</td>');
                    $('#member_table').append(row);
                });
            }

        }
    });
}