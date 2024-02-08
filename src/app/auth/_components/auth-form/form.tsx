"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthTypes } from "@/constants/auth-types";
import { authSchema } from "@/lib/validation";

function RegisterForm() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");
  const router = useRouter();
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    if (prompt === AuthTypes.LOGIN) {
      router.push(
        `/api/auth/login?connection_id=${process.env.NEXT_PUBLIC_KINDE_EMAIL_CONNECTION_ID}&login_hint=${values.email}&prompt=login`,
      );
    }
    if (prompt === AuthTypes.REGISTER) {
      router.push(
        `/api/auth/register?connection_id=${process.env.NEXT_PUBLIC_KINDE_EMAIL_CONNECTION_ID}&login_hint=${values.email}&prompt=login`,
      );
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex w-full items-center justify-center"
            disabled={!form.formState.isValid}
          >
            {prompt === AuthTypes.LOGIN ? "Login" : "Register"} with email
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
