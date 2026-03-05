import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

export default function DashboardLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f3f4f6"
        }}
      >

        <Topbar />

        <main
          style={{
            flex: 1,
            padding: "30px 40px",
            overflow: "auto"
          }}
        >
          <Outlet />
        </main>

      </div>

    </div>
  )
}