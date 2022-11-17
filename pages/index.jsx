import EventList from "../components/events/event-list";

function HomePage({ events }) {
  return <EventList events={events} />;
}

export async function getStaticProps() {
  const response = await fetch(
    "https://events-ec580-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  let events = [];

  const data = await response.json();

  for (const key in data) {
    if (data[key].isFeatured) {
      events.push({ id: key, ...data[key] });
    }
  }

  return {
    props: { events },
    revalidate: 1800,
  };
}

export default HomePage;
