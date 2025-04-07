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
import { useTranslation } from "@/hooks/useTranslation";

const ALLOWED_FILE_EXTENSIONS = [".png", ".jpg", ".jpeg"];

export const ImageInput = () => {
  const translation = useTranslation();

  const FormSchema = z.object({
    image: z
      .instanceof(File, { message: translation.imageInput.validFileIsRequired })
      .refine(
        (file) =>
          ALLOWED_FILE_EXTENSIONS.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
          ),
        translation.imageInput.invalidFileExtension,
      ),
    samplingRate: z
      .number()
      .refine(
        (num) => num >= 50 && num <= 1000,
        translation.imageInput.invalidSamplingRate,
      ),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: undefined,
      samplingRate: 250,
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translation.imageInput.imageFileHeader}</FormLabel>
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
                  <HoverCardTrigger>
                    {translation.imageInput.seeSupportedFiles}
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {translation.imageInput.imageFileDescription}
                  </HoverCardContent>
                </HoverCard>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="samplingRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translation.imageInput.samplingRateHeader}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                <HoverCard openDelay={0} closeDelay={150}>
                  <HoverCardTrigger>
                    {translation.imageInput.seeSupportedValues}
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {translation.imageInput.samplingRateDescription}
                  </HoverCardContent>
                </HoverCard>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit">{translation.imageInput.detectButton}</Button>
        </div>
      </form>
    </Form>
  );
};
