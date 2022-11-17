import Head from "next/head";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function EventFilterPage({ error = "", events, dates }) {
  if (error === "invalid") {
    return (
      <Fragment>
        <ErrorAlert className="center">
          Invalid filter. Please adjust your values!
        </ErrorAlert>
        ;
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  if (error === "nodata") {
    return (
      <Fragment>
        <ErrorAlert className="center">
          No events found for the chosen filter.
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(dates.year, dates.month - 1);
  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${dates.month}/${dates.year}.`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const [year, month] = filterData;

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return { props: { error: "invalid" } };
  }

  const response = await fetch(
    "https://events-ec580-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  let events = [];

  const data = await response.json();

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return { props: { error: "nodata" } };
  }

  return {
    props: {
      events: filteredEvents,
      dates: { year: numYear, month: numMonth },
    },
  };
}

export default EventFilterPage;
