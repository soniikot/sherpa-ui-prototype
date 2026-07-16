import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { AppShell } from "@/layout/AppShell";
import { WorkspaceShell } from "@/layout/WorkspaceShell";
import { OverviewPage } from "@/pages/OwnerConsole/OverviewPage";
import { TenantsPage } from "@/pages/OwnerConsole/TenantsPage";
import { CapacityPage } from "@/pages/OwnerConsole/CapacityPage";
import { ModelsPage } from "@/pages/OwnerConsole/ModelsPage";
import { CostPage } from "@/pages/OwnerConsole/CostPage";
import { SecurityPage } from "@/pages/OwnerConsole/SecurityPage";
import { OperationsPage } from "@/pages/OwnerConsole/OperationsPage";
import { BackupsPage } from "@/pages/OwnerConsole/BackupsPage";
import { WorkspacePortalPage } from "@/pages/WorkspacePortal/WorkspacePortalPage";
import { getInitialTheme } from "@/components/themeToggle/ThemeToggle";
import type { ThemeMode } from "@/components/themeToggle/types";

function AppToaster() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const onThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeMode>).detail;
      if (detail === "light" || detail === "dark") {
        setTheme(detail);
      }
    };
    window.addEventListener("prototype-theme-change", onThemeChange);
    return () => {
      window.removeEventListener("prototype-theme-change", onThemeChange);
    };
  }, []);

  return (
    <Toaster theme={theme} position="bottom-right" richColors closeButton />
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/tenants" element={<TenantsPage />} />
          <Route path="/capacity" element={<CapacityPage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/cost" element={<CostPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/backups" element={<BackupsPage />} />
        </Route>
        <Route path="/workspace/:slug" element={<WorkspaceShell />}>
          <Route index element={<WorkspacePortalPage />} />
          <Route path="team" element={<WorkspacePortalPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AppToaster />
    </BrowserRouter>
  );
}
