// SGN
const submit = document.getElementById('submit');
const currentImageContainer = document.getElementById("current-image-container");
const currentDate = new Date().toISOString().split("T")[0];

// const searchDate = new Date(searchInput).toISOString().split("T")[0];

let imgSearched = JSON.parse(localStorage.getItem('date')) || [];



function getCurrentImageOfTheDay() {
  const img = document.getElementById("img");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const pictureOn = document.getElementById("pictureOn");


  fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=wHLkZUpdwTqSPHgt0z2s6g58K5LLolqVFBUuKzZi`)
  .then(response => response.json())
  .then(data => {

      pictureOn.innerHTML = `<h2> NASA Picture Of the Day </h2>`;
      img.src = data.url;
      img.alt = data.title;
      title.textContent = data.title;

      desc.textContent = data.explanation;
    })
    .catch(e => {
      console.error("Error: ", e);
      currentImageContainer.innerHTML = "<p>Failed to load image of the day. Please try again later.</p>";
    });
}



// Function getImageOfTheDay
function getImageOfTheDay(date){

  const dateInput = new Date(date).toISOString().split("T")[0];

  const img = document.getElementById("img");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const pictureOn = document.getElementById("pictureOn");



  fetch(`https://api.nasa.gov/planetary/apod?date=${dateInput}&api_key=wHLkZUpdwTqSPHgt0z2s6g58K5LLolqVFBUuKzZi`)
    .then(response => response.json())
    .then(data => {

      pictureOn.innerHTML = `<h2>Picture on ${dateInput} </h2>`;
      img.src = data.url;
      img.alt = data.title;
      title.textContent = data.title;
      desc.textContent = data.explanation;

      // Save Date in Local LocalStorage
     saveSearch(dateInput);

      // Show in search History ul
      addSearchToHistory(dateInput);

    })
    .catch(e => {
      console.error("Error: ", e);
      currentImageContainer.innerHTML = "<p>Failed to load image of the day. Please try again later.</p>";
    });

}



function saveSearch(date){

  if(!imgSearched.includes(date)){
    console.log("Adding date to search history:", date);
    imgSearched.push(date);
    const imgSearchedString = JSON.stringify(imgSearched);
    localStorage.setItem('date', imgSearchedString);
  } else {
    console.log("Date already exists in search history:", date);
  }
}

function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");
  const existingItem = Array.from(searchHistory.getElementsByTagName('li')).find(item => item.textContent === date);

  if (!existingItem) {
    // Only add the list element if it doesn't already exist
    const sHElement = document.createElement('li');
    sHElement.textContent = date;
    sHElement.addEventListener('click', () => {
      getImageOfTheDay(date);
    });
    searchHistory.appendChild(sHElement);
  } else {
    console.log("Date already exists in search history:", date);
  }
}

function renderDates() {
  imgSearched.forEach(date => addSearchToHistory(date));
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentImageOfTheDay();
  renderDates();
});

document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);
submit.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
  const searchInput = document.getElementById("search-input").value;
  getImageOfTheDay(searchInput);
  document.getElementById("search-input").value = ""; // Clear the date field after submission
});

renderDates();
