/* RushEnd / Signal Cartography: one shared shell, one live signal context, many ways to decide. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import AppShell from "./components/AppShell";
import RushEndIntroOverlay from "./components/RushEndIntroOverlay";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QueueProvider } from "./contexts/QueueContext";
import { RushEndAuthProvider } from "./contexts/RushEndAuthContext";
import Home from "./pages/Home";
import PlanPage from "./pages/PlanPage";
import DiscoverPage from "./pages/DiscoverPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import LocationPage from "./pages/LocationPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import LiveStatusPage from "./pages/LiveStatusPage";
import StaffDashboardPage from "./pages/StaffDashboardPage";
import RatePage from "./pages/RatePage";
import SharedStatusPage from "./pages/SharedStatusPage";

function Router() {
  const basePath = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <WouterRouter base={basePath}><AppShell><Switch>
    <Route path="/" component={Home} />
    <Route path="/plan" component={PlanPage} />
    <Route path="/discover" component={DiscoverPage} />
    <Route path="/community" component={CommunityPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/location/:id" component={LocationPage} />
    <Route path="/auth" component={AuthPage} />
    <Route path="/status/:id" component={LiveStatusPage} />
    <Route path="/staff" component={StaffDashboardPage} />
    <Route path="/rate/:id" component={RatePage} />
    <Route path="/shared/:code" component={SharedStatusPage} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></AppShell></WouterRouter>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><RushEndAuthProvider><QueueProvider><TooltipProvider><Toaster theme="dark" /><RushEndIntroOverlay><Router /></RushEndIntroOverlay></TooltipProvider></QueueProvider></RushEndAuthProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
