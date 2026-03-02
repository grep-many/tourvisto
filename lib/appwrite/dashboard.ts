import { parseTripData } from "~/utils";
import { database, appwriteConfig } from "~/lib/appwrite";

interface Document {
  [key: string]: any;
}

export const getUsersAndTripsStats = async (): Promise<any> => {
  const d = new Date();
  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
  const startPrev = new Date(d.getFullYear(), d.getMonth() - 1, 1).toISOString();
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0, 23, 59, 59).toISOString();

  const [users, trips] = await Promise.all([
    database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId),
    database.listDocuments(appwriteConfig.databaseId, appwriteConfig.tripCollectionId),
  ]);

  // Filtering directly using Appwrite's internal $createdAt attribute
  const filterByDate = (items: Document[], start: string, end?: string) =>
    items.filter((item) => item.$createdAt >= start && (!end || item.$createdAt <= end)).length;

  const usersList = users.documents;
  const tripsList = trips.documents;

  const roleUsers = usersList.filter((u: Document) => u.status === "user");

  return {
    totalUsers: users.total,
    usersJoined: {
      currentMonth: filterByDate(usersList, startCurrent),
      lastMonth: filterByDate(usersList, startPrev, endPrev),
    },
    userRole: {
      total: roleUsers.length,
      currentMonth: filterByDate(roleUsers, startCurrent),
      lastMonth: filterByDate(roleUsers, startPrev, endPrev),
    },
    totalTrips: trips.total,
    tripsCreated: {
      currentMonth: filterByDate(tripsList, startCurrent),
      // FIXED: Now correctly using tripsList instead of users
      lastMonth: filterByDate(tripsList, startPrev, endPrev),
    },
  };
};

export const getUserGrowthPerDay = async () => {
  const { documents } = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
  );

  const userGrowth = documents.reduce((acc: Record<string, number>, user: Document) => {
    const day = new Date(user.$createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(userGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export const getTripsCreatedPerDay = async () => {
  const { documents } = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId,
  );

  const tripsGrowth = documents.reduce((acc: Record<string, number>, trip: Document) => {
    const day = new Date(trip.$createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(tripsGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export const getTripsByTravelStyle = async () => {
  const { documents } = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId,
  );

  const travelStyleCounts = documents.reduce((acc: Record<string, number>, trip: Document) => {
    const tripDetail = parseTripData(trip.tripDetails);

    if (tripDetail?.travelStyle) {
      const style = tripDetail.travelStyle;
      acc[style] = (acc[style] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
    count,
    travelStyle,
  }));
};
