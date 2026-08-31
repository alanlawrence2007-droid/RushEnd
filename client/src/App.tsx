/* Vaqo / Signal Cartography: one shared shell, one live signal context, many ways to decide. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import AppShell from "./components/AppShell";
import VaqoVideoIntro from "./components/VaqoVideoIntro";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QueueProvider } from "./contexts/QueueContext";
import Home from "./pages/Home";
import PlanPage from "./pages/PlanPage";
import DiscoverPage from "./pages/DiscoverPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import LocationPage from "./pages/LocationPage";
import NotFound from "./pages/NotFound";

function Router() {
  return <AppShell><Switch>
    <Route path="/" component={Home} />
    <Route path="/plan" component={PlanPage} />
    <Route path="/discover" component={DiscoverPage} />
    <Route path="/community" component={CommunityPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/location/:id" component={LocationPage} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></AppShell>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark">      <QueueProvider><TooltipProvider><Toaster theme="dark" /><VaqoVideoIntro><Router /></VaqoVideoIntro></TooltipProvider></QueueProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
