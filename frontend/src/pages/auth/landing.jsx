import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, TrendingUp, Bell, FileText, ArrowRight, Truck, Building2, RefreshCw, ClipboardCheck } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-700/50" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Real-time control of your stock,{" "}
                  <span className="text-primary">in one place</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300">
                  Replace Excel spreadsheets and manual registers with centralized inventory management. 
                  Track every movement, prevent stockouts, and optimize your warehouse operations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20" data-testid="button-login">
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Dashboard Preview */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 space-y-2 bg-white/10 backdrop-blur-md border-white/20">
                  <Package className="h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold">1,247</div>
                  <div className="text-sm text-slate-300">Total Products</div>
                </Card>
                <Card className="p-6 space-y-2 bg-white/10 backdrop-blur-md border-white/20">
                  <Bell className="h-8 w-8 text-warning" />
                  <div className="text-3xl font-bold">23</div>
                  <div className="text-sm text-slate-300">Low Stock</div>
                </Card>
                <Card className="p-6 space-y-2 bg-white/10 backdrop-blur-md border-white/20">
                  <TrendingUp className="h-8 w-8 text-success" />
                  <div className="text-3xl font-bold">89</div>
                  <div className="text-sm text-slate-300">Pending Receipts</div>
                </Card>
                <Card className="p-6 space-y-2 bg-white/10 backdrop-blur-md border-white/20">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold">156</div>
                  <div className="text-sm text-slate-300">Operations</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need to manage inventory</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From receiving goods to shipping orders, track every product movement with precision and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-4 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Stock Visibility</h3>
              <p className="text-muted-foreground">
                Know exactly what you have, where it is, and when to reorder. No more guesswork.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Multi-Warehouse Support</h3>
              <p className="text-muted-foreground">
                Manage inventory across multiple locations with specific storage zones and bins.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold">Low Stock Alerts</h3>
              <p className="text-muted-foreground">
                Automatic notifications when products fall below minimum levels. Never run out again.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Complete Stock Ledger</h3>
              <p className="text-muted-foreground">
                Every movement tracked and timestamped. Full audit trail for compliance and analysis.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Inventory Flow Timeline */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Your complete inventory workflow</h2>
            <p className="text-lg text-muted-foreground">
              From supplier to customer, track every step of your stock journey
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <Truck className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">Receive Goods</h3>
                <p className="text-muted-foreground text-sm">
                  Log incoming shipments from suppliers. Update stock levels instantly.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <RefreshCw className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">Internal Transfers</h3>
                <p className="text-muted-foreground text-sm">
                  Move stock between warehouses and locations seamlessly.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <Package className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">Deliver Orders</h3>
                <p className="text-muted-foreground text-sm">
                  Process customer orders and shipments with accurate picking.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  4
                </div>
                <ClipboardCheck className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">Adjust Stock</h3>
                <p className="text-muted-foreground text-sm">
                  Reconcile physical counts with system records easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">StockMaster</h3>
              <p className="text-slate-400">
                Modern inventory management for warehouse and operations teams.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 StockMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

