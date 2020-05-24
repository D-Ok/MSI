let xhr = new XMLHttpRequest();

//API link
let link = 'https://api.chucknorris.io/jokes/';


//"Get joke" button handler
//get jokes from api
function getJoke(){
    let url = link;
    if(document.getElementById("random").checked) {
        url += "random";
        getJokeFromAPI(url);

    } else if(document.getElementById("category").checked) {
        let selectedCategory = document.getElementsByClassName("selectedBox");

        if(selectedCategory.length>0) {
            url += "random?category=" + selectedCategory[0].innerHTML;
            getJokeFromAPI(url);
        } else
            alert("Please, choose the category first.");

    } else {
        let text = document.getElementById("searchInput").value;

        if(text.length<3 || text.length>120)
            alert("Text for searching must contains from 3 to 120 characters.");
        else {
            url += 'search?query=' + text;
            getJokes(url);
        }
    }
}

//get jokes from API and display them
function getJokes(url) {
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let data = JSON.parse(xhr.response).result;
        console.log(data);

        for(let i =0; i<data.length; i++){
            let container = document.createElement("div");
            container.id = data[i].id;
            let parent = document.getElementById("jokes");
            parent.insertBefore(container, parent.childNodes[0]);

            showJoke(data[i]);
        }

    }
}

//get a joke from API and display them
function getJokeFromAPI(url) {
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let data = JSON.parse(xhr.response);
        console.log(data);

        let container = document.createElement("div");
        container.id = data.id;
        let parent = document.getElementById("jokes");
        parent.insertBefore(container, parent.childNodes[0]);

        showJoke(data);
    }
}

// get all available categories from API
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

// display category
function addCategory(c){
    let box = document.createElement("div");
    box.classList.add("categoryBox");
    box.innerHTML = c;
    box.onclick = function(){selectCategory(box)};

    document.getElementById("categories").appendChild(box);
}

// change style of selected category
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

// select mode for getting jokes from API
function selectMode(el){
    let categoryEl = document.getElementById("categories");
    let searchEl = document.getElementById("searchDiv");
    console.log(el.id);
    if(el.checked){
       if(el.id==="search"){
           searchEl.removeAttribute("hidden");
           categoryEl.setAttribute("hidden", "");
       }  else if(el.id === "category"){
           searchEl.setAttribute("hidden", "");
           categoryEl.removeAttribute("hidden");
       } else {
           searchEl.setAttribute("hidden", "");
           categoryEl.setAttribute("hidden", "");
       }
    }
}

//"Favourite" button handler
//show (or hide) block with favourite jokes (available in table and mobile mode)
function displayFavourite(){
    let block = document.getElementsByClassName("favBlock")[0];
    let lines = document.getElementsByClassName("showFavIcon")[0].getElementsByClassName("line");
    if(block.classList.contains("miniFavBlock")){
        lines[0].classList.remove("backslashLine");
        lines[1].classList.remove("slashLine");

        block.classList.remove("miniFavBlock");
        document.getElementsByClassName("emptyBlock")[0].classList.remove("greyBlock");
        document.getElementsByClassName("mainBlock")[0].classList.remove("minMain");
        block.getElementsByClassName("favName")[0].classList.remove("hide");
        document.getElementsByClassName("mainBlock")[0].classList.remove("hide");

    } else {
        lines[0].classList.add("backslashLine");
        lines[1].classList.add("slashLine");

        block.classList.add("miniFavBlock");
        document.getElementsByClassName("emptyBlock")[0].classList.add("greyBlock")
        document.getElementsByClassName("mainBlock")[0].classList.add("minMain");
        block.getElementsByClassName("favName")[0].classList.add("hide");
        document.getElementsByClassName("mainBlock")[0].classList.add("hide");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getCategories();
}, false);


