import { Outlet } from "react-router-dom"
import Sidebar from "../shared/components/navigation/Sidebar"
import Topbar from "../shared/components/navigation/Topbar"
import Footer from "../shared/components/navigation/Footer"

export default function DashboardLayout() {
  return (
    <div>
      <Topbar />
      <Sidebar />

      <main style={mainStyle}>
        <div style={contentWrapper}>

          <div style={contentStyle}>
            <Outlet />
          </div>

          <Footer />

        </div>
      </main>
    </div>
  )
}

const mainStyle = {
  marginLeft: "260px",
  paddingTop: "72px",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)"
}

const contentWrapper = {
  minHeight: "calc(100vh - 72px)",
  display: "flex",
  flexDirection: "column" as const
}

const contentStyle = {
  flex: 1,
  padding: "32px 40px"
}