'use client';

import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
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
import { FileQuestion } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ALLOWED_FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

export const ImageInput = () => {
   const translation = useTranslation();

   const FormSchema = z.object({
      image: z
         .instanceof(File, {
            message: translation.imageInput.validFileIsRequired,
         })
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
            className="w-full max-w-lg space-y-9"
         >
            <FormField
               control={form.control}
               name="image"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        {translation.imageInput.imageFileHeader}
                        <HoverCard openDelay={0} closeDelay={150}>
                           <HoverCardTrigger>
                              <FileQuestion
                                 size={16}
                                 strokeWidth={1.75}
                                 className="cursor-help"
                              />
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.imageInput.imageFileDescription}
                           </HoverCardContent>
                        </HoverCard>
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
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="samplingRate"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        {translation.imageInput.samplingRateHeader}
                        <HoverCard openDelay={0} closeDelay={150}>
                           <HoverCardTrigger>
                              <FileQuestion
                                 size={16}
                                 strokeWidth={1.75}
                                 className="cursor-help"
                              />
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.imageInput.samplingRateDescription}
                           </HoverCardContent>
                        </HoverCard>
                     </FormLabel>
                     <FormControl>
                        <Input
                           type="number"
                           value={field.value}
                           onChange={(e) =>
                              field.onChange(Number(e.target.value))
                           }
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex justify-center items-center">
               <Button type="submit">
                  {translation.imageInput.detectButton}
               </Button>
            </div>
         </form>
      </Form>
   );
};
