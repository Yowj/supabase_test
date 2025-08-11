import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { session, loading } = useAuth();

  // Show loading screen while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={session ? <Home /> : <Navigate to="/auth" replace />} />
          <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/" replace />} />
          {/* Legacy redirects */}
          <Route path="/signin" element={<Navigate to="/auth?mode=sign_in" replace />} />
          <Route path="/signup" element={<Navigate to="/auth?mode=sign_up" replace />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
