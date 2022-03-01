const searchButton = document.getElementById('search-button');
const searchField = document.getElementById('search-field');
const phoneCards = document.getElementById('phone-cards');

searchButton.addEventListener('click', () => {
    const searchText = searchField.value;
    if (searchText) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(results => displayResults(results, searchText))
    } else {
        phoneCards.innerHTML = `<p class="text-center mx-auto">Please enter a phone name!</p>`;
    }
})

const displayResults = (results, searchText) => {
    const arr = results.data;

    phoneCards.textContent = '';
    if (arr.length == 0) {
        phoneCards.innerHTML = `<p class="text-center mx-auto">No results found for <strong>${searchText}! &nbsp;  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </svg></strong>
        <br>Please try again!</p>`;
    } else {
        arr.forEach(element => {
            const col = document.createElement('col');
            col.innerHTML = `<div class="card h-100 rounded-3">
                           <img src="${element.image}" class="img-fluid" alt="...">
                           <div class="card-body">
                               <h5 class="card-title">${element.phone_name}</h5>
                               <h6 class="fw-bold">Brand: ${element.brand}</h6>
                           </div>
                           <button class="btn btn-custom" id="${element.slug}" type="button" onclick="displayDetails(this)" data-bs-toggle="modal" data-bs-target="#phoneModal">Details  &nbsp;&nbsp;<i class="fa fa-arrow-right"></i> </button>
                        </div>`;
            phoneCards.appendChild(col);
        });
    }
}

const displayDetails = (phoneId) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId.id}`)
        .then(res => res.json())
        .then(results => {
            // console.log(results);
            const modalDetails = document.getElementById('modal-details');
            modalDetails.innerHTML = `
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>`;
        })
}