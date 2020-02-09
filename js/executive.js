var all_executives;
var president_info;

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

function editExecutive(data) {

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
                alert('Executive updates');
                $('#executive_form_edit').trigger("reset");
            } else {
                alert('Executive exists');
                $('#executive_form_edit').trigger("reset");
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

        console.log(all_executives);

        document.getElementById('edit_form').style.display = 'none';
        document.getElementById('update_form').style.display = 'block';
        var data = all_executives[index];
        document.getElementById('executive_id').value = data.id;
        document.getElementById('first_name').value = data.first_name;
        document.getElementById('middle_name').value = data.middle_name;
        document.getElementById('last_name').value = data.last_name;
        document.getElementById('title').value = data.title;
        document.getElementById('phone').value = data.phone;
        document.getElementById('email').value = data.email;
        document.getElementById('bio').value = data.bio;
        document.getElementById('resumes').value = data.resumes;
        document.getElementById('photos').value = data.photo;

        var img_container = document.getElementById("img_container");
        while (img_container.hasChildNodes()) {
            img_container.removeChild(img_container.lastChild);
        }
        var image = document.createElement("img");
        image.setAttribute("src", document.location.origin + '/uploads/' + data.photo);
        image.style.height = '100%';
        image.style.width = '100%';
        img_container.appendChild(image);


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
                label.setAttribute("class", "uk-form-label");
                label.setAttribute('for', 'college');
                label.append('Platform');
                /*label end*/

                /*input*/
                var input = document.createElement("input");
                input.type = "text";
                input.className = "uk-input";
                input.name = "platform";
                input.value = entry.platform;
                platform_container.appendChild(label);
                platform_container.appendChild(input);
                // Append a line break
                platform_container.appendChild(document.createElement("br"));

                /*label*/
                var label2 = document.createElement("label");
                label2.setAttribute("class", "uk-form-label");
                label2.setAttribute('for', 'college');
                label2.append('Username');

                /*input*/
                var input2 = document.createElement("input");
                input2.type = "text";
                input2.className = "uk-input";
                input2.name = "user_name";
                input2.value = entry.user_name;
                social_container.appendChild(label2);
                social_container.appendChild(input2);
                // Append a line break
                social_container.appendChild(document.createElement("br"));

            });
        }

    }
}

function displayExecutiveTeam() {
    var data = {retrieve_team: "yes"};
    $.ajax({
        url: site_url,
        type: "get",
        dataType: "json",
        data: data,
        success: function (result) {
            bindData(result);
        }
    });
}

function bindData(result) {
    // Container <div> where dynamic content will be placed
    var executive_container = document.getElementById("executive_div");
    // Clear previous contents of the container
    while (executive_container.hasChildNodes()) {
        executive_container.removeChild(executive_container.lastChild);
    }

    for (i = 0; i < result.length; i++) {

        // Append a node with a random text
        var div_ = document.createElement("div");
        div_.setAttribute("class", "uk-card uk-card-default uk-card-hover");
        div_.style.margin = '2%';


        /*div 1*/
        var div = document.createElement("div");
        div.setAttribute("class", "uk-card-media-top");
        div.setAttribute('id', i);
        /*div 1 end*/

        /*a tag*/
        var a = document.createElement("a");
        a.href='#executive-profile';
        a.id = 'view_president';
        /*a tag*/

        /*image*/
        var image = document.createElement("img");
        image.setAttribute("src", document.location.origin + '/uploads/' + result[i].photo);
        image.setAttribute('id', i);
        image.style.height = '100%';
        image.style.width = '100%';
        /*end image*/

        /*div 2*/
        var div2 = document.createElement('div');
        div2.setAttribute('class', 'uk-padding-small uk-text-center');
        div2.setAttribute('id', i);
        /*end div 2*/

        /*h4*/
        var h4 = document.createElement('h4');
        h4.setAttribute('class', 'uk-h4 uk-margin-remove');
        h4.setAttribute('id', i);
        h4.append(result[i].name);
        /*h4*/

        /*p*/
        var p = document.createElement('p');
        p.setAttribute('class', 'uk-text-muted uk-margin-remove');
        p.setAttribute('id', i);
        p.append(result[i].title);
        /*p*/
        div2.appendChild(h4);
        div2.appendChild(p);

        div.appendChild(image);
        if (result[i].title === "President"){
            president_info = result[i];
            a.appendChild(div);
            a.appendChild(div2);
            div_.appendChild(a);
            div_.appendChild(document.createElement("br"));
        }else {
            div_.appendChild(div);
            div_.appendChild(div2);
            div_.appendChild(document.createElement("br"));
        }

        executive_container.appendChild(div_);

    }
}