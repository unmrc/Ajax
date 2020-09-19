let searchElement: HTMLInputElement = document.getElementById('search') as HTMLInputElement;
searchElement.addEventListener('change', Ajax);
let currentPage = 1;

function Ajax() {
    let url = 'http://www.omdbapi.com/?apikey=a5a1b624';
    let s = searchElement.value;
    url += '&s=' + s;
    // url += '&page=' + currentPage;
    
    fetch(url)
        .then(response => response.json())
        .then(myJson => {
            OutputElements(myJson);
        })
}

Ajax();
interface Movie {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}

function OutputElements(myJson) {
    
    let films = document.getElementById('films');
    films.innerHTML = '';
    let movies: Movie [] = myJson.Search;
    console.log(myJson)
    for (let i = 0; i < movies.length; i++) {
        const element = movies[i];
        let divCard = document.createElement('div');
        let divNogutters = document.createElement('div');
        let divCol4 = document.createElement('div');
        let img = document.createElement('img');
        let divCol8 = document.createElement('div');
        let divCardBody = document.createElement('div');
        let h5 = document.createElement('h5');
        let p = document.createElement('p');
        let a = document.createElement('a');
        img.src = element.Poster;
        divCard.appendChild(divNogutters);
        divCard.classList.add('col-6', 'card', 'mb-3');
        divNogutters.classList.add('row', 'no-gutters');
        divNogutters.appendChild(divCol4);
        divCol4.classList.add('col-md-4');
        divCol4.appendChild(img);
        img.classList.add('card-img');
        // img.style.objectFit = 'cover';
        // img.style.height = '100%';
        divNogutters.appendChild(divCol8);
        divCol8.classList.add('col-md-8');
        divCol8.appendChild(divCardBody);
        divCardBody.classList.add('card-body');
        divCardBody.appendChild(h5);
        h5.classList.add('card-title');
        h5.textContent = element.Title;
        divCardBody.appendChild(p);
        p.classList.add('card-text');
        p.textContent = element.Year;
        divCardBody.appendChild(a);
        a.classList.add('btn', 'btn-primary');
        a.textContent = 'More...';
        films.appendChild(divCard);
        a.addEventListener('click', () => { AjaxMovie(element.imdbID) })
        
    }
}

function AjaxMovie(id) {
    let url = `http://www.omdbapi.com/?apikey=a5a1b624`;
    url += '&i=' + id
    fetch(url)
    .then(response => response.json())
    .then(myJson => {
        console.log(myJson)
    })
};
