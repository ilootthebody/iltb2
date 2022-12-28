// -------------------------------------------------------------------------------- \\
// Called from magic-item-generator.html.
//
// Gets the selected categories from the form, sends the API request to AWS,
// and formats/displays the generated item(s).
// -------------------------------------------------------------------------------- \\
function getItems() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgetitems";
    const itemContainer = document.getElementById("item-container");

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab categories from HTML.
    var categoryElement = document.getElementById("category-checkboxes");
    var categoryCheckboxes = categoryElement.querySelectorAll('input[type=checkbox]:checked');
    var categories = [];
    for (var i = 0; i < categoryCheckboxes.length; i++) {
        categories.push(categoryCheckboxes[i].value);
    };

    // Grab power level from HTML.
    var powerElement = document.getElementById("power-level-checkboxes");
    var powerCheckboxes = powerElement.querySelectorAll('input[type=checkbox]:checked');
    var powerLevels = [];
    for (var i = 0; i < powerCheckboxes.length; i++) {
        powerLevels.push(powerCheckboxes[i].value);
    };

    // Grab other options from HTML.
    var optionsElement = document.getElementById("options-checkboxes");
    var optionsCheckboxes = optionsElement.querySelectorAll('input[type=checkbox]:checked');
    var options = [];
    for (var i = 0; i < optionsCheckboxes.length; i++) {
        options.push(optionsCheckboxes[i].value);
    };

    // Grab number of items from HTML.
    var i = document.getElementById("num_items");
    var numItems = i.options[i.selectedIndex].text;

    // Grab number of items from HTML.
    var e = document.getElementById("num_effects");
    var numEffects = e.options[e.selectedIndex].text;

    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({
        "category": categories.toString(),
        "power": powerLevels.toString(),
        "options": options.toString(),
        "numItems": numItems,
        "numEffects": numEffects
    });
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

            // Display Items
            for (var item of jsonResponse.items) {
                var name = item[0];
                var details = item[1];
                var desc = item[2];

                // Item name.
                var h2 = document.createElement("h2");
                var h2Text = document.createTextNode(name);
                h2.appendChild(h2Text);
                itemContainer.appendChild(h2);

                // Item details.
                var detailsPara = document.createElement("p");
                var detailsText = document.createTextNode(details);
                detailsPara.appendChild(detailsText);
                detailsPara.classList.add("item-details");
                itemContainer.appendChild(detailsPara);

                // Item description.
                var descPara = document.createElement("p");
                var descText = document.createTextNode(desc);
                descPara.classList.add("item-desc");
                descPara.appendChild(descText);
                itemContainer.appendChild(descPara);
            }

            itemContainer.style.display = "inline-block";
        })
        .catch(error => {
            var h2 = document.createElement("h2");
            var h2Text = document.createTextNode("Oops");
            h2.appendChild(h2Text);
            itemContainer.appendChild(h2);
            var para = document.createElement("p");
            var pText = document.createTextNode("Sorry, we rolled a 1 on our investigation check.");
            para.appendChild(pText);
            itemContainer.appendChild(para);
            itemContainer.style.display = "inline-block";
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
            nameContainer.style.display = "inline-block";
        })
        .catch(error => console.log('error', error));
}

// -------------------------------------------------------------------------------- \\
// Called from fantasy-name-generator.html.
//
// Ensures that either 'Curse' power level or 'Add Curse' options are checked, never
// both.
// -------------------------------------------------------------------------------- \\
function addCurseChecked(checkboxElem) { document.getElementById("curse").checked = false; }
function curseChecked(checkboxElem) { document.getElementById("add-curse").checked = false; }

// -------------------------------------------------------------------------------- \\
// Called from fantasy-name-generator.html.
//
// Allows user to select/deselect all checkboxes in the category form.
// -------------------------------------------------------------------------------- \\
function toggleCategories(source) {
    categoryBoxes = document.getElementsByName("categories");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Called from fantasy-name-generator.html.
//
// Allows user to select/deselect all checkboxes in the power level form.
// -------------------------------------------------------------------------------- \\
function togglePowerLevels(source) {
    plBoxes = document.getElementsByName("power-level");
    for (var i=0; i < plBoxes.length; i++) {
        plBoxes[i].checked = source.checked;
    }
    // Uncheck 'Add Curse' if 'Curse' power level is checked.
    if (document.getElementById("curse").checked) {
        document.getElementById("add-curse").checked = false;
    }
}