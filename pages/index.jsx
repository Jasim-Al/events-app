import Head from "next/head";
import { Fragment } from "react";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage({ events }) {
  return (
    <Fragment>
      <Head>
        <title>Featured Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allows you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
