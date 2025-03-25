"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ALLOWED_FILE_EXTENSIONS = [".bat", ".png", ".jpg", ".jpeg"];

const FormSchema = z.object({
  file: z
    .instanceof(File, { message: "A valid file is required." })
    .refine(
      (file) =>
        ALLOWED_FILE_EXTENSIONS.some((ext) =>
          file.name.toLowerCase().endsWith(ext),
        ),
      "Invalid file extension. See supported extensions.",
    ),
});

export const FileInput = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("Uploaded file:", values.file);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload ECG Recording</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file || undefined);
                  }}
                />
              </FormControl>
              <FormDescription>
                <HoverCard openDelay={0} closeDelay={150}>
                  <HoverCardTrigger>See supported files</HoverCardTrigger>
                  <HoverCardContent>
                    Detector accepts:
                    <br></br> - <b>.bat</b> files in WFDB format.
                    <br></br> - <b>.png</b> or <b>.jpg</b> image files.
                  </HoverCardContent>
                </HoverCard>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit">Detect</Button>
        </div>
      </form>
    </Form>
  );
};
