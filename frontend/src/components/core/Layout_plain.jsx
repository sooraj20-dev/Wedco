import { Outlet } from "react-router-dom";

export default function Layout_plain() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
