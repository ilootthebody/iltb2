function getItem() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgetitem"

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab category from HTML and format as JSON string.
    var e = document.getElementById("category");
    var category = e.options[e.selectedIndex].text;
    var raw = JSON.stringify({ "category": category });

    // create a JSON object with parameters for API call and store in a variable
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
            var jsonResponse = JSON.parse(result.body)

            // Update webpage
            document.getElementById("itemName").innerHTML = jsonResponse.itemName;
            document.getElementById("itemDescription").innerHTML = jsonResponse.itemDescription;
            document.getElementById("item-container").style.display = "inline-block";
        })
        .catch(error => console.log('error', error));
}

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
                var h2 = document.createElement("h2");
                var h2Text = document.createTextNode(name);
                h2.appendChild(h2Text);
                nameContainer.appendChild(h2);
            }
            
            // Update webpage
            // document.getElementById("names").innerHTML = nameArray.join('\r\n');
            nameContainer.style.display = "inline-block";
        })
        .catch(error => console.log('error', error));
}

function possibleItems() {
    var e = document.getElementById("category");
    var category = e.options[e.selectedIndex].text;

    if (category == "Any") {
        document.getElementById("possible-items").innerHTML = "There are 22,879 possible items."
    } else if (category == "Armor") {
        document.getElementById("possible-items").innerHTML = "There are 2,055 possible pieces of armor."
    } else if (category == "Clothing") {
        document.getElementById("possible-items").innerHTML = "There are 2,877 possible articles of clothing."
    } else if (category == "Equipment") {
        document.getElementById("possible-items").innerHTML = "There are 9,453 possible pieces of equipment."
    } else if (category == "Instrument") {
        document.getElementById("possible-items").innerHTML = "There are 1,507 possible instruments."
    } else if (category == "Vehicle") {
        document.getElementById("possible-items").innerHTML = "There are 685 possible vehicles."
    } else if (category == "Weapon") {
        document.getElementById("possible-items").innerHTML = "There are 6,302 possible weapons."
    }
    
}