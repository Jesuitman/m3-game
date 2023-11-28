let player = {
    name: "Commander",
    spacebux: 0,
    populationCraft: 0
}
let turn = 0
let timer
let gameStarted = false

let rivalPlanets = [
    { name: "Rival Planet 1", spacebux: 0, populationCraft: 0},
    { name: "Rival Planet 2", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 3", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 4", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 5", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 6", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 7", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 8", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 9", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 10", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 11", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 12", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 13", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 14", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 15", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 16", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 17", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 18", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 19", spacebux: 0, populationCraft: 0 },
    { name: "Rival Planet 20", spacebux: 0, populationCraft: 0 },
];

function updateSpacebuxDisplay() {
    const spacebuxDisplay = document.getElementById("spacebuxAmount");
    spacebuxDisplay.textContent = `${player.spacebux} ╬`;
}

function updatePopulationCraftDisplay() {
    const craftDisplay = document.getElementById("populationCraftCount");
    craftDisplay.textContent = `${player.populationCraft} Population Crafts`;
}

function incrementSpacebux() {
    player.spacebux++;
    updateSpacebuxDisplay();
}

function startGame() {
    if (!gameStarted) {
      timer = setInterval(() => {
        turn++;
        incrementSpacebux();
        updateRivalPlanets(); // Function to update rival planets' actions
    }, 500); // 5 seconds per turn
    
    gameStarted = true;
}
}
displayRivalPlanets()

const understandBtn = document.getElementById("understandBtn");
understandBtn.addEventListener("click", () => {
  startGame(); // Start the game
  const overlay = document.getElementById("overlay");
  overlay.classList.add("hidden"); // Hide the overlay by adding the 'hidden' class
});

const buyCraftBtn = document.getElementById("buyCraftBtn");
buyCraftBtn.addEventListener("click", () => {
  if (player.spacebux >= 5) {
    player.spacebux -= 5;
    player.populationCraft++;
    updateSpacebuxDisplay();
    updatePopulationCraftDisplay();
  } else {
    // Handle insufficient spacebux
    console.log("Not enough Spacebux to buy a population craft!");
  }
});

function updateRivalPlanets() {
    rivalPlanets.forEach((planet) => {
        planet.spacebux++

        const planetCard = document.getElementById(planet.name.replace(/ /g, "_"));
        if (planetCard) {
          const spacebuxDisplay = planetCard.querySelector("p");
          if (spacebuxDisplay) {
            spacebuxDisplay.textContent = `Spacebux: ${planet.spacebux} ╬`;
      // Implement rival planet actions (e.g., increment spacebux, launch crafts, etc.)
      // You can use similar logic as used for the player's actions
          }}
    });
  }

  function createRivalCard(planet) {
    const rivalSection = document.getElementById("rivals");
    const card = document.createElement("div");
    card.classList.add("rival-planet-card");
    card.id = planet.name.replace(/ /g, "_"); // Set the ID for each card
  
    const planetName = document.createElement("h3");
    planetName.textContent = planet.name;
  
    const planetSpacebux = document.createElement("p");
    planetSpacebux.textContent = `Spacebux: ${planet.spacebux} ╬`;
    planetSpacebux.classList.add("spacebux-count"); // Add a class to spacebux count for targeting
  
    const planetPopulationCraft = document.createElement("p");
    planetPopulationCraft.textContent = `Population Craft: ${planet.populationCraft}`; 
  
    card.appendChild(planetName);
    card.appendChild(planetSpacebux);
    card.appendChild(planetPopulationCraft);
    
    rivalSection.appendChild(card);

    card.addEventListener("click", () => sendPopulationCraft(player,planet))
}

function sendPopulationCraft(sender, target) {
    if(sender.populationCraft>0 && sender.spacebux>10){
        sender.populationCraft --
        sender.spacebux -=10
        target.spacebux -=30
        updateSpacebuxDisplay()
        updatePopulationCraftDisplay();
    } else {
        console.log("Get 10 spacebux and at least 1 population craft before trying to send it out!")
    }
}

function displayRivalPlanets() {
    rivalPlanets.forEach((planet) => {
        createRivalCard(planet);
    });
}

