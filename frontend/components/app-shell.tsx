"use client";

import {
  Bell,
  Building2,
  CheckSquare2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Boxes,
  LayoutDashboard,
  Menu,
  MonitorPlay,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Visão geral", href: "/", icon: LayoutDashboard },
  { label: "Oportunidades", href: "/oportunidades", icon: CircleDollarSign },
  { label: "Diagnósticos", href: "/diagnosticos", icon: ClipboardCheck },
  { label: "Storage", href: "/storage", icon: Boxes },
  { label: "Clientes", href: "/clientes", icon: Building2 },
  { label: "Demos", href: "/demos", icon: MonitorPlay },
  { label: "Tarefas", href: "/tarefas", icon: CheckSquare2, badge: "4" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            T
          </div>
          <div>
            <strong>Termak</strong>
            <span>Diagnóstico operacional</span>
          </div>
          <button
            className="icon-button sidebar-close"
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <nav className="main-navigation" aria-label="Navegação principal">
          <p className="nav-label">Workspace</p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${active ? "nav-item-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="workspace-status">
            <span className="status-dot" />
            <div>
              <strong>Workspace comercial</strong>
              <span>Todos os dados sincronizados</span>
            </div>
          </div>
        </div>
      </aside>

      {open ? (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="app-column">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>

          <label className="global-search">
            <Search size={17} aria-hidden="true" />
            <input
              type="search"
              placeholder="Pesquisar empresa, diagnóstico ou contacto..."
              aria-label="Pesquisar"
            />
            <kbd>⌘ K</kbd>
          </label>

          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="Notificações">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <button className="profile-button" type="button">
              <span className="avatar">DM</span>
              <span className="profile-copy">
                <strong>Diogo Martins</strong>
                <small>Consultor</small>
              </span>
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
