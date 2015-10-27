import GithubEvent from '../models/github/GithubEvent';
import EventCard from './EventCard.jsx';

const UserView = ({user}, {events})=>
  <div className="l-margin-t2">
    {events.map(event=>
      <EventCard key={event.id} event={event} />
    )}
  </div>;

const INIT_STATE = {events: []};
UserView.state = {
  onInit: ({user}, state, {loadEvents})=>{
    GithubEvent.query({type:'users', id:user}).then(loadEvents);
    return INIT_STATE;
  },

  loadEvents: (props, state, actions, events)=>({events})
};

export default UserView;
