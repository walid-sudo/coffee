document.addEventListener("DOMContentLoaded", function() {
  let currentCoffeeIndex = 0;
  let coffees = [];

  fetch("https://cofee.onrender.com/coffees")
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          if (!Array.isArray(data) || data.length === 0) {
              throw new Error("Invalid data format!");
          }

          coffees = data;
          displayCoffee(coffees[currentCoffeeIndex]);

          // Add event listener for the "Next" button
          document.getElementById("next-button").addEventListener("click", function() {
              currentCoffeeIndex = (currentCoffeeIndex + 1) % coffees.length;
              displayCoffee(coffees[currentCoffeeIndex]);
          });
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });

  function displayCoffee(coffee) {
      const coffeeContainer = document.getElementById("coffee-container");
      coffeeContainer.innerHTML = `
          <h2>${coffee.name}</h2>
          <img class="coffee-image" src="${coffee.image}" alt="${coffee.name}">
          <p>${coffee.description}</p>
      `;
  }
});