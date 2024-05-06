document.addEventListener('DOMContentLoaded', function() {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const savedRecipesContainer = document.getElementById('saved-recipes');
    
    savedRecipesContainer.innerHTML = '';

    savedRecipes.forEach(recipe => {
        const recipeItem = document.createElement('article');
        const recipeLink = document.createElement('a');
        const recipeImage = document.createElement('img');
        const recipeId = recipe.id;
        const imageSize = '556x370';
        const imageType = 'jpg';
        const imageUrl = `https://img.spoonacular.com/recipes/${recipeId}-${imageSize}.${imageType}`;
        recipeLink.href = `recipe.html?id=${recipe.id}`;
        recipeLink.textContent = `Recipe ${recipe.name}`;
        recipeImage.src = imageUrl;
        recipeImage.alt = recipe.title;
        recipeItem.appendChild(recipeImage);
        recipeItem.appendChild(recipeLink);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #630000;"></i>';
        deleteButton.addEventListener('click', function() {
            const updateRecipes = savedRecipes.filter(savedRecipe => savedRecipe.id !== recipe.id || savedRecipe.name !== recipe.name);
            localStorage.setItem('savedRecipes', JSON.stringify(updateRecipes));
            savedRecipesContainer.removeChild(recipeItem);
            updateRecipes();
        });

        recipeItem.appendChild(deleteButton);

        savedRecipesContainer.appendChild(recipeItem);
    });

});

