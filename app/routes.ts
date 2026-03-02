import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("sign-in", "routes/root/sign-in.tsx"),
  // route("api/create-trip", "routes/api/create-trip.ts"),
  layout("routes/admin/layout.tsx", [
    route("dashboard", "routes/admin/index.tsx"),
    route("users", "routes/admin/users.tsx"),
    // route("trips", "routes/admin/trips.tsx"),
    // route("trips/create", "routes/admin/create-trip.tsx"),
    // route("trips/:tripId", "routes/admin/trip-detail.tsx"),
  ]),
  // layout("routes/root/page-layout.tsx", [
  //   index("routes/root/travel-page.tsx"),
  //   route("/travel/:tripId", "routes/root/travel-detail.tsx"),
  //   route("/travel/:tripId/success", "routes/root/payment-success.tsx"),
  // ]),
] satisfies RouteConfig;
