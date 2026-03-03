import { arrowDownRedSVG, arrowUpGreenSVG, decrementSVG, incrementSVG } from "~/assets";
import { calculateTrendPercentage, cn } from "~/utils";

export const StatCard = ({ headerTitle, total, lastMonthCount, currentMonthCount }: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);

  const isDecrement = trend === "decrement";

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>

      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>

          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={isDecrement ? arrowDownRedSVG : arrowUpGreenSVG}
                className="size-5"
                alt="arrow"
              />
              <figcaption
                className={cn(
                  "text-sm font-medium",
                  isDecrement ? "text-red-500" : "text-success-700",
                )}
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <p className="truncate text-sm font-medium text-gray-100">vs last month</p>
          </div>
        </div>

        <img
          src={isDecrement ? decrementSVG : incrementSVG}
          className="h-full w-full md:h-32 xl:h-full xl:w-32"
          alt="trend graph"
        />
      </div>
    </article>
  );
};
