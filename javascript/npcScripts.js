// -------------------------------------------------------------------------------- \\
// Gathers relevant information from the checkboxes, send the API request to AWS, 
// and displays the resulting NPC when the 'Generate NPC' button is pressed.
// -------------------------------------------------------------------------------- \\
async function generateNPC() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbgeneratenpc";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab races from HTML.
    var races = [];
    var raceCheckboxes = document.getElementsByName("race-checkbox");
    for (var i = 0; i < raceCheckboxes.length; i++) {
        if (raceCheckboxes[i].checked) { races.push(raceCheckboxes[i].value); }
    };
    console.log(races.toString());

    // Grab genders from HTML.
    var genders = [];
    var genderCheckboxes = document.getElementsByName("gender-checkbox");
    for (var i = 0; i < genderCheckboxes.length; i++) {
        if (genderCheckboxes[i].checked) { genders.push(genderCheckboxes[i].value); }
    };
    console.log(genders.toString());

    // Grab ages from HTML.
    var ages = [];
    var ageCheckboxes = document.getElementsByName("age-checkbox");
    for (var i = 0; i < ageCheckboxes.length; i++) {
        if (ageCheckboxes[i].checked) { ages.push(ageCheckboxes[i].value); }
    };
    console.log(ages.toString());

    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({
        "races": races.toString(),
        "genders": genders.toString(),
        "ages": ages.toString()
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // Call API and await response
    const response = await fetch(API_URL, requestOptions);
    const responseJSON = await response.json();
    const npcDetails = JSON.parse(responseJSON.body);

    // Update HTML
    document.getElementById("npc-name-header").textContent = npcDetails.name;
    document.getElementById("npc-race-text").textContent = npcDetails.race;
    document.getElementById("npc-appearance-text").textContent = npcDetails.appearance;
    document.getElementById("npc-clothing-text").textContent = npcDetails.clothing;
    document.getElementById("npc-voice-text").textContent = npcDetails.voice;
    document.getElementById("npc-personality-text").textContent = npcDetails.personality;
    document.getElementById("npc-profession-text").textContent = npcDetails.profession;
    document.getElementById("npc-motivation-text").textContent = npcDetails.motivation;
}

// -------------------------------------------------------------------------------- \\
// Regenerates a specific field within the NPC details when the refresh button is
// pressed.
// -------------------------------------------------------------------------------- \\
async function regenField(field) {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbregenfield";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab races from HTML.
    var races = [];
    var raceCheckboxes = document.getElementsByName("race-checkbox");
    for (var i = 0; i < raceCheckboxes.length; i++) {
        if (raceCheckboxes[i].checked) { races.push(raceCheckboxes[i].value); }
    };
    console.log(races.toString());

    // Grab genders from HTML.
    var genders = [];
    var genderCheckboxes = document.getElementsByName("gender-checkbox");
    for (var i = 0; i < genderCheckboxes.length; i++) {
        if (genderCheckboxes[i].checked) { genders.push(genderCheckboxes[i].value); }
    };
    console.log(genders.toString());

    // Grab ages from HTML.
    var ages = [];
    var ageCheckboxes = document.getElementsByName("age-checkbox");
    for (var i = 0; i < ageCheckboxes.length; i++) {
        if (ageCheckboxes[i].checked) { ages.push(ageCheckboxes[i].value); }
    };
    console.log(ages.toString());

    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({
        "field": field,
        "oldFields": {
            "npc-name-header": document.getElementById("npc-name-header").textContent,
            "npc-race-text": document.getElementById("npc-race-text").textContent,
            "npc-appearance-text": document.getElementById("npc-appearance-text").textContent,
            "npc-clothing-text": document.getElementById("npc-clothing-text").textContent,
            "npc-voice-text": document.getElementById("npc-voice-text").textContent,
            "npc-personality-text": document.getElementById("npc-personality-text").textContent,
            "npc-profession-text": document.getElementById("npc-profession-text").textContent,
            "npc-motivation-text": document.getElementById("npc-motivation-text").textContent
        },
        "races": races.toString(),
        "genders": genders.toString(),
        "ages": ages.toString()
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // Call API and await response
    const response = await fetch(API_URL, requestOptions);
    const responseJSON = await response.json();
    const newFields = JSON.parse(responseJSON.body);

    // Update HTML
    document.getElementById("npc-name-header").textContent = newFields.name;
    document.getElementById("npc-race-text").textContent = newFields.race;
    document.getElementById("npc-appearance-text").textContent = newFields.appearance;
    document.getElementById("npc-clothing-text").textContent = newFields.clothing;
    document.getElementById("npc-voice-text").textContent = newFields.voice;
    document.getElementById("npc-personality-text").textContent = newFields.personality;
    document.getElementById("npc-profession-text").textContent = newFields.profession;
    document.getElementById("npc-motivation-text").textContent = newFields.motivation;
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all races in the 'Core Fantasy' section.
// -------------------------------------------------------------------------------- \\
function toggleStandardRaces(source) {
    parent = document.getElementById("standard-races-fs");
    categoryBoxes = parent.querySelectorAll("[name='race-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all races in the 'Expanded' section.
// -------------------------------------------------------------------------------- \\
function toggleExpandedRaces(source) {
    parent = document.getElementById("expanded-races-fs");
    categoryBoxes = parent.querySelectorAll("[name='race-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all races in the 'Beastfolk' section.
// -------------------------------------------------------------------------------- \\
function toggleBeastRaces(source) {
    parent = document.getElementById("beast-races-fs");
    categoryBoxes = parent.querySelectorAll("[name='race-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all races in the 'Exotic/Other' section.
// -------------------------------------------------------------------------------- \\
function toggleExoticRaces(source) {
    parent = document.getElementById("exotic-races-fs");
    categoryBoxes = parent.querySelectorAll("[name='race-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Toggles the races for the selected source book.
// -------------------------------------------------------------------------------- \\
function toggleSourceRaces(source) {
    if (source.value == "phb") {
        document.getElementById("dragonborn").checked = source.checked;
        document.getElementById("dwarf").checked = source.checked;
        document.getElementById("elf").checked = source.checked;
        document.getElementById("gnome").checked = source.checked;
        document.getElementById("half-elf").checked = source.checked;
        document.getElementById("halfling").checked = source.checked;
        document.getElementById("half-orc").checked = source.checked;
        document.getElementById("human").checked = source.checked;
        document.getElementById("tiefling").checked = source.checked;
    }
    else if (source.value == "motm") {
        document.getElementById("aarakocra").checked = source.checked;
        document.getElementById("aasimar").checked = source.checked;
        document.getElementById("bugbear").checked = source.checked;
        document.getElementById("centaur").checked = source.checked;
        document.getElementById("changeling").checked = source.checked;
        document.getElementById("deep-gnome").checked = source.checked;
        document.getElementById("duergar").checked = source.checked;
        document.getElementById("eladrin").checked = source.checked;
        document.getElementById("fairy").checked = source.checked;
        document.getElementById("firbolg").checked = source.checked;
        document.getElementById("genasi-air").checked = source.checked;
        document.getElementById("genasi-earth").checked = source.checked;
        document.getElementById("genasi-fire").checked = source.checked;
        document.getElementById("genasi-water").checked = source.checked;
        document.getElementById("githyanki").checked = source.checked;
        document.getElementById("githzerai").checked = source.checked;
        document.getElementById("goblin").checked = source.checked;
        document.getElementById("goliath").checked = source.checked;
        document.getElementById("harengon").checked = source.checked;
        document.getElementById("hobgoblin").checked = source.checked;
        document.getElementById("kenku").checked = source.checked;
        document.getElementById("kobold").checked = source.checked;
        document.getElementById("lizardfolk").checked = source.checked;
        document.getElementById("minotaur").checked = source.checked;
        document.getElementById("orc").checked = source.checked;
        document.getElementById("satyr").checked = source.checked;
        document.getElementById("sea-elf").checked = source.checked;
        document.getElementById("shadar-kai").checked = source.checked;
        document.getElementById("shifter").checked = source.checked;
        document.getElementById("tabaxi").checked = source.checked;
        document.getElementById("tortle").checked = source.checked;
        document.getElementById("triton").checked = source.checked;
        document.getElementById("yuan-ti").checked = source.checked;
    }
    else if (source.value == "vgtm") {
        document.getElementById("aasimar").checked = source.checked;
        document.getElementById("bugbear").checked = source.checked;
        document.getElementById("firbolg").checked = source.checked;
        document.getElementById("goblin").checked = source.checked;
        document.getElementById("hobgoblin").checked = source.checked;
        document.getElementById("kenku").checked = source.checked;
        document.getElementById("kobold").checked = source.checked;
        document.getElementById("lizardfolk").checked = source.checked;
        document.getElementById("orc").checked = source.checked;
        document.getElementById("tabaxi").checked = source.checked;
        document.getElementById("triton").checked = source.checked;
        document.getElementById("yuan-ti").checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Toggles the races for the selected campaign setting.
// -------------------------------------------------------------------------------- \\
function toggleSettingRaces(source) {
    if (source.value == "dragonlance") {
        document.getElementById("kender").checked = source.checked;
        document.getElementById("dwarf").checked = source.checked;
        document.getElementById("elf").checked = source.checked;
        document.getElementById("half-elf").checked = source.checked;
        document.getElementById("gnome").checked = source.checked;
        document.getElementById("human").checked = source.checked;
        document.getElementById("dragonborn").checked = source.checked;
        document.getElementById("minotaur").checked = source.checked;
        document.getElementById("kobold").checked = source.checked;
    }
    else if (source.value == "eberron") {
        var phb = document.getElementById("phb");
        phb.checked = source.checked;
        toggleSourceRaces(phb);

        document.getElementById("changeling").checked = source.checked;
        document.getElementById("bugbear").checked = source.checked;
        document.getElementById("goblin").checked = source.checked;
        document.getElementById("hobgoblin").checked = source.checked;
        document.getElementById("kalashtar").checked = source.checked;
        document.getElementById("orc").checked = source.checked;
        document.getElementById("shifter").checked = source.checked;
        document.getElementById("warforged").checked = source.checked;
    }
    else if (source.value == "ravenloft") {
        var phb = document.getElementById("phb");
        phb.checked = source.checked;
        toggleSourceRaces(phb);

        document.getElementById("dhampir").checked = source.checked;
        document.getElementById("hexblood").checked = source.checked;
        document.getElementById("reborn").checked = source.checked;
    }
    else if (source.value == "ravnica") {
        document.getElementById("human").checked = source.checked;
        document.getElementById("elf").checked = source.checked;
        document.getElementById("half-elf").checked = source.checked;
        document.getElementById("centaur").checked = source.checked;
        document.getElementById("goblin").checked = source.checked;
        document.getElementById("loxodon").checked = source.checked;
        document.getElementById("minotaur").checked = source.checked;
        document.getElementById("simic-hybrid").checked = source.checked;
        document.getElementById("vedalken").checked = source.checked;
    }
    else if (source.value == "spelljammer") {
        var phb = document.getElementById("phb");
        phb.checked = source.checked;
        toggleSourceRaces(phb);

        document.getElementById("astral-elf").checked = source.checked;
        document.getElementById("autognome").checked = source.checked;
        document.getElementById("giff").checked = source.checked;
        document.getElementById("hadozee").checked = source.checked;
        document.getElementById("plasmoid").checked = source.checked;
        document.getElementById("thri-kreen").checked = source.checked;
        document.getElementById("githyanki").checked = source.checked;
    }
    else if (source.value == "strixhaven") {
        var phb = document.getElementById("phb");
        phb.checked = source.checked;
        toggleSourceRaces(phb);

        document.getElementById("owlin").checked = source.checked;
    }
    else if (source.value == "theros") {
        document.getElementById("human").checked = source.checked;
        document.getElementById("centaur").checked = source.checked;
        document.getElementById("leonin").checked = source.checked;
        document.getElementById("minotaur").checked = source.checked;
        document.getElementById("satyr").checked = source.checked;
        document.getElementById("triton").checked = source.checked;
    }
}