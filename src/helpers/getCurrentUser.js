import load         from './load';
import loadFirebase from './loaders/loadFirebase';
import User         from '../models/User';

let currentUser = null;

const waitForFirebase = (props, state, actions)=>
  new Promise(resolve=>{
    const checkForFirebase = ()=>{
      if(window.Firebase) return resolve(window.Firebase);
      setTimeout(checkForFirebase, 32);
    };

    loadFirebase();
    checkForFirebase();
  });

const authWithFirebase = Firebase=>
  new Promise((resolve, reject)=>{
    new Firebase('https://ticker-dev.firebaseio.com').onAuth(authData=>{
      if(authData && authData.github) return resolve(authData.github);
      else reject();
    });
  });

const getOrCreateUser = ({id, username, accessToken})=>{
  // Give load access tokens to use for any third-party API requests.
  // For right now, just Github.
  // TODO(pwong): Split out access tokens into a seperate module?
  load.setAccessToken(accessToken);

  // Get or create user information
  return User.get(id)
    // Couldn't find existing user w/authId, so create a new User
    .catch(()=>new User({id, username, sources:[]}).save())
    .then(user=>currentUser = user);
};


export default ()=>{
  if(currentUser) return Promise.resolve(currentUser);

  return waitForFirebase()
    .then(authWithFirebase)
    .then(getOrCreateUser);
};
