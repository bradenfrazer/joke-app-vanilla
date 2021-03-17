/* working with DOM elements */
const status = document.getElementById('status');
const jokeViewer = document.getElementById('jokeViewer');
const joke = document.getElementById('joke');
const punchline = document.getElementById('punchline');
const punchlineContainer = document.getElementById('punchlineContainer');
const togglebutton = document.getElementById('toggleButton');

/* saving the API url */
const api_url = "https://official-joke-api.appspot.com/random_joke";

/* create object for the XHR request */
const xhr = new XMLHttpRequest();

/* grabbing the joke data from the API */
function getJoke() {
  xhr.open('GET', api_url);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    /* loading */
    if(xhr.readyState < 4) {
        /* hide joke display */
        jokeViewer.style.display = "none";
        /* hide punchline for next joke if showing */
        punchlineContainer.style.display = "none";
        /* reset toggle button text */
        toggleButton.innerHTML = "Show Punchline";
        /* show loading status message */
        status.style.display = "block";
        status.innerHTML = "Loading your joke...";
    }
    /* loading complete */
    if (xhr.readyState == 4) {
      /* hide status message */
      status.style.display = "none";
      /* display joke viewer */
      jokeViewer.style.display = "flex";
    }
};
  xhr.onload = () => {
    /* if loading successful */
    if (xhr.status === 200) {
      var jokedata = xhr.response;
      //console.log(jokedata);
      joke.innerHTML = jokedata.setup;
      punchline.innerHTML = jokedata.punchline;
    }
    /* if loading unsuccessful, error */
    else {
      /* hide joke display */
        jokeViewer.style.display = "none";
      /* update status with error message */
      status.style.display = "block";
      status.style.color = "#dc3545"; //red color
      status.innerHTML = "There was an error loading your joke.";
    }
  }
  xhr.send();
}

/* handle show/hide of the punchline */
function togglePunchline() {
  if (punchlineContainer.style.display === "none") {
    punchlineContainer.style.display = "block";
    toggleButton.innerHTML = "Hide Punchline";
  }
  else {
    punchlineContainer.style.display = "none";
    toggleButton.innerHTML = "Show Punchline";
  }
}
