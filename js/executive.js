var all_executives;

function addExecutive(data) {

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
                alert('Executive added');
                $('#executive_form').trigger("reset");
            } else {
                alert('Executive exists');
                $('#executive_form').trigger("reset");
            }

        }
    });

}

function retrieveExecutive() {
    var data = {retrieve: "yes"};
    $.ajax({
        url: site_url,
        type: "get",
        dataType: "json",
        data: data,
        success: function (result) {
            try {
                document.getElementById('edit_form').style.display = 'block';
                document.getElementById('update_form').style.display = 'none';
            } catch (e) {
                console.log(e);
            }
            $('#all_executive tbody').empty();
            all_executives = result;
            $.each(result, function (index, obj) {
                var row = $('<tr>');
                row.append('<td>' + obj.name + '</td>');
                row.append('<td>' + obj.title + '</td>');
                row.append('<td>' + obj.phone + '</td>');
                row.append('<td>' + obj.email + '</td>');
                row.append('<td><button class="uk-button uk-button-default uk-button-small" onclick="updateExecutive(' + index + ')" type="button">Edit <span uk-icon="icon: file-edit; ratio: 0.8"></span></button></td>')
                $('#all_executive').append(row);
            });
        }
    });
}

function updateExecutive(index) {
    if (all_executives !== []) {

        document.getElementById('edit_form').style.display = 'none';
        document.getElementById('update_form').style.display = 'block';
        var data = all_executives[index];
        document.getElementById('first_name').value = data.first_name;
        document.getElementById('middle_name').value = data.middle_name;
        document.getElementById('last_name').value = data.last_name;
        document.getElementById('title').value = data.title;
        document.getElementById('phone').value = data.phone;
        document.getElementById('email').value = data.email;
        document.getElementById('bio').value = data.bio;


        // $('#add_social').click();
        var platform = document.getElementsByName("platform");

        console.log(platform);

        // Number of inputs to create
        // var number = document.getElementById("member").value;
        // Container <div> where dynamic content will be placed
        var platform_container = document.getElementById("platform_div");
        var social_container = document.getElementById("social_div");
        // Clear previous contents of the container
        while (platform_container.hasChildNodes()) {
            platform_container.removeChild(platform_container.lastChild);
        }

        while (social_container.hasChildNodes()) {
            social_container.removeChild(social_container.lastChild);
        }

        for (i = 1; i < data.social.length; i++) {
            data.social.forEach(function (entry) {
                // Append a node with a random text
                /*label*/
                var label = document.createElement("label");
                label.setAttribute("class","uk-form-label");
                label.setAttribute('for','college');
                label.append('Platform');
                /*label end*/

                /*input*/
                var input = document.createElement("input");
                input.type = "text";
                input.className = "uk-input";
                input.name = "member" + i;
                input.value = entry.platform;
                platform_container.appendChild(label);
                platform_container.appendChild(input);
                // Append a line break
                platform_container.appendChild(document.createElement("br"));

                /*label*/
                var label2 = document.createElement("label");
                label2.setAttribute("class","uk-form-label");
                label2.setAttribute('for','college');
                label2.append('Username');

                /*input*/
                var input2 = document.createElement("input");
                input2.type = "text";
                input2.className = "uk-input";
                input2.name = "member" + i;
                input2.value = entry.user_name;
                social_container.appendChild(label2);
                social_container.appendChild(input2);
                // Append a line break
                social_container.appendChild(document.createElement("br"));

            });
        }

    }
}