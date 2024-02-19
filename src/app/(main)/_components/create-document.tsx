"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getPhotoFromUnsplash } from "@/lib/unsplash";

import { api } from "../../../../convex/_generated/api";

type Props = {};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

const CreateDocument = (props: Props) => {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const create = useMutation(api.document.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // const coverImage = await getPhotoFromUnsplash({ query: values.title });

    const promise = getPhotoFromUnsplash({ query: values.title }).then(
      ({ photoUrl, blurHash }) => {
        create({
          title: values.title,
          coverImage: photoUrl,
          blurHash: blurHash as string,
        })
          .then
          //   //   router.push(`/documents/${documentId}`),
          ();
      },
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  }

  return (
    <Card className="flex h-full flex-col items-center justify-center space-y-4">
      <CardHeader>
        <CardTitle>{user?.given_name}, welcome to Smartnote.</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Create your first note note"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex w-full justify-between">
              <DialogClose>
                <Button variant={"ghost"}>Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit">Create a note</Button>
              </DialogClose>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateDocument;
