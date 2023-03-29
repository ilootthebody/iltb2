// -------------------------------------------------------------------------------- \\
// Gets the selected categories from the form, sends the API request to AWS,
// and formats/displays the generated item(s).
// -------------------------------------------------------------------------------- \\
async function getItems() {
    // Grab number of items from HTML.
    var i = document.getElementById("num_items");
    var numItems = i.options[i.selectedIndex].text;

    // Display item containers
    for (let ii = 1; ii <= 5; ii++) {
        if (ii <= numItems) {
            document.getElementById("item" + ii + "-con").style.display = "block";
            document.getElementById("item" + ii + "-loader").style.display = "block";
        }
        else {
            document.getElementById("item" + ii + "-con").style.display = "none";
            document.getElementById("item" + ii + "-name").textContent = "Generating Item";
            document.getElementById("item" + ii + "-det").textContent = "...";
            document.getElementById("item" + ii + "-desc").textContent = "...";
        }
    }

    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/dnd5e-item-generator";
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

    // Grab number of effects from HTML.
    var e = document.getElementById("num_effects");
    var numEffects = e.options[e.selectedIndex].text;

    // create JSON objects with parameters and options for API call
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

    // Index for iterating over number of items
    itemNum = 1;

    // Display Generated Items
    for (var item of itemList.items) {
        document.getElementById("item" + itemNum + "-loader").style.display = "none";
        document.getElementById("item" + itemNum + "-name").textContent = item[0];
        document.getElementById("item" + itemNum + "-det").textContent = item[1];
        document.getElementById("item" + itemNum + "-desc").textContent = item[2];
        itemNum++;
    }
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
function toggleWearableCategories(source) {
    parent = document.getElementById("wearable-fs");
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
    plBoxes = document.getElementsByName("power-level-checkbox");
    for (var i = 0; i < plBoxes.length; i++) {
        plBoxes[i].checked = source.checked;
    }
    // Uncheck 'Add Curse' if 'Curse' power level is checked.
    if (document.getElementById("curse").checked) {
        document.getElementById("add-curse").checked = false;
    }
}