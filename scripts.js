let playerSpacebux = -1;
let populationCraftCount = 0;
let rivalPlanets = [
    { name: "Rival Planet 1", spacebux: 1 },
    { name: "Rival Planet 2", spacebux: 1 },
    { name: "Rival Planet 3", spacebux: 1 },
    { name: "Rival Planet 4", spacebux: 1 },
    { name: "Rival Planet 5", spacebux: 1 },
    { name: "Rival Planet 6", spacebux: 1 },
    { name: "Rival Planet 7", spacebux: 1 },
    { name: "Rival Planet 8", spacebux: 1 },
    { name: "Rival Planet 9", spacebux: 1 },
    { name: "Rival Planet 10", spacebux: 1 },
    { name: "Rival Planet 11", spacebux: 1 },
    { name: "Rival Planet 12", spacebux: 1 },
    { name: "Rival Planet 13", spacebux: 1 },
    { name: "Rival Planet 14", spacebux: 1 },
    { name: "Rival Planet 15", spacebux: 1 },
    { name: "Rival Planet 16", spacebux: 1 },
    { name: "Rival Planet 17", spacebux: 1 },
    { name: "Rival Planet 18", spacebux: 1 },
    { name: "Rival Planet 19", spacebux: 1 },
    { name: "Rival Planet 20", spacebux: 1 },
];


window.onload = function () {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'grid';

    const understandBtn = document.getElementById('understandBtn');
    understandBtn.addEventListener('click', function () {
        overlay.style.display = 'none';
        updateAllDisplays();
        setInterval(incrementSpacebux, 500);
    });
};

function updatePopulationCraftDisplay() {
    const populationCraftElement = document.getElementById('populationCraft');
    populationCraftElement.innerHTML = 
    `<h2>Your Population Craft Count</h2>
    <p>The amount of population craft you have: ${populationCraftCount}</p>`;
  }

  function updateSpacebuxDisplay() {
    const spacebuxElement = document.getElementById('spacebux');
    spacebuxElement.innerHTML = `
    <h2>Your Spacebux</h2>
    <p>This is the amount of Spacebux you have: ${playerSpacebux}╬</p>`;
  }

  function updateRivalPlanetsDisplay() {
    const rivalPlanetsSection = document.getElementById('rivals');
    const rivalPlanetsContent = rivalPlanets.map(planet => `
      <div class="rival-planet-card">
        <img src="planet_image.jpg" alt="Rival Planet Image" class="planet-image">
        <div class="planet-details">
          <h3>${planet.name}</h3>
          <p>Spacebux Count: ${planet.spacebux}╬</p>
        </div>
      </div>`).join('');
  
    rivalPlanetsSection.innerHTML = `<h2>Rival Planets</h2>${rivalPlanetsContent}`;
  }
  
  function updateRivalPlanetsSpacebux() {
    const rivalPlanetsSection = document.getElementById('rivals');
    const rivalPlanetElements = rivalPlanetsSection.getElementsByClassName('planet-details');
  
    rivalPlanets.forEach((planet, index) => {
      const planetElement = rivalPlanetElements[index];
      const spacebuxElement = planetElement.querySelector('p');
      spacebuxElement.textContent = `Spacebux Count: ${planet.spacebux}╬`;
    });
  }

  function updateAllDisplays() {
    updateSpacebuxDisplay();
    updatePopulationCraftDisplay();
    updateRivalPlanetsDisplay();
  }
  
  function launchSpacecraft(targetPlanetIndex) {
    if (!gameOver && playerSpacebux >= 10) {
      updatePlayerSpacebux(-10);

      const randomIndex = Math.floor(Math.random() * planets.length);
      const hitPlanetIndex = targetPlanetIndex !== undefined ? targetPlanetIndex : randomIndex;

      if (hitPlanetIndex !== undefined) {
        const hitPlanet = planets[hitPlanetIndex];
        hitPlanet.spacebux -= 30;
        if (hitPlanet.spacebux < 0) {
          hitPlanet.spacebux = 0;
          gameOver = true;
          alert(`Planet ${hitPlanetIndex + 1} is out of Spacebux. Game Over!`);
        }
      }
    }
  }

  function purchasePopulationCraft() {
    if (!gameOver && playerSpacebux >= 5) {
      updatePlayerSpacebux(-5);
    }
  }

  function updatePlayerSpacebux(amount) {
    playerSpacebux += amount;
    if (playerSpacebux < 0) {
      playerSpacebux = 0;
      gameOver = true;
      alert('You are out of Spacebux. Game Over!');
    }
    document.getElementById('playerSpacebux').textContent = playerSpacebux;
  }

  function simulateAIActions() {
    const aiPurchaseChance = 0.5; // Probability of AI buying a population craft
    const aiLaunchChance = 0.6; // Probability of AI launching spacecraft

    planets.forEach((planet, index) => {
      const shouldPurchase = Math.random() < aiPurchaseChance;
      const shouldLaunch = Math.random() < aiLaunchChance;

      if (shouldPurchase && planet.spacebux >= 5) {
        planet.spacebux -= 5;
      }

      if (shouldLaunch && planet.spacebux >= 10) {
        const targetPlanetIndex = Math.floor(Math.random() * planets.length);
        launchSpacecraft(targetPlanetIndex);
      }
    });
  }

  // Run AI actions periodically (for demonstration purposes)
  function incrementSpacebux() {
      playerSpacebux += 1;
      updateSpacebuxDisplay();
      updateRivalPlanetsSpacebux()
      // Increment spacebux for rival planets
      rivalPlanets.forEach(planet => {
          planet.spacebux += 1;
        });
        updateRivalPlanetsDisplay();
    }
    setInterval(simulateAIActions, 3000); // Adjust the interval as needed