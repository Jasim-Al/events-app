import Head from "next/head";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailsPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>Not found.</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const response = await fetch(
    `https://events-ec580-default-rtdb.asia-southeast1.firebasedatabase.app/events/${eventId}.json`
  );

  const data = await response.json();

  return { props: { event: { id: eventId, ...data } }, revalidate: 60 };
}

export async function getStaticPaths() {
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

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return { paths, fallback: "blocking" };
}

export default EventDetailsPage;
