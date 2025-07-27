import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
          <CardDescription>Join FarmFlow to buy and sell agricultural goods</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
           <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/login">
                    Login here
                </Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
