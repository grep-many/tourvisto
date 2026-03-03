import { Link, redirect } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { loginWithGoogle, account } from "~/lib/appwrite";
import { googleSVG, logoSVG } from "~/assets";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (user.$id) return redirect("/");
  } catch (e: any) {
    if (e.code === 401) return null;
    console.error("[Error] clientLoader", e);
  }
}

const SignIn = () => {
  return (
    <main className="auth">
      <section className="glassmorphism flex-center size-full px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img src={logoSVG} alt="logo" className="size-7.5" />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">Start Your Travel Journey</h2>

            <p className="p-18-regular text-center leading-7! text-gray-100">
              Sign in with Google to manage destinations, itineraries, and user activity with ease.
            </p>
          </article>

          <ButtonComponent
            type="button"
            iconCss="e-search-icon"
            className="button-class h-11! w-full!"
            onClick={loginWithGoogle}
          >
            <img src={googleSVG} className="size-5" alt="google" />
            <span className="p-18-semibold text-white">Sign in with Google</span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
};
export default SignIn;
