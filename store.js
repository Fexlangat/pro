document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("inputName");
    const searchBtn = document.getElementById("button");
    const msgDiv = document.getElementById("msg");
    const detailsDiv = document.getElementById("details");
    const itemsDiv = document.getElementById("items");
  
    // Function to fetch data from db.json file
    const fetchMeals = async () => {
      try {
        const response = await fetch("db.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data.recipes;
      } catch (error) {
        console.error(error);
        msgDiv.style.display = "block";
        msgDiv.textContent = "Failed to fetch meals. Please try again later.";
        return [];
      }
    };
  
    // Function to display meals based on search query
    const displayMeals = async (searchTerm) => {
      const meals = await fetchMeals();
      const filteredMeals = meals.filter((meal) =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (filteredMeals.length === 0) {
        msgDiv.style.display = "block";
        msgDiv.textContent = "No meals found. Please try another search term.";
        detailsDiv.innerHTML = "";
        itemsDiv.innerHTML = "";
      } else {
        msgDiv.style.display = "none";
        detailsDiv.innerHTML = "";
        itemsDiv.innerHTML = "";
        filteredMeals.forEach((meal) => {
          const mealDiv = document.createElement("div");
          mealDiv.classList.add("singleItem");
          mealDiv.innerHTML = `
            <img src="${meal.image}" alt="${meal.name}" />
            <p>${meal.recipe}</p>
          `;
          mealDiv.addEventListener("click", () => displayMealDetails(meal));
          itemsDiv.appendChild(mealDiv);
        });
      }
    };
  
    // Function to display meal details
    const displayMealDetails = (meal) => {
      detailsDiv.innerHTML = `
        <h3>${meal.name}</h3>
        <img src="${meal.image}" alt="${meal.name}" />
        <p>Category: ${meal.category}</p>
        <p>Area: ${meal.area}</p>
        <p>Instructions: ${meal.instructions}</p>
      `;
    };
  
    // Event listener for search button click
    searchBtn.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        displayMeals(searchTerm);
      }
    });
  });
  