
function searchRecipes(searchTerm) {
    const apiKey = '700d3417fb974b6e87b1c67bfc21908f';
    const apiUrl = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${searchTerm}&number=10`;

    fetch(apiUrl)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud de la API');
        })
        .then(data => {
            displayRecipes(data.results);
        })
        .catch(error => {
            console.log.error('Error:', error);
        });
}

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');
    
        // Imagen de la receta
        const recipeImage = document.createElement('img');
        const recipeId = recipe.id;
        const imageSize = '556x370';
        const imageType = 'jpg';
        const imageUrl = `https://img.spoonacular.com/recipes/${recipeId}-${imageSize}.${imageType}`;
        recipeImage.src = imageUrl;
        recipeImage.alt = recipe.title;
        recipeCard.appendChild(recipeImage);

        // Nombre de la receta
        const recipeTitleLink = document.createElement('a');
        recipeTitleLink.textContent = recipe.title;
        recipeTitleLink.href = `recipe.html?id=${recipe.id}`;
        recipeTitleLink.classList.add('recipe-title');
        recipeCard.appendChild(recipeTitleLink);

        resultsContainer.appendChild(recipeCard);
    });
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value;
    if(searchTerm.trim() != '') {
        searchRecipes(searchTerm);
    }
})

