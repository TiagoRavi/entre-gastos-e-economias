import { Outlet } from "react-router-dom"
import Sidebar from "../shared/components/navigation/Sidebar"
import Topbar from "../shared/components/navigation/Topbar"

export default function DashboardLayout() {
  return (
    <div>

      <Topbar />
      <Sidebar />

      <main
        style={{
          marginLeft: "240px",
          paddingTop: "64px",
          minHeight: "100vh",
          background: "#f3f4f6"
        }}
      >
        <div
          style={{
            padding: "30px 40px"
          }}
        >
          <Outlet />
        </div>
      </main>

    </div>
  )
}