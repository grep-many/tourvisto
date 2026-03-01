interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imageUrl: string;
}

interface UserData extends BaseUser {
  itineraryCount: number;
  itineraryCreated: number | string;
  status: "user" | "admin";
}

type User = BaseUser;

interface Country {
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap?: string;
}

interface DropdownItem {
  name: string;
}

interface SelectProps {
  data: Country[] | DropdownItem[];
  onValueChange: (value: string) => void;
  id: string;
  label: string;
  placeholder: string;
}

interface PillProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

interface Activity {
  time: string;
  description: string;
}

interface DayPlan {
  day: number;
  location: string;
  activities: Activity[];
}

interface Location {
  city: string;
  coordinates: [number, number];
  openStreetMap: string;
}

interface Trip {
  id: string;
  name: string;
  description: string;
  estimatedPrice: string;
  duration: number;
  budget: string;
  travelStyle: string;
  interests: string;
  groupType: string;
  country: string;
  imageUrls: string[];
  itinerary: DayPlan[];
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: Location;
  payment_link: string;
}

interface TripCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  tags: string[];
  price: string;
}

interface StatsCard {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  currentMonthCount: number;
}

interface TrendResult {
  trend: "increment" | "decrement" | "no change";
  percentage: number;
}

interface DashboardStats {
  totalUsers: number;
  usersJoined: {
    currentMonth: number;
    lastMonth: number;
  };
  userRole: {
    total: number;
    currentMonth: number;
    lastMonth: number;
  };
  totalTrips: number;
  tripsCreated: {
    currentMonth: number;
    lastMonth: number;
  };
}

interface CreateTripResponse {
  id?: string;
}

interface DestinationProps {
  containerClass?: string;
  bigCard?: boolean;
  activityCount: number;
  rating: number;
  bgImage: string;
  title: string;
}

type GetAllTripsResponse = {
  allTrips: Models.Document[];
  total: number;
};

interface UsersItineraryCount {
  imageUrl: string;
  name: string;
  count: number;
}

interface TripsInterest {
  imageUrl: string;
  name: string;
  interest: string;
}

interface InfoPillProps {
  text: string;
  image: string;
}

interface TripFormData {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
}
