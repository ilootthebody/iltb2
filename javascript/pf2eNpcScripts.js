// -------------------------------------------------------------------------------- \\
// Gathers relevant information from the checkboxes, send the API request to AWS, 
// and displays the resulting NPC when the 'Generate NPC' button is pressed.
// -------------------------------------------------------------------------------- \\
async function generateNPC() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/generatenpc";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Grab ancestries from HTML.
    var races = [];
    var raceCheckboxes = document.getElementsByName("ancestry-checkbox");
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
        "ages": ages.toString(),
        "system": "pf2e"
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

    // Grab ancestries from HTML.
    var races = [];
    var raceCheckboxes = document.getElementsByName("ancestry-checkbox");
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
        "ages": ages.toString(),
        "system": "pf2e"
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
// Selects/deselects all ancestries in the 'Common' section.
// -------------------------------------------------------------------------------- \\
function toggleCommonAncestries(source) {
    parent = document.getElementById("common-ancestry-fs");
    categoryBoxes = parent.querySelectorAll("[name='ancestry-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all ancestries in the 'Uncommon' section.
// -------------------------------------------------------------------------------- \\
function toggleUncommonAncestries(source) {
    parent = document.getElementById("uncommon-ancestry-fs");
    categoryBoxes = parent.querySelectorAll("[name='ancestry-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all ancestries in the 'Rare' section.
// -------------------------------------------------------------------------------- \\
function toggleRareAncestries(source) {
    parent = document.getElementById("rare-ancestry-fs");
    categoryBoxes = parent.querySelectorAll("[name='ancestry-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Selects/deselects all ancestries in the 'Versatile Heritages' section.
// -------------------------------------------------------------------------------- \\
function toggleVersatileAncestries(source) {
    parent = document.getElementById("versatile-ancestry-fs");
    categoryBoxes = parent.querySelectorAll("[name='ancestry-checkbox']");
    for (var i=0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Toggles the races for the selected source book.
// -------------------------------------------------------------------------------- \\
function toggleSourceRaces(source) {
    if (source.value == "pf2ecrb") {
        document.getElementById("dwarf").checked = source.checked;
        document.getElementById("elf").checked = source.checked;
        document.getElementById("gnome").checked = source.checked;
        document.getElementById("goblin").checked = source.checked;
        document.getElementById("half-elf").checked = source.checked;
        document.getElementById("half-orc").checked = source.checked;
        document.getElementById("halfling").checked = source.checked;
        document.getElementById("human").checked = source.checked;
    }
    else if (source.value == "pf2ecg") {
        document.getElementById("hobgoblin").checked = source.checked;
        document.getElementById("leshy").checked = source.checked;
        document.getElementById("lizardfolk").checked = source.checked;
    }
    else if (source.value == "pf2eapg") {
        document.getElementById("aasimar").checked = source.checked;
        document.getElementById("catfolk").checked = source.checked;
        document.getElementById("changeling").checked = source.checked;
        document.getElementById("dhampir").checked = source.checked;
        document.getElementById("duskwalker").checked = source.checked;
        document.getElementById("kobold").checked = source.checked;
        document.getElementById("orc").checked = source.checked;
        document.getElementById("ratfolk").checked = source.checked;
        document.getElementById("tengu").checked = source.checked;
        document.getElementById("tiefling").checked = source.checked;
    }
    else if (source.value == "pf2eag") {
        document.getElementById("android").checked = source.checked;
        document.getElementById("aphorite").checked = source.checked;
        document.getElementById("beastkin").checked = source.checked;
        document.getElementById("fetchling").checked = source.checked;
        document.getElementById("fleshwarp").checked = source.checked;
        document.getElementById("ganzi").checked = source.checked;
        document.getElementById("ifrit").checked = source.checked;
        document.getElementById("kitsune").checked = source.checked;
        document.getElementById("oread").checked = source.checked;
        document.getElementById("sprite").checked = source.checked;
        document.getElementById("strix").checked = source.checked;
        document.getElementById("suli").checked = source.checked;
        document.getElementById("sylph").checked = source.checked;
        document.getElementById("undine").checked = source.checked;
    }
    else if (source.value == "pf2etme") {
        document.getElementById("anadi").checked = source.checked;
        document.getElementById("conrasu").checked = source.checked;
        document.getElementById("gnoll").checked = source.checked;
        document.getElementById("goloma").checked = source.checked;
        document.getElementById("grippli").checked = source.checked;
        document.getElementById("shisk").checked = source.checked;
    }
    else if (source.value == "pf2egg") {
        document.getElementById("automaton").checked = source.checked;
    }
    else if (source.value == "pf2egb") {
        document.getElementById("poppet").checked = source.checked;
    }
    else if (source.value == "pf2eacolo") {
        document.getElementById("azarketi").checked = source.checked;
    }
    else if (source.value == "pf2ebotd") {
        document.getElementById("skeleton").checked = source.checked;
    }
    else if (source.value == "pf2eda") {
        document.getElementById("reflection").checked = source.checked;
    }
    else if (source.value == "pf2eil") {
        document.getElementById("ghoran").checked = source.checked;
        document.getElementById("kashrishi").checked = source.checked;
        document.getElementById("nagaji").checked = source.checked;
        document.getElementById("vanara").checked = source.checked;
        document.getElementById("vishkanya").checked = source.checked;
    }
}

// -------------------------------------------------------------------------------- \\
// Toggles the races for the selected campaign setting.
// -------------------------------------------------------------------------------- \\
function toggleSettingRaces(source) {
    if (source.value == "dark-sun") {
        document.getElementById("aarakocra").checked = source.checked;
        document.getElementById("dragonborn").checked = source.checked;
        document.getElementById("dwarf").checked = source.checked;
        document.getElementById("eladrin").checked = source.checked;
        document.getElementById("elf").checked = source.checked;
        document.getElementById("genasi-air").checked = source.checked;
        document.getElementById("genasi-earth").checked = source.checked;
        document.getElementById("genasi-fire").checked = source.checked;
        document.getElementById("genasi-water").checked = source.checked;
        document.getElementById("half-elf").checked = source.checked;
        document.getElementById("half-giant").checked = source.checked;
        document.getElementById("halfling").checked = source.checked;
        document.getElementById("human").checked = source.checked;
        document.getElementById("mul").checked = source.checked;
        document.getElementById("pterran").checked = source.checked;
        document.getElementById("thri-kreen").checked = source.checked;
        document.getElementById("tiefling").checked = source.checked;
    }
    else if (source.value == "dragonlance") {
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