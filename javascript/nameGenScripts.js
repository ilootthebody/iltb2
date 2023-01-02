// -------------------------------------------------------------------------------- \\
// Called from fantasy-name-generator.html.
//
// Gets the number of names, sends the API request to AWS, and formats/displays
// the generated name(s).
// -------------------------------------------------------------------------------- \\
function getName() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgetname";
    const nameContainer = document.getElementById("name-container");

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab genders from HTML.
    var genderElement = document.getElementById("gender-checkboxes");
    var genderCheckboxes = genderElement.querySelectorAll('input[type=checkbox]:checked');
    var genders = [];
    for (var i = 0; i < genderCheckboxes.length; i++) {
        genders.push(genderCheckboxes[i].value);
    };

    // Grab number of names from HTML and format as JSON string.
    var e = document.getElementById("num_names");
    var num_names = e.options[e.selectedIndex].text;
    var raw = JSON.stringify({ "num_names": num_names, "genders": genders.toString() });

    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // Clear old names from HTML.
    while (nameContainer.firstChild) {
        nameContainer.removeChild(nameContainer.firstChild)
    }

    // make API call with parameters and use promises to get response
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            var jsonResponse = JSON.parse(result.body);
            var nameArray = jsonResponse.names;

            for (const name of nameArray) {
                var para = document.createElement("p");
                var pText = document.createTextNode(name);
                para.appendChild(pText);
                nameContainer.appendChild(para);
            }

            // Update webpage
            nameContainer.style.display = "inline-block";
        })
        .catch(error => console.log('error', error));
}