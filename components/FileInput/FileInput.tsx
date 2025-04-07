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

const FormSchema = z.object({
  hea_file: z
    .instanceof(File, { message: "A valid file is required." })
    .refine(
      (file) => file.name.toLowerCase().endsWith(".hea"),
      "Invalid file extension. See supported extensions.",
    ),
  dat_file: z
    .instanceof(File, { message: "A valid file is required." })
    .refine(
      (file) => file.name.toLowerCase().endsWith(".dat"),
      "Invalid file extension. See supported extensions.",
    ),
  xws_file: z
    .instanceof(File, { message: "A valid file is required." })
    .refine(
      (file) => file.name.toLowerCase().endsWith(".xws"),
      "Invalid file extension. See supported extensions.",
    ),
});

export const FileInput = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hea_file: undefined,
      dat_file: undefined,
      xws_file: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // console.log("Uploaded file:", values.file);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6"
      >
        <FormField
          control={form.control}
          name="hea_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload ECG Recording Header File</FormLabel>
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
                    Field accepts a <b>.hea</b> header file specified by WFDB
                    format.
                  </HoverCardContent>
                </HoverCard>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dat_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload ECG Recording Data File</FormLabel>
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
                    Field accepts a <b>.dat</b> data file specified by WFDB.
                    format
                  </HoverCardContent>
                </HoverCard>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="xws_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload ECG Recording Annotations File</FormLabel>
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
                    Field accepts a <b>.xws</b> annotations file specified by
                    WFDB format.
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
