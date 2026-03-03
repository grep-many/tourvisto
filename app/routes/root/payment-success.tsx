import React, { useEffect } from "react";
import { Link, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/payment-success";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import confetti from "canvas-confetti";
import { LEFT_CONFETTI, RIGHT_CONFETTI } from "~/constants";
import { arrowLeftSVG, checkSVG, itineraryButtonSVG } from "~/assets";

export async function loader({ params }: LoaderFunctionArgs) {
  return params;
}

const PaymentSuccess = ({ loaderData }: Route.ComponentProps) => {
  useEffect(() => {
    confetti(LEFT_CONFETTI);
    confetti(RIGHT_CONFETTI);
  }, []);

  return (
    <main className="payment-success wrapper">
      <section>
        <article>
          <img src={checkSVG} className="size-24" />
          <h1>Thank & Welcome Aboard!</h1>

          <p>
            Your trip is booked - can't wait to have you on this adventure. Get ready to explore &
            make memories! ✨
          </p>

          <Link to={`/travel/${loaderData?.tripId}`} className="w-full">
            <ButtonComponent className="button-class h-11! w-full!">
              <img src={itineraryButtonSVG} className="size-5" />

              <span className="p-16-semibold text-white">View trip details</span>
            </ButtonComponent>
          </Link>
          <Link to={"/"} className="w-full">
            <ButtonComponent className="button-class-secondary h-11! w-full!">
              <img src={arrowLeftSVG} className="size-5" />

              <span className="p-16-semibold">Return to homepage</span>
            </ButtonComponent>
          </Link>
        </article>
      </section>
    </main>
  );
};
export default PaymentSuccess;
