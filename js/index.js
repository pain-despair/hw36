const jokesCategoriesSelect = document.getElementById('jokesCategories');
const jokesList = document.getElementById('jokesList');


fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(categories => {
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            jokesCategoriesSelect.appendChild(option);
        });
    });


function renderJoke(category, joke) {
    const li = document.createElement('li');
    const categoryParagraph = document.createElement('p');
    const jokeParagraph = document.createElement('p');
    const removeButton = document.createElement('button');

    categoryParagraph.innerHTML = `Category: <b>${category}</b>`;
    jokeParagraph.textContent = joke.value;
    removeButton.textContent = 'Remove joke';

    li.appendChild(categoryParagraph);
    li.appendChild(jokeParagraph);
    li.appendChild(removeButton);
    jokesList.appendChild(li);

    
    removeButton.addEventListener('click', () => {
        li.remove();
        
        const selectedOption = document.querySelector(`#jokesCategories option[value="${category}"]`);
        selectedOption.disabled = false;
    });
}


jokesCategoriesSelect.addEventListener('change', () => {
    const selectedCategory = jokesCategoriesSelect.value;
    
    fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`)
        .then(response => response.json())
        .then(joke => {
            
            renderJoke(selectedCategory, joke);
            
            const selectedOption = document.querySelector(`#jokesCategories option[value="${selectedCategory}"]`);
            selectedOption.disabled = true;
        });
});