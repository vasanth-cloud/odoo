import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast.js";

export default function Login() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            await response.json();

            toast({
                title: "Login successful",
                description: "Welcome back to StockMaster",
            });
            setLocation("/app/dashboard");
        } catch (error) {
            toast({
                title: "Login failed",
                description: "Invalid email or password",
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

                    </div>
                    <h1 className="text-3xl font-bold text-white">StockMaster</h1>
                    <p className="text-slate-400">Inventory Control System</p>
                </div>

                {/* Login Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    data-testid="input-email"
                                />
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
                            <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-submit">
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>

                        <div className="mt-6 space-y-4 text-center text-sm">
                            <Link href="/reset">
                                <a className="text-primary hover:underline" data-testid="link-forgot-password">
                                    Forgot password?
                                </a>
                            </Link>
                            <div className="text-muted-foreground">
                                Don't have an account?{" "}
                                <Link href="/signup">
                                    <a className="text-primary hover:underline" data-testid="link-signup">
                                        Create account
                                    </a>
                                </Link>
                            </div>
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

