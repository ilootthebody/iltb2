// -------------------------------------------------------------------------------- \\
// Gathers relevant information from the checkboxes, send the API request to AWS, 
// and displays the items when the 'Generate Loot' button is pressed.
// -------------------------------------------------------------------------------- \\
async function generatePf2eTreasure() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/pf2e-treasure-generator";

    // Hide error text
    document.getElementById("error-p").style.display = "none";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab levels from HTML
    var levels = [];
    var levelCheckboxes = document.getElementsByName("level-checkbox");
    for (var i = 0; i < levelCheckboxes.length; i++) {
        if (levelCheckboxes[i].checked) { levels.push(levelCheckboxes[i].value); }
    };
    // Validate that at least one level is selected
    if (levels.length == 0) {
        document.getElementById("error-p").textContent = "ERROR: You must select at least one item level.";
        document.getElementById("error-p").style.display = "inline-block";
        return;
    }

    // Grab categories from HTML
    var categories = [];
    var categoryCheckboxes = document.getElementsByName("category-checkbox");
    for (var i = 0; i < categoryCheckboxes.length; i++) {
        if (categoryCheckboxes[i].checked) { categories.push(categoryCheckboxes[i].value); }
    };
    // Validate that at least one category is selected
    if (categories.length == 0) {
        document.getElementById("error-p").textContent = "ERROR: You must select at least one item category.";
        document.getElementById("error-p").style.display = "inline-block";
        return;
    }

    // Grab number of items from HTML.
    var i = document.getElementById("num-items");

    // Validate number of items input
    var betweenOneAndTwenty = /^([1-9]|1[0-9]|20)$/ // Number between 1 and 20
    if (i.value.match(betweenOneAndTwenty)) {
        var numItems = i.value;
    }
    else {
        document.getElementById("error-p").textContent = "ERROR: Number of items must be a number between 1-20.";
        document.getElementById("error-p").style.display = "inline-block";
        return;
    }

    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({
        "categories": categories.toString(),
        "levels": levels.toString(),
        "numItems": numItems
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log(raw);

    // Call API and await response
    const response = await fetch(API_URL, requestOptions);
    const responseJSON = await response.json();

    // Check for uncaught server side error
    if (responseJSON.errorMessage) {
        document.getElementById("error-p").style.display = "inline-block";
        document.getElementById("error-p").textContent = "Server error. Please try again or contact us at ilootthebody@gmail.com.";
        return;
    }

    // Display error message if error detected
    if (responseJSON.statusCode == 500) {
        document.getElementById("error-p").style.display = "inline-block";
        document.getElementById("error-p").textContent = items;
    }
    // Update item table with generated items
    else {
        // Parse JSON into dict
        const items = JSON.parse(responseJSON.body);
        var itemNum = 1;

        // Get body of item table
        var itemTableBody = document.getElementById("item-tbody");

        //Clear all existing rows from item table body
        itemTableBody.innerHTML = '';

        for (var item of items.items) {
            // Insert new row into item table
            var row = itemTableBody.insertRow(itemNum - 1);

            // Insert cells into new row
            var itemIndex = row.insertCell(0);
            var itemName = row.insertCell(1);
            var itemCat = row.insertCell(2);
            var itemLevel = row.insertCell(3);
            var itemPrice = row.insertCell(4);

            // Set cell values from item
            itemIndex.innerHTML = itemNum;
            itemCat.innerHTML = titleCase(item.category);
            itemLevel.innerHTML = item.level;
            itemPrice.innerHTML = item.price;

            // Create link for name cell
            var a = document.createElement('a');
            var tn = document.createTextNode(titleCase(item.name));
            a.appendChild(tn);
            a.href = item.link;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            itemName.appendChild(a);

            itemNum += 1;
        }
    }
}

// -------------------------------------------------------------------------------- \\
// Converts a string to title case.
// -------------------------------------------------------------------------------- \\
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all item levels.
// -------------------------------------------------------------------------------- \\
function toggleAllLevels(source) {
    levelBoxes = document.querySelectorAll("[name='level-checkbox']");
    for (var i = 0; i < levelBoxes.length; i++) {
        levelBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all item categories.
// -------------------------------------------------------------------------------- \\
function toggleAllCategories(source) {
    categoryBoxes = document.querySelectorAll("[name='category-checkbox']");
    for (var i = 0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}