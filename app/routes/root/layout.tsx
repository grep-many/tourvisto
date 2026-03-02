import { Outlet, redirect } from "react-router";
import { getExistingUser, storeUserData, account } from "~/lib/appwrite";
import { RootNavbar } from "~/components";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error fetching user", e);
    return redirect("/sign-in");
  }
}

const PageLayout = () => {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
    </div>
  );
};
export default PageLayout;
