const searchButton = document.getElementById('search-button');
const searchField = document.getElementById('search-field');
const phoneCards = document.getElementById('phone-cards');
const parentPhoneCards = document.getElementById("parent-phone-cards");
const seeMoreButton = document.getElementById('see-more-button');
const seeMoreButtonDiv = document.getElementById('see-more-button-div');
const seeMoreDiv = document.getElementById('see-more-div');
const dummyDiv = document.getElementById('dummy-div');
const spinner = document.getElementById('spinner');


searchButton.addEventListener('click', () => {
    spinner.style.display = "block";
    const searchText = searchField.value.toLowerCase();
    if (searchText) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(results => displayResults(results, searchText))
    } else {
        phoneCards.innerHTML = `<p class="text-center mx-auto">Please enter a phone name!</p>`;
    }
})

//display results based on search
const displayResults = (results, searchText) => {
        spinner.style.display = "none";
        const arr = results.data;
        // console.log(arr);
        phoneCards.textContent = '';
        seeMoreDiv.textContent = '';
        dummyDiv.style.display = 'none';
        if (arr.length == 0) {
            phoneCards.innerHTML = `<p class="text-center mx-auto">No results found for <strong>${searchText}! &nbsp;  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </svg></strong>
        <br>Please try again!</p>`;
        } else {
            for (let i = 0; i < arr.length; i++) {
                const col = document.createElement('col');
                col.innerHTML = `<div class="card h-75 rounded-3">
            <img src="${arr[i].image}" class="img-fluid h-100 pt-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${arr[i].phone_name}</h5>
                <h6 class="fw-bold">Brand: ${arr[i].brand}</h6>
            </div>
            <button class="btn btn-custom" id="${arr[i].slug}" type="button" onclick="displayDetails(this)" data-bs-toggle="modal" data-bs-target="#phoneModal">Details  &nbsp;&nbsp;<i class="fa fa-arrow-right"></i> </button>
         </div>`;

                if (i === 19 && arr.length > 19) {
                    seeMoreButtonDiv.style.display = 'block';
                }
                if (i <= 19) {
                    phoneCards.appendChild(col);
                } else {
                    seeMoreDiv.appendChild(col);
                }
            }
            seeMoreButton.addEventListener("click", () => {
                dummyDiv.style.display = 'block';
                seeMoreButtonDiv.style.display = 'none';
            });
        }
    }
    //display mobile details
const displayDetails = (phoneId) => {
        fetch(`https://openapi.programming-hero.com/api/phone/${phoneId.id}`)
            .then(res => res.json())
            .then(results => {
                const arr = results.data;
                // console.log(arr);
                let releaseDate = arr.releaseDate;
                let mainFeatures = arr.mainFeatures;
                let otherFeatures = arr.others;
                if (!releaseDate) {
                    releaseDate = "Not Available";
                }
                const modalDetails = document.getElementById('modal-details');
                modalDetails.innerHTML = `
            <div class="modal-header">
            <h5 class="modal-title"><strong>${arr.brand} ${arr.name}</strong></h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-lg-flex d-block g-3">
            <div class="image h-auto mx-auto d-flex align-items-center justify-content-center "> 
                <img src="${arr.image}" class="img-thumbnail" alt="Image of a Phone">
            </div>
            <div class="details h-auto my-2 ms-3">
                <p class="mb-1 d-inline-block text-muted"> <strong>Release Date:</strong> ${releaseDate}</p><br>
                <h6 class="mb-1 d-inline-block"><strong>Main Features</strong></h6><br>
                <small>
                <strong>Storage:</strong> ${mainFeatures?.storage??"Not Available"}<br>
                <strong>Display Size:</strong> ${mainFeatures?.displaySize??"Not Available"}<br>
                <strong>Chipset:</strong> ${mainFeatures?.chipSet??"Not Available"}<br>
                <strong>Memory:</strong> ${mainFeatures?.memory??"Not Available"}<br>
                <strong>Sensors:</strong> ${mainFeatures?.sensors.join(", ")??"Not Available"}<br>
                </small>
                <h6 class="my-1  d-inline-block"><strong>Others</strong></h6><br>
                <small>
                <strong>WLAN:</strong> ${otherFeatures?.WLAN??"Not Available"}<br>
                <strong>Bluetooth:</strong> ${otherFeatures?.Bluetooth??"Not Available"}<br>
                <strong>GPS:</strong> ${otherFeatures?.GPS??"Not Available"}<br>
                <strong>NFC:</strong> ${otherFeatures?.NFC??"Not Available"}<br>
                <strong>Radio:</strong> ${otherFeatures?.Radio??"Not Available"}<br>
                <strong>USB:</strong> ${otherFeatures?.USB??"Not Available"}<br>
                </small>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>`;
            })
    }
    // <h5><strong>${arr.brand} ${arr.name}</strong></h5>