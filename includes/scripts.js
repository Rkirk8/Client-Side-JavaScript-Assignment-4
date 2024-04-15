// Add an event listener to the button
document.getElementById('randomCocktailBtn').addEventListener('click', function() {
    getRandomCocktail();
});

// Function to fetch and display a random cocktail
function getRandomCocktail() {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json()) 
        .then(data => {
            const cocktailData = document.getElementById('cocktailData');
            const drink = data.drinks[0];
            // Display the cocktail data
            cocktailData.innerHTML = `
                <h2>${drink.strDrink}</h2>
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <p>Category: ${drink.strCategory}</p>
                <p>Glass: ${drink.strGlass}</p>
                <p>Instructions: ${drink.strInstructions}</p>
                <p>Ingredients:</p>
                <ul>
                    ${getIngredientsList(drink)} // Call a function to generate a list of ingredients
                </ul>
            `;
        })
        // Handle any errors
        .catch(error => {
            console.error('Error fetching cocktail data:', error);
        });
}

// Function to generate a list of ingredients for a cocktail
function getIngredientsList(drink) {
    let ingredientsList = '';
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else if (ingredient) {
            ingredientsList += `<li>${ingredient}</li>`;
        }
    }
    // Return the generated list of ingredients
    return ingredientsList;
}
