// search btn
document.getElementById("button").addEventListener("click", () => {
 //input value
  let inputValue = document.getElementById("inputName").value;

  // Fetch data from the meal API based on the search input value
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response => response.json()) 
    .then(data => { 
      // When the data is received from the API...
      const items = document.getElementById("items"); 
      // creating  containr for displaying meal items
      items.innerHTML = "";

      // If the food searched aint available show a msg
      if (data.meals == null) {
        document.getElementById("msg").style.display = "block";
      } else {
         // If meals searched are available
        
        document.getElementById("msg").style.display = "none";
        
        // itarate through each meal in the data
        data.meals.forEach(meal => {
          // Create a div element to represent each meal item
          let itemDiv = document.createElement("div");
          itemDiv.className = "singleItem"; 
        
          itemDiv.setAttribute("onclick", `details('${meal.idMeal}')`); 
          // Add click event listener to show meal details
          let itemInfo = `
                    <div class="card " style="width: 12rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <h5 class="card-text">${meal.strMeal}</h5>
                        </div>
                    </div>
                    `; // HTML structure to display meal image and name
          itemDiv.innerHTML = itemInfo; // Set the HTML content for the meal item
          items.appendChild(itemDiv); // Append the meal item to the container
        });
      }
    });
});

// Function to fetch and display details of a selected meal
function details(id) {
  // Fetch details of the meal based on its ID
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json()) // Parse the response as JSON
    .then(detail => { // When the detail data is received from the API...
      let meal = detail.meals[0]; // Get the first meal from the detail data
      let details = document.getElementById("details"); // Get the container for displaying meal details
      details.innerHTML = ""; // Clear any previous meal details from the container
      let detailsDiv = document.createElement("div"); // Create a div element for the meal details
      let detailsInfo = `
        <div class="card " style="width: 19rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h3 class="card-text">${meal.strMeal}</h3>
                <h6>Ingredients</h6>
                <ul>
                    <li>${meal.strArea}</li>
                    <li>${meal.strCategory}</li>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                </ul>
            </div>
        </div>
        `; // HTML structure to display meal details including image, name, and ingredients
      detailsDiv.innerHTML = detailsInfo; // Set the HTML content for the meal details
      details.appendChild(detailsDiv); // Append the meal details to the container
    });
}
