import GithubEvent from '../models/github/GithubEvent';
import EventCard from './EventCard.jsx';

const RepoView = ({user}, {events})=>
  <div className="l-margin-t2">
    {events.map(event=>
      <EventCard key={event.id} event={event} />
    )}
  </div>;

RepoView.state = {
  onInit: ({user}, state, {loadEvents})=>{
    GithubEvent.query({type:'repos', id:user}).then(loadEvents);
    return {events: []};
  },

  loadEvents: (props, state, actions, events)=>({events})
};

export default RepoView;
