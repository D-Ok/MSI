
class Joke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavourite: document.getElementById("fav-"+props.joke.id) != undefined
        };
        this.like = this.like.bind(this);
    }

    like() {
        let jokeId = this.props.joke.id;
        let jokeEl = document.getElementById(jokeId);
        let el;

        if ( jokeEl != undefined) {
            el = jokeEl.getElementsByClassName("favBtn")[0];
            if (this.props.fav)
                el.click();
            else {
                el = jokeEl.getElementsByClassName("favBtn")[0];

                this.state.isFavourite = !this.state.isFavourite;
                console.log(this.state.isFavourite);

                if (this.state.isFavourite) {
                    if (el !== undefined) el.childNodes[0].src = "images/full-heart.png";
                    addFavJoke(this.props.joke);
                } else {
                    if (el !== undefined) el.childNodes[0].src = "images/heart.png";
                    removeFavJoke(this.props.joke);
                }
            }
        } else
            removeFavJoke(this.props.joke);
    }

    render() {
        return (
            <div className={ this.props.fav ? "favJokeDetails" : "jokeDetails" }>
                <div className="favBtn" onClick={this.like}>
                    <img src={ (this.props.fav || this.state.isFavourite)
                        ? "images/full-heart.png"
                        : "images/heart.png"
                    } alt="heart" />
                </div>
                <div className={ this.props.fav ? "icon favIcon" : "icon" }>
                    <img src="images/Vector.png" className="jokeIcon" alt="Icon" />
                    <div className="mLine" style={{top: 15+'px'}}></div>
                    <div className="mLine" style={{top: 17.5+'px'}}></div>
                    <div className="mLine" style={{top: 20+'px'}}></div>
                </div>
                <p className="jokeID">ID: <a href={this.props.joke.url}>{this.props.joke.id}</a></p>
                <div className="text">{this.props.joke.value}</div>
                <p className="jokeTime">{this.props.joke.updated_at}</p>
                { this.props.joke.categories.length>0
                    ? this.props.fav
                        ? this.props.joke.categories.map(function(cat, i){
                          return <div className="jokeCategory grey">{cat}</div>})
                        : this.props.joke.categories.map(function(cat, i){
                            return <div className="jokeCategory">{cat}</div>})
                    : null
                }
             </div>
        );
    }

}

function addFavJoke(joke) {
    let allFavJokes = JSON.parse(localStorage.getItem("favJokes"));
    allFavJokes.push(joke);
    localStorage.setItem("favJokes", JSON.stringify(allFavJokes));

    let containerF = document.createElement("div");
    containerF.id = "fav-" + joke.id;
    let parentF = document.getElementById("favJokes");
    parentF.insertBefore(containerF, parentF.childNodes[0]);
    showFavJoke(joke);
}

function removeFavJoke(joke) {
    let allFavJokes = JSON.parse(localStorage.getItem("favJokes"));

    let newList = [];
    for(let i = 0; i<allFavJokes.length; i++){
        if(allFavJokes[i].id != joke.id)
            newList.push(allFavJokes[i]);
    }
    localStorage.setItem("favJokes", JSON.stringify(newList));
    document.getElementById("fav-" + joke.id).remove();
}

function showFavJokes(){
    let favJokes = JSON.parse(localStorage.getItem("favJokes"));
    console.log(favJokes);
    if(favJokes === null){
        localStorage.setItem("favJokes", JSON.stringify([]));
    } else {
        for(let i=0; i<favJokes.length; i++) {
            let containerF = document.createElement("div");
            containerF.id = "fav-" + favJokes[i].id;
            let parentF = document.getElementById("favJokes");
            parentF.insertBefore(containerF, parentF.childNodes[0]);
            showFavJoke(favJokes[i]);
        }
    }
}

function showJoke(j){
    changeTimeValue(j);
    ReactDOM.render(<Joke joke = {j} fav = {false}/>, document.getElementById(j.id));
}

function showFavJoke(j){
    changeTimeValue(j);
    ReactDOM.render(<Joke joke = {j} fav = {true}/>, document.getElementById("fav-"+j.id));
}

function changeTimeValue(j){
    let current = new Date();
    let update = new Date(Date.parse(j.updated_at));
    let timeDiff = Math.floor((current - update) / (1000*60*60));
    j.updated_at = "Last update: "+timeDiff+" hours ago";

}

showFavJokes();