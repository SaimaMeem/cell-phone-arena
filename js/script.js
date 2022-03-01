const searchButton = document.getElementById('search-button');
const searchField = document.getElementById('search-field');

searchButton.addEventListener('click', () => {
    const searchText = searchField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(results => displayResults(results))
})

const displayResults = (results) => {
    console.log(results);
}