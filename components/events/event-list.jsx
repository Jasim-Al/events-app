import EventItem from "./events-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { events } = props;
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          id={event.id}
          image={event.image}
          date={event.date}
          location={event.location}
        />
      ))}
    </ul>
  );
}

export default EventList;
