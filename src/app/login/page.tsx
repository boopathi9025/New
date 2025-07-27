import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Log in to your FarmFlow account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/register">
                    Register here
                </Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
