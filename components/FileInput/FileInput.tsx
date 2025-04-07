'use client';

import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const FileInput = () => {
   const translation = useTranslation();

   const FormSchema = z.object({
      hea_file: z
         .instanceof(File, {
            message: translation.fileInput.validFileIsRequired,
         })
         .refine(
            (file) => file.name.toLowerCase().endsWith('.hea'),
            translation.fileInput.invalidFileExtension,
         ),
      dat_file: z
         .instanceof(File, {
            message: translation.fileInput.validFileIsRequired,
         })
         .refine(
            (file) => file.name.toLowerCase().endsWith('.dat'),
            translation.fileInput.invalidFileExtension,
         ),
      xws_file: z
         .instanceof(File, {
            message: translation.fileInput.validFileIsRequired,
         })
         .refine(
            (file) => file.name.toLowerCase().endsWith('.xws'),
            translation.fileInput.invalidFileExtension,
         ),
   });

   const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         hea_file: undefined,
         dat_file: undefined,
         xws_file: undefined,
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
               name="hea_file"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        {translation.fileInput.headerFileHeader}
                     </FormLabel>
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
                              {translation.fileInput.seeSupportedFiles}
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.fileInput.headerFileDescription}
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
                     <FormLabel>
                        {translation.fileInput.dataFileHeader}
                     </FormLabel>
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
                              {translation.fileInput.seeSupportedFiles}
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.fileInput.dataFileDescription}
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
                     <FormLabel>
                        {translation.fileInput.annotationsFileHeader}
                     </FormLabel>
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
                              {translation.fileInput.seeSupportedFiles}
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.fileInput.annotationsFileDescription}
                           </HoverCardContent>
                        </HoverCard>
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex justify-center items-center">
               <Button type="submit">
                  {translation.fileInput.detectButton}
               </Button>
            </div>
         </form>
      </Form>
   );
};
