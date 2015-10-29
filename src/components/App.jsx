import './App.css';
import AppDrawer      from './AppDrawer.jsx';
import Toolbar        from './Toolbar.jsx';
import UserView       from './UserView.jsx';
import RepoView       from './RepoView.jsx';
import getCurrentUser from '../helpers/getCurrentUser';

const App = (props, state, actions)=>
  <body className='App fit fullbleed'>
    <Toolbar title={state.data} onRequestDrawer={actions.enableDrawer} />
    {   state.view === 'user'  ? <UserView user={state.data} />
      : state.view === 'repo'  ? <RepoView repo={state.data} />
      : state.view === 'login' ? <LoginView />
      : null }
    <AppDrawer
      user={state.currentUser}
      enabled={state.drawerEnabled}
      onSelectSource={actions.selectSource}
      onRequestDisable={actions.disableDrawer}
    />
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
    return {...state, view: 'waiting'};
  },
  viewUser:  (props, state, actions, user)=>({...state, view: 'user', data: user}),
  viewRepo:  (props, state, actions, repo)=>({...state, view: 'repo', data: repo}),
  viewLogin: (props, state, actions)=>({...state, view: 'login', data: null}),
  onCurrentUserChange: (props, state, actions, currentUser)=>({
    ...state,
    currentUser
  }),
  enableDrawer:  (props, state, actions)=>({...state, drawerEnabled: true}),
  disableDrawer: (props, state, actions)=>({...state, drawerEnabled: false}),
  selectSource:  (props, state, actions, source)=>{
    window.location.hash = `#github/${source.displayName}`
  }
};

export default App;
