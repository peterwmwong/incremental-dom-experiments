import './App.css';

const RepoName = ({owner, repo})=>
  <span>
    <span className="c-gray-darker t-light">{owner}/</span>
    <span className="c-gray-darkest t-normal">{repo}</span>
  </span>

const Toolbar = props=>
  <div className="App__toolbar layout horizontal">
    <div className="App__button App__button--menu">M</div>
    <div className="App__title flex t-normal">Title</div>
    <div className="App__button App__button--search">S</div>
  </div>

const PlaceholderCard = props=>
  <div className="Card App__placeholderCard">
    <div className="Card-title">
      <div className="PlaceholderText l-margin-b2"></div>
    </div>
    <div className="App__placeholderCard__summary">
      <div className="App__placeholderCard__avatar"></div>
      <div className="PlaceholderText l-margin-b2 l-margin-l2"></div><br />
      <div className="PlaceholderText l-width100pct"></div>
      <div className="PlaceholderText"></div>
    </div>
  </div>;

const Card = props=>
  <div className="Card App__placeholderCard">
    <div className="Card-title">
      <RepoName owner="Polymer" repo="docs" />
    </div>
    <div className="Card-action ticker-event-summary">
      <span className="ticker-event-summary__actor-avatar App__placeholderCard__avatar l-margin-b1"></span>
      <span className="ticker-event-summary__actor">addyosmani</span>
      <span className="l-margin-r3">opened</span>
      <span className="l-height7">
        <span className="ticker-event-summary__actor-avatar App__placeholderCard__avatar l-margin-r2"></span>
        <div className="ticker-event-summary__subject">
          Add global filters docs for #571
        </div>
      </span>
    </div>
    <div className="ticker-event__action">
      <span className="ticker-event__action__text">
        Same issue on Firefox 31 (64bit Linux) and Chromium 34 (64bit Linux)
      </span>
    </div>
  </div>;

const Events = props=>
  <div className="l-margin-t2">
    <Card />
    <Card />
    <PlaceholderCard />
    <Card />
  </div>

const App = (props, state, actions)=>
  <body className='App fit fullbleed'>
    <Toolbar />
    <Events />
  </body>;

App.state = {
  onInit: props=>({})
};

export default App;
