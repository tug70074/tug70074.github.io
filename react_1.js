class FeatureTile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            img: "/images/book.png",
            ID: this.props.ID,
            onClick: this.props.onClick,
        };
    }

    render(){
        return(
            <div className = "fTile">
                <div className ="fTitle">Feature {this.props.ID}</div>
                <img src={this.state.img} onClick = {() => this.state.onClick()}></img>
            </div>
        );
    }
}

function Arrows(props){
    return(
        <div className="arrows">
            <img style={{float:'left'}} src="/images/arrow-left.svg"/>
            <img style={{float:'right'}} src="/images/arrow-right.svg"/>
        </div>
    );
}

class FeatureContainer extends React.Component {
    renderTile(i){
        return(
            <FeatureTile
            img = "/images/book.png"
            ID = {i}
            onClick = {() => {
                var modal = document.getElementsByClassName("myModal")[0];
                // Get the button that opens the modal
                var btn = document.getElementsByClassName("fTitle") 
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                // When the user clicks the button, open the modal
                modal.style.display = "block";
                injectFunction(i);
                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                }
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        }
                }
            }}
            />
        );

    }
    render(){
        return(
            <div className="grid container">
                <Arrows />
                {this.renderTile(0)}
                {this.renderTile(1)}
                {this.renderTile(2)}
                {this.renderTile(3)}
                {this.renderTile(4)}
                {this.renderTile(5)}
                {this.renderTile(6)}
            </div>
        );
    }
}

class Header extends React.Component{
    render(){
        return(
            <div className="header">COVID RESOURCE APP</div>
        );
    }
}

class PhillyMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            img : "/images/PhillyMap.png.png",
        };
    }
    render(){
        return(
            <div className="map">
                <img className="mapImage" src = {this.state.img} />
            </div>
        );
    }
}

function ModalWindow(){
        return(
            <div className="myModal modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <div className="txtSection">Some text in the Modal..</div>
                </div>
            </div>
        );
}


class CovidPage extends React.Component{
    render(){
        return(
            <div id="renderPage">
                <Header />
                <PhillyMap />
                <FeatureContainer />
                <ModalWindow />
            </div>
        );
    }
}
ReactDOM.render(<CovidPage />, document.getElementById('root'));