import { Link, useLocation } from "wouter";
import { Package, LayoutDashboard, PackageSearch, FileText, BookOpen, Settings, User, Bell, Search, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils.js";

const tabs = [
  { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/products", label: "Products", icon: PackageSearch },
  { path: "/app/operations", label: "Operations", icon: FileText },
  { path: "/app/ledger", label: "Ledger", icon: BookOpen },
  { path: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }) {
  const [location, setLocation] = useLocation();

  const isActive = (path) => location === path || location.startsWith(path + "/");

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          {/* Logo */}
          <Link href="/app/dashboard">
            <a className="flex items-center gap-2 font-bold text-lg" data-testid="link-logo">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden md:inline">StockMaster</span>
            </a>
          </Link>

          {/* Desktop Tabs */}
          <nav className="hidden lg:flex items-center gap-2 flex-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link key={tab.path} href={tab.path}>
                  <Button
                    variant={isActive(tab.path) ? "secondary" : "ghost"}
                    size="sm"
                    className="gap-2"
                    data-testid={`tab-${tab.label.toLowerCase()}`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 lg:flex-none lg:w-64 xl:w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search SKU or product..."
                className="pl-9"
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/app/profile">
                <DropdownMenuItem data-testid="menu-profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/app/settings">
                <DropdownMenuItem data-testid="menu-settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Tabs - Horizontal Scroll */}
        <div className="lg:hidden border-t overflow-x-auto">
          <nav className="flex items-center gap-1 px-2 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link key={tab.path} href={tab.path}>
                  <Button
                    variant={isActive(tab.path) ? "secondary" : "ghost"}
                    size="sm"
                    className="gap-2 whitespace-nowrap"
                    data-testid={`tab-mobile-${tab.label.toLowerCase()}`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t">
        <div className="grid grid-cols-5 h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link key={tab.path} href={tab.path}>
                <button
                  className={cn(
                    "flex flex-col items-center justify-center h-full gap-1 hover-elevate active-elevate-2",
                    isActive(tab.path) && "text-primary"
                  )}
                  data-testid={`bottom-tab-${tab.label.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

