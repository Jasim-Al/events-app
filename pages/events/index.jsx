import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function EventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allows you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://events-ec580-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  let events = [];

  const data = await response.json();

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return {
    props: { events },
    revalidate: 1800,
  };
}

export default EventsPage;
