import { redirect } from "react-router";
import { account, getExistingUser, getGooglePicture, storeUserData } from "~/lib/appwrite";

export async function clientLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");

  if (!userId || !secret) return redirect("/sign-in");

  try {
    await account.createSession(userId, secret);

    const exist = await getExistingUser(userId);

    const googleIdentity = (await account.listIdentities()).identities.find(
      (id) => id.provider === "google",
    );

    const imageUrl = googleIdentity?.providerAccessToken
      ? await getGooglePicture(googleIdentity.providerAccessToken)
      : "";

    if (!exist) await storeUserData(imageUrl);

    redirect("/");
  } catch (error) {
    console.error("[Auth] Something went wrong while creating session", error);
    return redirect("/sign-in");
  }
}

export default function AuthCallback() {
  return (
    <main className="flex h-screen w-screen items-center justify-center text-3xl font-black">
      Authenticating...
    </main>
  );
}
