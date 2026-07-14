import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AppShell } from "@/layout/AppShell";
import { WorkspaceShell } from "@/layout/WorkspaceShell";
import { PlatformAdminPage } from "@/pages/PlatformAdmin/PlatformAdminPage";
import { WorkspacePortalPage } from "@/pages/WorkspacePortal/WorkspacePortalPage";
import {
  getInitialTheme,
} from "@/components/themeToggle/ThemeToggle";
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
          <Route path="/" element={<PlatformAdminPage />} />
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
