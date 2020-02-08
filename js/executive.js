function addExecutive(data) {

    $.ajax({
        url: site_url,
        type: "post",
        dataType: "json",
        contentType: false,
        cache: false,
        processData:false,
        data: new FormData(data),
        success: function (result) {
            if (result[0].message === "success") {
                alert('Executive added');
                $('#executive_form').trigger("reset");
            } else {
                alert('Executive exists');
                $('#executive_form').trigger("reset");
            }

        }
    });

}