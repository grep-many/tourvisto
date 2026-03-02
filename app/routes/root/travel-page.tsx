import { Link, type LoaderFunctionArgs, useSearchParams } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { cn, parseTripData } from "~/utils";
import { Header, TripCard } from "../../../components";
import { getUser, getAllTrips } from "~/lib/appwrite";
import type { Route } from "~/.react-router/types/app/routes/admin/+types/trips";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";
import { logoSVG } from "~/assets";

const FeaturedDestination = ({
  containerClass = "",
  bigCard = false,
  rating,
  title,
  activityCount,
  bgImage,
}: DestinationProps) => (
  <section
    className={cn(
      "size-full min-w-70 overflow-hidden rounded-[14px] bg-cover bg-center",
      containerClass,
      bgImage,
    )}
  >
    <div className="bg-linear200 h-full">
      <article className="featured-card">
        <div className={cn("rounded-20 w-fit bg-white px-3 py-px text-sm font-bold text-red-100")}>
          {rating}
        </div>

        <article className="flex flex-col gap-3.5">
          <h2 className={cn("text-lg font-semibold text-white", { "p-30-bold": bigCard })}>
            {title}
          </h2>

          <figure className="flex items-center gap-2">
            <img
              src="/assets/images/david.webp"
              alt="user"
              className={cn("aspect-square size-4 rounded-full", { "size-11": bigCard })}
            />
            <p className={cn("text-xs font-normal text-white", { "text-lg": bigCard })}>
              {activityCount} activities
            </p>
          </figure>
        </article>
      </article>
    </div>
  </section>
);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  const [user, { allTrips, total }] = await Promise.all([getUser(), getAllTrips(limit, offset)]);

  return {
    trips: allTrips.map(({ $id, tripDetails, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetails),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};

const TravelPage = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];

  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };

  return (
    <main className="flex flex-col">
      <section className="travel-hero">
        <div>
          <section className="wrapper">
            <article>
              <h1 className="p-72-bold text-dark-100">Plan Your Trip with Ease</h1>

              <p className="text-dark-100">
                Customize your travel itinerary in minutes—pick your destination, set your
                preferences, and explore with confidence.
              </p>
            </article>

            <Link to="#trips">
              <ButtonComponent type="button" className="button-class h-11! w-full! md:w-60!">
                <span className="p-16-semibold text-white">Get Started</span>
              </ButtonComponent>
            </Link>
          </section>
        </div>
      </section>

      <section className="wrapper flex h-full flex-col gap-10 pt-20">
        <Header
          title="Featured Travel Destinations"
          description="Check out some of the best places you visit around the world"
        />
        <div className="featured">
          <article>
            <FeaturedDestination
              bgImage="bg-card-1"
              containerClass="h-1/3 lg:h-1/2"
              bigCard
              title="Barcelona Tour"
              rating={4.2}
              activityCount={196}
            />

            <div className="travel-featured">
              <FeaturedDestination
                bgImage="bg-card-2"
                bigCard
                title="London"
                rating={4.5}
                activityCount={512}
              />
              <FeaturedDestination
                bgImage="bg-card-3"
                bigCard
                title="Australia Tour"
                rating={3.5}
                activityCount={250}
              />
            </div>
          </article>

          <div className="flex flex-col gap-7.5">
            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage="bg-card-4"
              title="Spain Tour"
              rating={3.8}
              activityCount={150}
            />
            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage="bg-card-5"
              title="Japan"
              rating={5}
              activityCount={150}
            />
            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage="bg-card-6"
              title="Italy Tour"
              rating={4.2}
              activityCount={500}
            />
          </div>
        </div>
      </section>

      <section id="trips" className="wrapper flex flex-col gap-10 py-20">
        <Header
          title="Handpicked Trips"
          description="Browse well-planned trips designes for your travel style"
        />

        <div className="trip-grid">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={8}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>

      <footer className="h-28 bg-white">
        <div className="wrapper footer-container">
          <Link to="/">
            <img src={logoSVG} alt="logo" className="size-7.5" />
            <h1>Tourvisto</h1>
          </Link>

          <div>
            {["Terms & Conditions", "Privacy Policy"].map((item) => (
              <Link to="/" key={item}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
};
export default TravelPage;
