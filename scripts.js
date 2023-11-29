let player = {
    name: "Commander",
    spacebux: 0,
    populationCraft: 0 
}
let commanderFallen = false
let turn = 0
let timer
let gameStarted = false
let turnsSinceLastAction = 0

let planetArray = [
    { name:`${player.name}`, spacebux: `${player.spacebux}`, populationCraft: `${player.populationCraft}`},
    { name: "Rival Planet 1", spacebux: 0, populationCraft: 0 },
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
    spacebuxDisplay.textContent = `${player.spacebux} ╬ `;
}

function updatePopulationCraftDisplay(player) {
    const craftDisplay = document.getElementById("populationCraftCount");
        craftDisplay.textContent = `${player.populationCraft} Population Crafts `;
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
        updatePlanets(); 
    }, 500); 
    
    gameStarted = true;
}
}
displayPlanets()

const understandBtn = document.getElementById("understandBtn");
understandBtn.addEventListener("click", () => {
  startGame();
  const overlay = document.getElementById("overlay");
  overlay.classList.add("hidden"); 
});

const buyCraftBtn = document.getElementById("buyCraftBtn");
buyCraftBtn.addEventListener("click", () => {
  if (player.spacebux >= 5) {
    player.spacebux -= 5;
    player.populationCraft++;
    updateSpacebuxDisplay();
    updatePopulationCraftDisplay(player);
  } else {
    addToActionLog("Not enough Spacebux to buy a population craft!");
  }
});

function updatePlanets() {
    turnsSinceLastAction++

    if(turnsSinceLastAction>2){
        takeRandomAction()
        takeRandomAction()
        takeRandomAction()
        turnsSinceLastAction=0
    }

    planetArray.forEach((planet) => {
        if(!planet.fallen){
        planet.spacebux++

        const planetCard = document.getElementById(planet.name.replace(/ /g, "_"));
        if (planetCard) {
          const spacebuxDisplay = planetCard.querySelector("p");
          if (spacebuxDisplay) {
            spacebuxDisplay.textContent = `Spacebux: ${planet.spacebux} ╬ `;
            if (planet.spacebux < 0){
                planetCard.classList.add("conqueredPlanet")
                replaceWithConqueredText(planetCard)
                planet.fallen = true
                addToActionLog(`${planet.name} has fallen!`)
                if (planet.name === 'Commander' && !commanderFallen) {
                    commanderFallen = true;
                    checkWinCondition();
                    alert("Commander has fallen! We've lost Earth!")
                }
                checkWinCondition()
            }
          }}}
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
    planetSpacebux.textContent = `Spacebux: ${planet.spacebux} ╬ `;
    planetSpacebux.classList.add("spacebux-count"); 
  
    const planetPopulationCraft = document.createElement("p");
    planetPopulationCraft.textContent = ` Population Craft: ${planet.populationCraft}`;
    planetPopulationCraft.classList.add("population-craft-count")
  
    card.appendChild(planetName);
    card.appendChild(planetSpacebux);
    card.appendChild(planetPopulationCraft);
    
    rivalSection.appendChild(card);

    card.addEventListener("click", () => sendPopulationCraft(player,planet))
}

function sendPopulationCraft(sender, target) {
    if(sender.populationCraft>0 && sender.spacebux>9){
        sender.populationCraft --
        sender.spacebux -=10
        target.spacebux -=30
        updateSpacebuxDisplay()
        updatePopulationCraftDisplay(sender);
        updatePlanets()
        addToActionLog(`${sender.name}'s population craft has successfully hit target ${target.name}!`)
    } else {
        addToActionLog(`Hey ${sender.name}, get 10 spacebux and at least 1 population craft before trying to send it out!`)
    }
}

function displayPlanets() {
    planetArray.forEach((planet) => {
        createRivalCard(planet);
    });
}

function replaceWithConqueredText(planetCard) {
    const conqueredText = document.getElementById("conqueredPlanet").innerHTML;
    planetCard.innerHTML = conqueredText;
  }

function checkWinCondition() {
    const remainingPlanets = planetArray.filter((planet) => !planet.fallen)
    if (remainingPlanets.length === 1) {
        const winner = remainingPlanets[0]
        clearInterval(timer); 
        if(winner.name === 'Commander'){
        addToActionLog(`Congratulations Commander! The last of the alien planets have been conquered!`)
        alert(`Congratulations Commander! The last of the alien planets have been conquered!`);
        } else{
        addToActionLog(`${winner.name} is the last planet standing and wins the game!`)
        alert(`${winner.name} is the last planet standing and wins the game!`);
        }
    }
}


function takeRandomAction() {
    const activePlanets = planetArray.filter((planet) => !planet.fallen && planet.name !== player.name); // Exclude the commander planet

    const randomPlanetIndex = Math.floor(Math.random() * activePlanets.length);
    const randomPlanet = activePlanets[randomPlanetIndex];

    const randomAction = Math.random() < 0.5 ? 'buyCraft' : 'launchCraft'; 

    if (randomAction === 'buyCraft') {
        buyCraftAction(randomPlanet);
    } else if (randomAction === 'launchCraft') {
        const activeTargets = planetArray.filter((target) => !target.fallen && target !== randomPlanet);
        const randomTargetIndex = Math.floor(Math.random() * activeTargets.length);
        const randomTarget = activeTargets[randomTargetIndex];

        sendPopulationCraft(randomPlanet, randomTarget);
    }
}

function buyCraftAction(planet) {
    if (planet.spacebux >= 5) {
        planet.spacebux -= 5;
        planet.populationCraft++;
        updateRivalPopulationCraftDisplay(planet)
        return true;
    }
    return false; 
}

function updateRivalPopulationCraftDisplay(planet) {
    const planetCard = document.getElementById(planet.name.replace(/ /g, "_"));
    if (planetCard) {
        const craftDisplay = planetCard.querySelector(".population-craft-count");
        if (craftDisplay) {
            craftDisplay.textContent = ` Population Craft: ${planet.populationCraft}`;
        }
    }
}

function addToActionLog(message) {
    const logContent = document.getElementById('logContent');
    const logMessage = document.createElement('p');
    logMessage.textContent = message;
    logContent.appendChild(logMessage);
}