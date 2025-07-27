"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // In a real app, you'd have a separate register function.
    // We'll use the login function which also handles new user creation for this mock.
    const registered = login(email, role);
    
    if (registered) {
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
      router.push(role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer');
    } else {
      setError("An error occurred during registration.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
       {error && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
       <div className="space-y-3">
        <Label>Register as</Label>
        <RadioGroup defaultValue="buyer" value={role} onValueChange={(value) => setRole(value as 'buyer' | 'seller')} className="flex space-x-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="buyer" id="r-buyer" />
                <Label htmlFor="r-buyer">Buyer</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="seller" id="r-seller" />
                <Label htmlFor="r-seller">Seller</Label>
            </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
}
