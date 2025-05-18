
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCards from "./pages/admin/Cards";
import AdminUsers from "./pages/admin/Users";
import AdminCardDetail from "./pages/admin/CardDetail";
import AdminUserDetail from "./pages/admin/UserDetail";
import UserDashboard from "./pages/user/Dashboard";
import UserCards from "./pages/user/Cards";
import UserCardCreate from "./pages/user/CardCreate";
import UserCardDetail from "./pages/user/CardDetail";
import PublicCardView from "./pages/PublicCardView";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cards/:id/view" element={<PublicCardView />} />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/cards" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCards />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/cards/:id" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCardDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users/:id" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUserDetail />
                </ProtectedRoute>
              } 
            />

            {/* User Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cards" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserCards />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cards/create" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserCardCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cards/:id" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserCardDetail />
                </ProtectedRoute>
              } 
            />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
