import './App.css';
import Toolbar        from './Toolbar.jsx';
import UserView       from './UserView.jsx';
import RepoView       from './RepoView.jsx';
import getCurrentUser from '../helpers/getCurrentUser';

const App = (props, {view, data, currentUser}, actions)=>
  <body className='App fit fullbleed'>
    <Toolbar title={data} />
    {currentUser && currentUser.sources.length}
    {   view === 'user'  ? <UserView user={data} />
      : view === 'repo'  ? <RepoView repo={data} />
      : view === 'login' ? <LoginView />
      : null }
  </body>;

App.state = {
  onInit: (props, state, {onHashChange, onCurrentUserChange})=>{
    window.onhashchange = onHashChange;
    getCurrentUser().then(onCurrentUserChange);
    return onHashChange();
  },
  onHashChange: (props, state, {viewRepo, viewUser})=>{
    const hash = window.location.hash;
    if(hash){
      const [, owner, repo] = hash.split('/');
      if(repo)       return viewRepo(`${owner}/${repo}`);
      else if(owner) return viewUser(owner);
    }
    return {
      ...state,
      view: 'waiting'
    };
  },
  viewUser: (props, state, actions, user)=>({
    ...state,
    view: 'user', data: user
  }),
  viewRepo: (props, state, actions, repo)=>({
    ...state,
    view: 'repo', data: repo
  }),
  viewLogin: (props, state, actions)=>({
    ...state,
    view: 'login', data: null
  }),
  onCurrentUserChange: (props, state, actions, currentUser)=>({
    ...state,
    currentUser
  })
};

export default App;
