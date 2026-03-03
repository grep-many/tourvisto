import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSidebar, NavItems } from "~/components";
import { account } from "~/lib/appwrite/client";
import { getExistingUser } from "~/lib/appwrite";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) redirect("/sign-in");
    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "user") {
      return redirect("/");
    }
    return existingUser;
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />

      <aside className="hidden w-full max-w-67.5 lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};
export default AdminLayout;
