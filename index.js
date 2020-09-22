var searchElement = document.getElementById('search');
var selectType = document.getElementById('type');
var currentPage = 1;
searchElement.addEventListener('change', function () {
    Ajax();
    currentPage = 1;
});
selectType.addEventListener('change', function () {
    Ajax();
    currentPage = 1;
});
var totalResults;
var pagesQuantity;
var prevButton = document.getElementById('prev-button');
var prev = document.getElementById('prev');
var numOne = document.getElementById('numOne');
var numTwo = document.getElementById('numTwo');
var numThree = document.getElementById('numThree');
var numOneButton = document.getElementById('numOneButton');
var numTwoButton = document.getElementById('numTwoButton');
var numThreeButton = document.getElementById('numThreeButton');
var next = document.getElementById('next');
var nextButton = document.getElementById('next-button');
prev.addEventListener('click', function () {
    resolveDisabledStatus(true, false);
    Ajax();
});
next.addEventListener('click', function () {
    resolveDisabledStatus(false, true);
    Ajax();
});
function resolveDisabledStatus(decreasePage, increasePage) {
    if (currentPage >= pagesQuantity) {
        nextButton.classList.add("disabled");
    }
    else {
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
    }
    else {
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
    }
    else if (pagesQuantity == 2) {
        numThreeButton.classList.add("disabled");
    }
    else {
        numTwoButton.classList.remove("disabled");
        numThreeButton.classList.remove("disabled");
    }
}
function Ajax() {
    var url = 'http://www.omdbapi.com/?apikey=a5a1b624';
    var s = searchElement.value;
    var type = selectType.value;
    url += '&s=' + s;
    url += '&type=' + type;
    url += '&page=' + currentPage;
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (myJson) {
        OutputElements(myJson);
        totalResults = myJson.totalResults;
        pagesQuantity = Math.round(totalResults / 10);
        resolveDisabledStatus(false, false);
    });
}
Ajax();
function OutputElements(myJson) {
    var films = document.getElementById('films');
    films.innerHTML = '';
    var movies = myJson.Search;
    console.log(myJson);
    var _loop_1 = function (i) {
        var element = movies[i];
        var divCol6 = document.createElement('div');
        var divCard = document.createElement('div');
        var divNogutters = document.createElement('div');
        var divCol4 = document.createElement('div');
        var img = document.createElement('img');
        var divCol8 = document.createElement('div');
        var divCardBody = document.createElement('div');
        var h5 = document.createElement('h5');
        var p = document.createElement('p');
        var a = document.createElement('a');
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
        a.addEventListener('click', function () { AjaxMovie(element.imdbID); });
    };
    for (var i = 0; i < movies.length; i++) {
        _loop_1(i);
    }
}
function AjaxMovie(id) {
    var url = "http://www.omdbapi.com/?apikey=a5a1b624";
    url += '&i=' + id;
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (myJson) {
        console.log(myJson);
    });
}
;
