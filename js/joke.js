
class Joke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavourite: true
        };
        this.like = this.like.bind(this);
    }

    like() {
        this.setState(state => ({
            isFavourite: !state.isFavourite
        }));
    }

    render() {
        return (
            <div className="jokeDetails">
                <div className="favBtn">
                    <img src="images/heart.png" atl="heart" />
                </div>
                <div className="icon">
                <img src="images/Vector.png" className="jokeIcon" alt="Icon" />
                </div>
                <p className="jokeID">ID: <a href={this.props.joke.url}>{this.props.joke.id}</a></p>
                <div className="text">{this.props.joke.value}</div>
                <p className="jokeTime">{this.props.joke.updated_at}</p>
             </div>
        );
    }

}

function showJoke(j){
    ReactDOM.render(<Joke joke = {j}/>,
    document.getElementById(j.id));
}