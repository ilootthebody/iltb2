// -------------------------------------------------------------------------------- \\
// Gets the selected categories from the form, sends the API request to AWS,
// and formats/displays the generated item(s).
// -------------------------------------------------------------------------------- \\
async function getItems() {
    // Create API URL. If in DEV, change it.
    var API_URL = "https://r5v52vn69g.execute-api.us-east-2.amazonaws.com/iltb/PRD-DND5E-HB-Item-Gen";
    if (document.location.hostname != "www.ilootthebody.com") {
        API_URL = "https://qi9d504bkk.execute-api.us-east-2.amazonaws.com/iltb/DEV-DND5E-HB-Item-Gen";
    }

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

    // Grab number of effects from HTML.
    var e = document.getElementById("num_effects");
    var numEffects = e.options[e.selectedIndex].text;
    var totalEffects = parseInt(numEffects)
    if (options.includes("cursed")) { totalEffects = parseInt(numEffects) + 1; }

    // Display/hide item containers
    for (let ii = 1; ii <= 5; ii++) {
        if (ii <= parseInt(numItems)) {
            document.getElementById("item" + ii + "-con").style.display = "block";
            document.getElementById("item" + ii + "-loader").style.display = "block";

            for (ee = 1; ee <= 5; ee++) {
                if (ee <= parseInt(totalEffects)) {
                    document.getElementById("item" + ii + "-effect" + ee).style.display = "block";
                    document.getElementById("item" + ii + "-effect" + ee + "-regen").style.display = "block";
                }
                else {
                    document.getElementById("item" + ii + "-effect" + ee).style.display = "none";
                    document.getElementById("item" + ii + "-effect" + ee + "-regen").style.display = "none";
                }
            }
        }
        else {
            document.getElementById("item" + ii + "-con").style.display = "none";
            document.getElementById("item" + ii + "-name").textContent = "Generating Item";
            document.getElementById("item" + ii + "-det").textContent = "...";
            document.getElementById("item" + ii + "-effect1").textContent = "...";
            document.getElementById("item" + ii + "-effect2").textContent = "...";
            document.getElementById("item" + ii + "-effect3").textContent = "...";
            document.getElementById("item" + ii + "-effect4").textContent = "...";
            document.getElementById("item" + ii + "-effect5").textContent = "...";
        }
    }

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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

    // Display Generated Items. Item array is formatted as [item_name, effect_position, effect_name, details, effect_desc]
    for (var item of itemList.items) {
        var itemName = item[0];
        var effectPosition = item[1];
        var effectName = item[2];
        var itemDetails = item[3];
        var effectDescription = item[4];

        document.getElementById("item" + itemNum + "-loader").style.display = "none";
        document.getElementById("item" + itemNum + "-name").textContent = itemName;

        if (effectPosition == "PREFIX") {
            document.getElementById("item" + itemNum + "-prefix").textContent = effectName;
            document.getElementById("item" + itemNum + "-suffix").textContent = "";
        }
        else if (effectPosition == "SUFFIX") {
            document.getElementById("item" + itemNum + "-suffix").textContent = effectName;
            document.getElementById("item" + itemNum + "-prefix").textContent = "";
        }

        document.getElementById("item" + itemNum + "-det").textContent = itemDetails;

        effectNum = 1;
        for (let ee = 0; ee < totalEffects; ee++) {
            document.getElementById("item" + itemNum + "-effect" + effectNum).textContent = effectDescription[ee];
            document.getElementById("item" + itemNum + "-effect" + effectNum + "-regen").style.display = "block";
            effectNum++;
        }

        itemNum++;
    }
}

// -------------------------------------------------------------------------------- \\
// API call to regenerate a single effect on an item.
// -------------------------------------------------------------------------------- \\
async function regenEffect(effectID) {
    splitID = effectID.split("-");
    itemNum = splitID[0];
    effectNum = splitID[1];

    // API URL
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgetitem";

    // Grab power levels from HTML
    var powerCheckboxes = document.getElementsByName("power-level-checkbox");
    var powerLevels = [];
    for (var i = 0; i < powerCheckboxes.length; i++) {
        if (powerCheckboxes[i].checked) { powerLevels.push(powerCheckboxes[i].value); }
    };

    // Grab item details from HTML and split into an array
    itemDetails = document.getElementById(itemNum + "-det").textContent;

    // Grab item name from HTML
    item = document.getElementById(itemNum + "-name").textContent;

    // Grab current effect power level from HTML
    effectPower = document.getElementById(itemNum + "-" + effectNum).textContent.split(" ")[0];

    // Instantiate and populate header
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // create JSON objects with parameters and options for API call
    var raw = JSON.stringify({
        "power": powerLevels.toString(),
        "details": itemDetails,
        "item": item,
        "old_power": effectPower
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
    const newEffect = JSON.parse(responseJSON.body);

    // Set new effect description
    document.getElementById(itemNum + "-" + effectNum).textContent = newEffect.effect_desc;

    // Set new item details
    document.getElementById(itemNum + "-det").textContent = newEffect.details;

    // If effect is first effect, update item name
    if (effectNum == "effect1") {
        if (newEffect.position == "PREFIX") {
            document.getElementById(itemNum + "-prefix").textContent = newEffect.effect_name;
            document.getElementById(itemNum + "-suffix").textContent = "";
        }
        else if (newEffect.position == "SUFFIX") {
            document.getElementById(itemNum + "-suffix").textContent = newEffect.effect_name;
            document.getElementById(itemNum + "-prefix").textContent = "";
        }
    }

    console.log(newEffect);

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