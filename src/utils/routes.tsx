import { createBrowserRouter } from "react-router";
import Root from "../components/Root";
import AdminLayout from "../components/AdminLayout";
import Home from "../pages/Home";
import AIAssistant from "../pages/AIAssistant";
import Quiz from "../pages/Quiz";
import Simulation from "../pages/Simulation";
import Resources from "../pages/Resources";
import Leaderboard from "../pages/Leaderboard";
import Auth from "../pages/Auth";
import ResetPassword from "../pages/ResetPassword";
import Irembo from "../pages/Irembo";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminQuestions from "../pages/admin/Questions";
import AdminPayments from "../pages/admin/Payments";
import AdminIremboApplications from "../pages/admin/IremboApplications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "ai-assistant", Component: AIAssistant },
      { path: "quiz", Component: Quiz },
      { path: "simulation", Component: Simulation },
      { path: "resources", Component: Resources },
      { path: "leaderboard", Component: Leaderboard },
      { path: "auth", Component: Auth },
      { path: "reset", Component: ResetPassword },
      { path: "irembo", Component: Irembo },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "users", Component: AdminUsers },
      { path: "questions", Component: AdminQuestions },
      { path: "payments", Component: AdminPayments },
      { path: "irembo", Component: AdminIremboApplications },
      // TODO: Add notifications and fraud-logs pages
      { path: "*", Component: () => <div className="p-8 text-center">Page coming soon...</div> },
    ],
  },
]);
