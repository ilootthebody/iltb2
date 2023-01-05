async function generateNPC() {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/generatenpc";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({
        "future": "NONE"
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

async function regenField(field) {
    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/iltbregenfield";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
        }
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