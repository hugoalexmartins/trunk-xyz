import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card, CardBody } from "@/components/Card";
import { useSignup } from "@/hooks/useSignup";

function SignupPageContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutate, isLoading, error } = useSignup();

  const validateForm = (): boolean => {
    setValidationError(null);
    if (!email) {
      setValidationError("Email is required");
      return false;
    }
    if (!password) {
      setValidationError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await mutate(email, password);
      router.push(
        "/auth/login?message=Account%20created%20successfully.%20Please%20log%20in.",
      );
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <Layout>
      <Container className="py-12 flex items-center justify-center min-h-[calc(100vh-theme(spacing.32))]">
        <Card className="w-full max-w-md" header="Sign Up" headerColor="cyan">
          <CardBody className="space-y-6">
            <p className="text-ink font-bold">Create a new account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {(error || validationError) && (
                <div className="p-4 bg-accent border-4 border-ink rounded-none text-white font-bold text-sm">
                  {error || validationError}
                </div>
              )}

              <Input
                id="email"
                type="email"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={isLoading}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                helperText="Minimum 8 characters"
                disabled={isLoading}
              />

              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <p className="text-center text-sm text-ink font-bold">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:text-secondary transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
}

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up · trunk-xyz</title>
      </Head>
      <SignupPageContent />
    </>
  );
}
