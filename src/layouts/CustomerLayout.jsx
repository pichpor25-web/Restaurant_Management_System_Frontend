import { Outlet } from "react-router-dom";
import MusicButton from "../features/music/MusicButton.jsx";

// Customers reach this via QR code – no login, no sidebar.
// MusicButton lives here so the song keeps playing between customer pages.
const CustomerLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Outlet />
    <MusicButton />
  </div>
);

export default CustomerLayout;
