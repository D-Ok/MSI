
class Joke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavourite: false
        };
        this.like = this.like.bind(this);
    }

    like() {
        let jokeId = this.props.joke.id;
        let el = document.getElementById(jokeId).getElementsByClassName("favBtn")[0];

        if(this.props.fav)
            el.click();
        else {
            this.state.isFavourite = !this.state.isFavourite;
            console.log(this.state.isFavourite);

            if (this.state.isFavourite) {
                if (el !== undefined) el.childNodes[0].src = "images/full-heart.png";

                let containerF = document.createElement("div");
                containerF.id = "fav-" + jokeId;
                let parentF = document.getElementById("favJokes");
                parentF.insertBefore(containerF, parentF.childNodes[0]);

                showFavJoke(this.props.joke);

            } else {
                if (el !== undefined) el.childNodes[0].src = "images/heart.png";
                document.getElementById("fav-" + jokeId).remove();
            }
        }
    }

    render() {
        return (
            <div className={ this.props.fav ? "favJokeDetails" : "jokeDetails" }>
                <div className="favBtn" onClick={this.like}>
                    <img src={ this.props.fav ? "images/full-heart.png" : "images/heart.png"} atl="heart" />
                </div>
                <div className={ this.props.fav ? "icon favIcon" : "icon" }>
                <img src="images/Vector.png" className="jokeIcon" alt="Icon" />
                </div>
                <p className="jokeID">ID: <a href={this.props.joke.url}>{this.props.joke.id}</a></p>
                <div className="text">{this.props.joke.value}</div>
                <p className="jokeTime">{this.props.joke.updated_at}</p>
                { this.props.joke.categories.length>0
                    ? this.props.joke.categories.map(function(cat, i){
                        return <div className="jokeCategory">{cat}</div>;
                      })
                    : null
                }
             </div>
        );
    }

}

function showJoke(j){
    ReactDOM.render(<Joke joke = {j} fav = {false}/>,
    document.getElementById(j.id));
}

function showFavJoke(j){
    ReactDOM.render(<Joke joke = {j} fav = {true}/>,
        document.getElementById("fav-"+j.id));
}