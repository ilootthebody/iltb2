// -------------------------------------------------------------------------------- \\
// Gets the selected categories from the form, sends the API request to AWS,
// and formats/displays the generated item(s).
// -------------------------------------------------------------------------------- \\
async function getTreasure() {
    // Grab treasure type from HTML
    var i = document.getElementById("treasure_type");
    var treasureType = i.options[i.selectedIndex].text;

    // Grab CR from HTML
    var e = document.getElementById("cr");
    var cr = e.options[e.selectedIndex].text;

    const API_URL = "https://l3ks5hv18d.execute-api.us-east-2.amazonaws.com/dev/dnd5e-treasure-generator";

    // Instantiate and populate header.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // create JSON objects with parameters and options for API call
    var raw = JSON.stringify({
        "type": treasureType,
        "cr": cr
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
    const treasure = JSON.parse(responseJSON.body);

    console.log(treasure);

    // Get lists from HTML
    var currencyList = document.getElementById("currency-list");
    var gemsArtList = document.getElementById("gems-art-list");
    var itemsList = document.getElementById("items-list");
    var currencyTotal = document.getElementById("currency-total");
    var gemsArtTotal = document.getElementById("gems-art-total");

    // Clear lists
    currencyList.innerHTML = "";
    gemsArtList.innerHTML = "";
    itemsList.innerHTML = "";
    currencyTotal.innerHTML = "";
    gemsArtTotal.innerHTML = "";

    // Set currency list items
    treasure.currency.forEach(element => {
        var li = document.createElement("li");
        li.innerHTML = element;
        currencyList.appendChild(li);
    });

    currencyTotal.innerHTML = "(" + treasure.totalGP + " gp total)";

    // Set gems and art list items
    treasure.gemsArt.forEach(element => {
        var li = document.createElement("li");
        li.innerHTML = element;
        gemsArtList.appendChild(li);
    });

    gemsArtTotal.innerHTML = "(" + treasure.gemArtGP + " gp total)";

    // Set items list items
    treasure.items.forEach(element => {
        var li = document.createElement("li");
        li.innerHTML = element;
        itemsList.appendChild(li);
    });


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