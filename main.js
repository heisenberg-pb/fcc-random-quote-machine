const quotesURL = "https://raw.githubusercontent.com/heisenberg-pb/fcc-random-quote-machine/master/quotes.json";
const colorsURL = "https://raw.githubusercontent.com/heisenberg-pb/fcc-random-quote-machine/master/colors.json";

var data = [];
var colors = [];

var xhReq = new XMLHttpRequest();
xhReq.open("GET", quotesURL, false);
xhReq.send(null);

data = JSON.parse(xhReq.responseText);

xhReq.open("GET", colorsURL, false);
xhReq.send(null);

colors = JSON.parse(xhReq.responseText);

const Card = (props) => {
  return(
    <div className="card-body">
      <Text text={props.quote}></Text>
      <Author text={props.author}></Author>
      <Buttons 
        nextButtonHandler={props.nextButtonHandler}
        quote={props.quote}
        author={props.author} />
    </div>
  );
}

const Text = (props) => {
  return(
    <div
      className="card-text quote-text text-animation"
      style={{textAlign: "left"}}
      id="quote-text">{props.text}</div>
  );
}

const Author = (props) => {
  return(
    <div 
      className="card-text author-text text-animation"
      style={{textAlign: "right"}}>- {props.text}</div>
  );
}

const tweet = (props) => {
  const url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + props.quote + '" -' + props.author);
  window.open(url, '_blank');
}

const Buttons = (props) => {
  return(
    <div className="row"
    style={{
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: "20px"
      }}>
      <div
        className="col-3"
        style={{textAlign: "left"}}>
          <a
            className="btn"
            onClick={() => tweet(props)}
            style={{
              height: "38px",
              width: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <img
                src={"https://github.com/heisenberg-pb/fcc-random-quote-machine/raw/master/twitter-logo.png"}
                alt="Tweet"
                style={{
                  height: "38px",
                  width: "auto"
                }} />
            </a>
      </div>
      <div 
        className="col-9"
        style={{textAlign: "right"}}>
          <a 
            className="btn btn-primary"
            onClick={props.nextButtonHandler}
            style={{
              color: "white"
            }}>New Quote</a>
      </div>
    </div>
  );
}

var currentQuote = {
  'quote': '',
  'author': ''
};

const selectRandomQuote = () => {
  let index = Math.floor(Math.random() * data.length);
  currentQuote = {
    'quote': data[index]['quote'],
    'author': data[index]['author']
  };
}

var currentColor = '';

const selectRandomColor = () => {
  let index = Math.floor(Math.random() * colors.length);
  currentColor = colors[index];
}



const setColor = () => {
  selectRandomColor();
  $("body").css({
    backgroundColor: currentColor,
    color: currentColor
  });
}

// main class
class App extends React.Component {
  constructor(props) {
    super(props);
    selectRandomQuote();
    this.state = {
      ...currentQuote
    };
    // bind the button
    this.handleNextButton = this.handleNextButton.bind(this);
  }

  /* next button handler */
  handleNextButton() {
    selectRandomQuote();
    this.setState({
      ...currentQuote
    });
  }

  // render
  render() {
    $("#card-text").change(setColor());
    let cardStyle = {};
    if(document.documentElement.clientWidth > "768px") {
      cardStyle = {width: "450px"};
    } else {
      cardStyle = {width: document.documentElement.clientWidth};
    }
    return(
      <div 
        className="col-6 card my-card-style"
        style={cardStyle}>
          <Card
            quote={this.state.quote} 
            author={this.state.author} 
            nextButtonHandler={this.handleNextButton} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
