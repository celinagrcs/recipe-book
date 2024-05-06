// Función para obtener el ID de la receta de la URL
function getRecipeIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// Función para obtener los detalles de una receta por su ID
function getRecipeDetails(recipeId) {
    const apiKey = '700d3417fb974b6e87b1c67bfc21908f'; 
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud de la API');
        })
        .then(data => {
            displayRecipeDetails(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Función para mostrar los detalles de la receta en la página
function displayRecipeDetails(recipe) {
    const recipeDetailsContainer = document.getElementById('recipe-details');
    recipeDetailsContainer.innerHTML = '';

    // Título de la receta
    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = recipe.title;
    recipeDetailsContainer.appendChild(recipeTitle);


    // Imagen de la receta
    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;
    recipeDetailsContainer.appendChild(recipeImage);

    // Detalles 
    const recipeDetails = document.createElement('p');
    recipeDetails.innerHTML = `<i class="fa-regular fa-clock" style="color: #630000;"></i> ${recipe.readyInMinutes} minutes`;
    recipeDetailsContainer.appendChild(recipeDetails);

    // Ingredientes
    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.textContent = 'Ingredients:';
    recipeDetailsContainer.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement('ul');
    recipe.extendedIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient.original;
        ingredientsList.appendChild(ingredientItem);
    });
    recipeDetailsContainer.appendChild(ingredientsList);

    // Instrucciones
    const instructionsTitle = document.createElement('h3');
    instructionsTitle.textContent = 'Instructions';
    recipeDetailsContainer.appendChild(instructionsTitle);

    const instructionsList = document.createElement('ol');
    if(recipe.analyzedInstructions.length > 0) {
        recipe.analyzedInstructions[0].steps.forEach(step => {
            const instructionItem = document.createElement('li');
            instructionItem.textContent = step.step;
            instructionsList.appendChild(instructionItem);
        });
    } else {
        const noInstructionsMessage = document.createElement('p');
        noInstructionsMessage.textContent = "No instructions available.";
        recipeDetailsContainer.appendChild(noInstructionsMessage);
    }
    
    recipeDetailsContainer.appendChild(instructionsList);
}

document.addEventListener('DOMContentLoaded', function() {
    const recipeId = getRecipeIdFromURL();
    if(recipeId) {
        getRecipeDetails(recipeId);
    }
});


function saveCurrentRecipe() {
    const recipeId = getRecipeIdFromURL();
    const recipeTitle = document.querySelector('h2').textContent; 
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    const existingRecipe = savedRecipes.find(recipe => recipe.id === recipeId);
    if (!existingRecipe) {
        savedRecipes.push({ id: recipeId, name: recipeTitle }); 
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        alert('Recipe saved successfully.');
    } else {
        alert('This recipe is already saved.');
    }
}
