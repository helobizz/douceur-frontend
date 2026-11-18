import { Cookie, LayoutDashboard } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full px-8 xl:px-12 items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Cookie size={29} strokeWidth={1.7} />
            </div>

            <div>
              <h1 className="font-heading text-3xl font-semibold leading-none text-primary">
                Douceur
              </h1>

              <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                Gestão de vendas
              </p>
            </div>
          </div>

          <nav>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="w-full px-8 py-8 xl:px-12">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
