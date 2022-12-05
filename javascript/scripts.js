// -------------------------------------------------------------------------------- \\
// Called from magic-item-generator.html.
//
// Gets the selected categories from the form, sends the API request to AWS,
// and formats/displays the generated item(s).
// -------------------------------------------------------------------------------- \\
function getItems() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgetitems";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab categories from HTML and format as JSON string.
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var categories = [];
    for (var i=0; i<checkboxes.length; i++) {
        categories.push(checkboxes[i].value);
    };

    // Check for zero selected categories
    if (categories.length == 0) {
        document.getElementById("itemName").innerHTML = "Literally Nothing";
        document.getElementById("itemDescription").innerHTML = "This body has nothing of interest to be found.";
        document.getElementById("item-container").style.display = "inline-block";
        return;
    };

    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({ "category": categories.toString() });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // make API call with parameters and use promises to get response
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            var jsonResponse = JSON.parse(result.body);

            // Update webpage
            document.getElementById("itemName").innerHTML = jsonResponse.itemName;
            document.getElementById("itemDescription").innerHTML = jsonResponse.itemDescription;
            document.getElementById("item-container").style.display = "inline-block";
        })
        .catch(error => {
            document.getElementById("itemName").innerHTML = "ERROR";
            document.getElementById("itemDescription").innerHTML = "Sorry for the inconvenience.";
            document.getElementById("item-container").style.display = "inline-block";
            console.log('error', error)
        });
}

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

    // Grab number of names from HTML and format as JSON string.
    var e = document.getElementById("num_names");
    var num_names = e.options[e.selectedIndex].text;
    var raw = JSON.stringify({ "num_names": num_names });

    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

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
            // document.getElementById("names").innerHTML = nameArray.join('\r\n');
            nameContainer.style.display = "inline-block";
        })
        .catch(error => console.log('error', error));
}