import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("warehouse_staff");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Signup failed");
      }
      
      await response.json();
      
      toast({
        title: "Account created",
        description: "Welcome to StockMaster",
      });
      setLocation("/app/dashboard");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="h-min-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-lg w-full space-y-8">
            {/* Logo */}
            <div className="text-center space-y-2">
                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                        <Package className="h-8 w-8 text-primary-foreground" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-white">StockMaster</h1>
                <p className="text-slate-400">Inventory Control System</p>
            </div>

            {/* Signup Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>Get started with StockMaster today</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                data-testid="input-name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                data-testid="input-email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger data-testid="select-role">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="warehouse_staff">Warehouse Staff</SelectItem>
                                    <SelectItem value="inventory_manager">Inventory Manager</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                data-testid="input-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                data-testid="input-confirm-password"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-submit">
                            {isLoading ? "Creating account..." : "Create account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login">
                            <a className="text-primary hover:underline" data-testid="link-login">
                                Sign in
                            </a>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center">
                <Link href="/">
                    <a className="text-sm text-slate-400 hover:text-white" data-testid="link-back-home">
                        ← Back to home
                    </a>
                </Link>
            </div>
        </div>
    </div>
);
}

