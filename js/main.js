let xhr = new XMLHttpRequest();
let link = 'https://api.chucknorris.io/jokes/';

function getRandomJoke(){

    xhr.open('GET', link+'random', false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let data = JSON.parse(xhr.response);
        console.log(data);

        let container = document.createElement("div");
        container.id = data.id;
        document.getElementById("jokes").appendChild(container);

        showJoke(data);
    }
}

function getCategories(){

    xhr.open('GET', link+'categories', false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let data = JSON.parse(xhr.response);
        console.log(data);
        for(let i =0; i<data.length; i++){
            addCategory(data[i]);
        }
    }
}

function getJokeByCategory(){
    let name;
    xhr.open('GET', link+'random?category='+name, false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let data = JSON.parse(xhr.response);
        console.log(data);
    }
}

function searchJoke(){
    let text;
    xhr.open('GET', link+'search?query='+text, false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let data = JSON.parse(xhr.response);
        console.log(data);
    }
}

function addCategory(c){
    let box = document.createElement("div");
    box.classList.add("categoryBox");
    box.innerHTML = c;
    box.onclick = function(){selectCategory(box)};

    document.getElementById("categories").appendChild(box);
}

function selectCategory(el){
    let attr = "selectedBox";

    if(el.classList.contains(attr))
        el.classList.remove(attr);
    else {
        let categories = document.getElementsByClassName("categoryBox");
        for(let i = 0; i<categories.length; i++)
            categories[i].classList.remove(attr);
        el.classList.add(attr);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getCategories();
}, false);


