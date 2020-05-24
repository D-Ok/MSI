let xhr = new XMLHttpRequest();
let link = 'https://api.chucknorris.io/jokes/';

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
            alert("Please, choose the category first");
    } else {
        let text = document.getElementById("searchInput").value;
        if(text.length<3 || text.length>120)
            alert("Length of text for searching must be between 3 and 120.");
        else {
            url += 'search?query=' + text;
            getJokes(url);
        }
    }

}

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

function displayFavourite(){
    let block = document.getElementsByClassName("favBlock")[0];
    if(block.classList.contains("miniFavBlock")){
        block.classList.remove("miniFavBlock");
        document.getElementsByClassName("emptyBlock")[0].classList.remove("grey");
        document.getElementsByClassName("mainBlock")[0].classList.remove("minMain");
        block.getElementsByClassName("favName")[0].classList.remove("hide");
        document.getElementsByClassName("mainBlock")[0].classList.remove("hide");

    } else {
        block.classList.add("miniFavBlock");
        document.getElementsByClassName("emptyBlock")[0].classList.add("grey")
        document.getElementsByClassName("mainBlock")[0].classList.add("minMain");
        block.getElementsByClassName("favName")[0].classList.add("hide");
        document.getElementsByClassName("mainBlock")[0].classList.add("hide");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getCategories();
}, false);


