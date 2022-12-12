// -------------------------------------------------------------------------------- \\
// Called from magic-item-generator.html.
//
// Gets the selected categories from the form, sends the API request to AWS,
// and formats/displays the generated item(s).
// -------------------------------------------------------------------------------- \\
function getItems() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgetitem";
    const itemContainer = document.getElementById("item-container");

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab categories from HTML and format as JSON string.
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var categories = [];
    for (var i = 0; i < checkboxes.length; i++) {
        categories.push(checkboxes[i].value);
    };

    // Check for zero selected categories
    if (categories.length == 0) {
        document.getElementById("itemName").innerHTML = "Literally Nothing";
        document.getElementById("itemDescription").innerHTML = "This body has nothing of interest to be found.";
        document.getElementById("item-container").style.display = "inline-block";
        return;
    };

    // Grab number of items from HTML.
    var e = document.getElementById("num_items");
    var numItems = e.options[e.selectedIndex].text;

    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({ "category": categories.toString(), "numItems": numItems });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // Clear old items from HTML.
    while (itemContainer.firstChild) {
        itemContainer.removeChild(itemContainer.firstChild);
    }

    // make API call with parameters and use promises to get response
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            var jsonResponse = JSON.parse(result.body);

            for (var item of jsonResponse.items) {
                // Item name.
                var h2 = document.createElement("h2");
                var h2Text = document.createTextNode(item[0]);
                h2.appendChild(h2Text);
                itemContainer.appendChild(h2);

                // Item description.
                var para = document.createElement("p");
                var pText = document.createTextNode(item[1]);
                para.appendChild(pText);
                itemContainer.appendChild(para);
            }

            itemContainer.style.display = "inline-block";
        })
        .catch(error => {
            document.getElementById("itemName").innerHTML = "ERROR";
            document.getElementById("itemDescription").innerHTML = "Sorry for the inconvenience.";
            document.getElementById("item-container").style.display = "inline-block";
            console.log('error', error)
            return;
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
            // document.getElementById("names").innerHTML = nameArray.join('\r\n');
            nameContainer.style.display = "inline-block";
        })
        .catch(error => console.log('error', error));
}