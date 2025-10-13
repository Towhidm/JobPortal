"use client ";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SignUpActions from "@/actions/signupform";
import { useActionState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [formstate, actions] = useActionState(SignUpActions, { errors: {} });
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={actions}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                {formstate.errors.email && (
                  <span className="text-sm text-red-600">
                    {formstate.errors.email}
                  </span>
                )}
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                {formstate.errors.password && (
                  <span className="text-sm text-red-600">
                    {formstate.errors.password}
                  </span>
                )}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                name="confirm-password"
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <RadioGroup defaultValue="jobseeker" name="role">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="employer" id="r1" />
                <Label htmlFor="r1">Employer </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="jobseeker" id="r2" />
                <Label htmlFor="r2">Jobseeker</Label>
              </div>
            </RadioGroup>
            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer">
                  Create Account
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="./login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
