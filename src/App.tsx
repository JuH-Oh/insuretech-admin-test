import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import DashboardPage from "@/pages/DashboardPage";
import ClaimsPage from "@/pages/ClaimsPage";
import TypeAPage from "@/pages/TypeAPage";
import TypeBPage from "@/pages/TypeBPage";
import TypeCPage from "@/pages/TypeCPage";
import ApprovePage from "@/pages/ApprovePage";
import OpinionPage from "@/pages/OpinionPage";

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/claims" element={<ClaimsPage />} />
            <Route path="/type-a" element={<TypeAPage />} />
            <Route path="/type-b" element={<TypeBPage />} />
            <Route path="/type-c" element={<TypeCPage />} />
            <Route path="/approve" element={<ApprovePage />} />
            <Route path="/opinion" element={<OpinionPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
