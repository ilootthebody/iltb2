// -------------------------------------------------------------------------------- \\
// Gathers relevant information from the checkboxes, send the API request to AWS, 
// and displays the items when the 'Generate Treasure' button is pressed.
// -------------------------------------------------------------------------------- \\
async function generatePf2eTreasure() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/pf2e-treasure-generator";

    // Hide error text
    document.getElementById("error-p").style.display = "none";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab levels from HTML.
    var levels = [];
    var levelCheckboxes = document.getElementsByName("level-checkbox");
    for (var i = 0; i < levelCheckboxes.length; i++) {
        if (levelCheckboxes[i].checked) { levels.push(levelCheckboxes[i].value); }
    };

    // Grab categories from HTML.
    var categories = [];
    var categoryCheckboxes = document.getElementsByName("category-checkbox");
    for (var i = 0; i < categoryCheckboxes.length; i++) {
        if (categoryCheckboxes[i].checked) { categories.push(categoryCheckboxes[i].value); }
    };

    // Grab number of items from HTML.
    var i = document.getElementById("num_items");
    var numItems = i.options[i.selectedIndex].text;

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
    const statusCode = responseJSON.statusCode;
    const items = JSON.parse(responseJSON.body);

    console.log(items);

    // Update HTML
    if (statusCode == 500) {
        document.getElementById("error-p").style.display = "inline-block";
        document.getElementById("error-p").textContent = items;
    }
    else {
        itemNum = 1;
        for (var item of items.items) {
            document.getElementById("item-" + itemNum.toString()).style.display = "list-item";
            document.getElementById("item-" + itemNum.toString() + "-name").textContent = titleCase(item.name);
            document.getElementById("item-" + itemNum.toString() + "-cat").textContent = titleCase(item.category);
            document.getElementById("item-" + itemNum.toString() + "-lvl").textContent = item.level;
            document.getElementById("item-" + itemNum.toString() + "-name").href = item.link;
            itemNum += 1;
        }

        // Hide any unused items
        for (itemNum; itemNum <= 5; itemNum++) { document.getElementById("item-" + itemNum.toString()).style.display = "none"; }
    }


    // document.getElementById("npc-name-header").textContent = npcDetails.name;
    // document.getElementById("npc-race-text").textContent = npcDetails.race;
    // document.getElementById("npc-appearance-text").textContent = npcDetails.appearance;
    // document.getElementById("npc-clothing-text").textContent = npcDetails.clothing;
    // document.getElementById("npc-voice-text").textContent = npcDetails.voice;
    // document.getElementById("npc-personality-text").textContent = npcDetails.personality;
    // document.getElementById("npc-profession-text").textContent = npcDetails.profession;
    // document.getElementById("npc-motivation-text").textContent = npcDetails.motivation;
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