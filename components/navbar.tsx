import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router";
import { logoutUser } from "~/lib/appwrite";
import { cn } from "~/utils";

export const RootNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const user = useLoaderData();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <nav
      className={cn(
        location.pathname === `/travel/${params.tripId}` ? "bg-white" : "glassmorphism",
        "fixed z-50 w-full",
      )}
    >
      <header className="root-nav wrapper">
        <Link to="/" className="link-logo">
          <img src="/assets/icons/logo.svg" alt="logo" className="size-7.5" />
          <h1>Tourvisto</h1>
        </Link>

        <aside>
          {user.status === "admin" && (
            <Link
              to="/dashboard"
              className={cn("text-base font-normal text-white", {
                "text-dark-100": location.pathname.startsWith("/travel"),
              })}
            >
              Admin Panel
            </Link>
          )}

          <img
            src={user?.imageUrl || "/assets/images/david.wepb"}
            alt="user"
            referrerPolicy="no-referrer"
          />

          <button onClick={handleLogout} className="cursor-pointer">
            <img src="/assets/icons/logout.svg" alt="logout" className="size-6 rotate-180" />
          </button>
        </aside>
      </header>
    </nav>
  );
};
