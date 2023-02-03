// -------------------------------------------------------------------------------- \\
// Gets the selected categories from the form, sends the API request to AWS,
// and formats/displays the generated item(s).
// -------------------------------------------------------------------------------- \\
async function getPf2eItems() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgetitems";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab categories from HTML.
    var categoryCheckboxes = document.getElementsByName("category-checkbox");
    var categories = [];
    for (var i = 0; i < categoryCheckboxes.length; i++) {
        if (categoryCheckboxes[i].checked) { categories.push(categoryCheckboxes[i].value); }
    };

    // Grab power levels from HTML.
    var powerCheckboxes = document.getElementsByName("power-level-checkbox");
    var powerLevels = [];
    for (var i = 0; i < powerCheckboxes.length; i++) {
        if (powerCheckboxes[i].checked) { powerLevels.push(powerCheckboxes[i].value); }
    };

    // Grab other options from HTML.
    var optionsCheckboxes = document.getElementsByName("options-checkbox");
    var options = [];
    for (var i = 0; i < optionsCheckboxes.length; i++) {
        if (optionsCheckboxes[i].checked) { options.push(optionsCheckboxes[i].value); }
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

    console.log(raw);

    // Make API call with parameters and await response
    const response = await fetch(API_URL, requestOptions);
    const responseJSON = await response.json();

    // Check for errors
    if (responseJSON.hasOwnProperty("errorMessage")) {
        console.log(responseJSON);

        displayErrorMessage();

        return;
    }

    // Extract items from JSON
    const itemList = JSON.parse(responseJSON.body);

    // Get item container from HTML
    const itemContainer = document.getElementById("item-container");

    // Clear old items from item container.
    while (itemContainer.firstChild) {
        itemContainer.removeChild(itemContainer.firstChild);
    }

    // Display Items
    for (var item of itemList.items) {
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
}

// -------------------------------------------------------------------------------- \\
// Displays a generic error message to the user.
// -------------------------------------------------------------------------------- \\
function displayErrorMessage() {
    const itemContainer = document.getElementById("item-container");

    // Clear old items from item container.
    while (itemContainer.firstChild) {
        itemContainer.removeChild(itemContainer.firstChild);
    }

    var h2 = document.createElement("h2");
    var h2Text = document.createTextNode("Oops...");
    h2.appendChild(h2Text);
    itemContainer.appendChild(h2);

    var detailsPara = document.createElement("p");
    var detailsText = document.createTextNode("Looks like we rolled a nat 1 on our investigation check. Please try again later.");
    detailsPara.appendChild(detailsText);
    itemContainer.appendChild(detailsPara);

    itemContainer.style.display = "inline-block";
}

// -------------------------------------------------------------------------------- \\
// Ensures that either 'Curse' power level or 'Add Curse' options are checked, never
// both.
// -------------------------------------------------------------------------------- \\
function addCurseChecked(checkboxElem) { document.getElementById("curse").checked = false; }
function curseChecked(checkboxElem) { document.getElementById("add-curse").checked = false; }

// -------------------------------------------------------------------------------- \\
// Allows user to select/deselect all checkboxes in the weapon category.
// -------------------------------------------------------------------------------- \\
function toggleWeaponCategories(source) {
    parent = document.getElementById("weapon-fs");
    categoryBoxes = parent.querySelectorAll("[name='category-checkbox']");
    for (var i = 0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Allows user to select/deselect all checkboxes in the armor category.
// -------------------------------------------------------------------------------- \\
function toggleArmorCategories(source) {
    parent = document.getElementById("armor-fs");
    categoryBoxes = parent.querySelectorAll("[name='category-checkbox']");
    for (var i = 0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Allows user to select/deselect all checkboxes in the other category.
// -------------------------------------------------------------------------------- \\
function toggleOtherCategories(source) {
    parent = document.getElementById("other-category-fs");
    categoryBoxes = parent.querySelectorAll("[name='category-checkbox']");
    for (var i = 0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Allows user to select/deselect all checkboxes in the power level form.
// -------------------------------------------------------------------------------- \\
function togglePowerLevels(source) {
    plBoxes = document.getElementsByName("pl-checkbox");
    for (var i = 0; i < plBoxes.length; i++) {
        plBoxes[i].checked = source.checked;
    }
    // Uncheck 'Add Curse' if 'Curse' power level is checked.
    if (document.getElementById("curse").checked) {
        document.getElementById("add-curse").checked = false;
    }
}