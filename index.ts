let searchElement: HTMLInputElement = document.getElementById('search') as HTMLInputElement;
let selectType: HTMLInputElement = document.getElementById('type') as HTMLInputElement;
let currentPage = 1;
searchElement.addEventListener('change', () => {
    Ajax();
    currentPage = 1;
});
selectType.addEventListener('change', () => {
    Ajax();
    currentPage = 1;
});
let totalResults: number;
let pagesQuantity: number;

let prevButton: HTMLInputElement = document.getElementById('prev-button') as HTMLInputElement;
let prev: HTMLInputElement = document.getElementById('prev') as HTMLInputElement;
let numOne: HTMLInputElement = document.getElementById('numOne') as HTMLInputElement;
let numTwo: HTMLInputElement = document.getElementById('numTwo') as HTMLInputElement;
let numThree: HTMLInputElement = document.getElementById('numThree') as HTMLInputElement;
let numOneButton: HTMLInputElement = document.getElementById('numOneButton') as HTMLInputElement;
let numTwoButton: HTMLInputElement = document.getElementById('numTwoButton') as HTMLInputElement;
let numThreeButton: HTMLInputElement = document.getElementById('numThreeButton') as HTMLInputElement;
let next: HTMLInputElement = document.getElementById('next') as HTMLInputElement;
let nextButton: HTMLInputElement = document.getElementById('next-button') as HTMLInputElement;

prev.addEventListener('click', function() {
    resolveDisabledStatus(true, false);
    Ajax();
});

next.addEventListener('click', function() {
    resolveDisabledStatus(false, true);
    Ajax();
});

function resolveDisabledStatus(decreasePage: any, increasePage: any): void {
    if (currentPage >= pagesQuantity) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
        if (increasePage) {
            ++currentPage;
            numOne.textContent = new Number(+numOne.textContent + 1).toString();
            numTwo.textContent = new Number(+numTwo.textContent + 1).toString();
            numThree.textContent = new Number(+numThree.textContent + 1).toString();
        }
    }
    if (currentPage <= 1) {
        prevButton.classList.add("disabled");
    } else {
        prevButton.classList.remove("disabled");
        if (decreasePage) {
            --currentPage;
            numOne.textContent = new Number(+numOne.textContent - 1).toString();
            numTwo.textContent = new Number(+numTwo.textContent - 1).toString();
            numThree.textContent = new Number(+numThree.textContent - 1).toString();
        }
    }
    if (pagesQuantity == 1) {
        numTwoButton.classList.add("disabled");
        numThreeButton.classList.add("disabled");
        nextButton.classList.add("disabled");
    } else if (pagesQuantity == 2) {
        numThreeButton.classList.add("disabled");
    } else {
        numTwoButton.classList.remove("disabled");
        numThreeButton.classList.remove("disabled");
    }
}

function Ajax() {
    let url = 'http://www.omdbapi.com/?apikey=a5a1b624';
    let s = searchElement.value;
    let type = selectType.value;
    url += '&s=' + s;
    url += '&type=' + type;
    url += '&page=' + currentPage;
    
    fetch(url)
        .then(response => response.json())
        .then(myJson => {
            OutputElements(myJson);
            totalResults = myJson.totalResults;
            pagesQuantity = Math.round(totalResults / 10);
            resolveDisabledStatus(false, false);
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
        let divCol6 = document.createElement('div');
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
        divCol6.appendChild(divCard);
        divCol6.classList.add('col-6', 'mb-3');
        divCard.appendChild(divNogutters);
        divCard.classList.add('card');
        divNogutters.classList.add('row', 'no-gutters');
        divNogutters.appendChild(divCol4);
        divCol4.classList.add('col-md-4');
        divCol4.appendChild(img);
        img.classList.add('card-img');
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
        films.appendChild(divCol6);
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