const form = document.getElementById('form');
const main = document.querySelector('main');
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const searchInput = document.getElementById('search-input');
getMovie(apiUrl)
function renderMovies(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;
        let element = document.createElement('div');
        element.classList.add('card');
        element.innerHTML += `
        <img src="${IMGPATH + poster_path}">
        <div class="card-footer">
        <h3>${title}</h3>
        <span class="${checkVote(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview:</h3>
        ${overview}
        </div>
        `

        main.insertAdjacentElement('beforeend', element);


    })

}



async function getMovie(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        renderMovies(data.results);

    } catch (err) {
        console.log(err);
    }
}


function checkVote(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red'
    }

}
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = searchInput.value;

    if (searchTerm) {
        getMovie(SEARCHAPI + searchTerm);

        searchInput.value = "";
    }
});

const input = document.querySelector('.input');
input.addEventListener('change', DarkandLightMode);
function DarkandLightMode() {
    if (input.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        console.log('a')
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

}