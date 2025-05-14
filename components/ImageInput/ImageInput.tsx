'use client';

import { ECG_IMAGE_PARSE_URL } from '@/api';
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
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FileQuestion, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ALLOWED_FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

export const ImageInput = () => {
   const translation = useTranslation();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);

   const setImageFile = useBearStore((state) => state.setImageFile);
   const setSamplingRate = useBearStore((state) => state.setSamplingRate);
   const setECGData = useBearStore((state) => state.setECGData);

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

   const onSubmit = async () => {
      setIsLoading(true);

      const { image, samplingRate } = form.getValues();

      const formData = new FormData();
      formData.append('image_file', image);
      // formData.append('samplingRate', samplingRate.toString());

      const response = await axios.post(ECG_IMAGE_PARSE_URL, formData);

      setIsLoading(false);

      if (response.status === 200) {
         setECGData(response.data);
         router.push('/plot');
      } else {
         toast.error(translation.messages.parsingError);
      }
   };

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

                              if (file) {
                                 field.onChange(file || undefined);
                                 setImageFile(file);
                              }
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
                           onChange={(e) => {
                              const value = Number(e.target.value);

                              field.onChange(value);
                              setSamplingRate(value);
                           }}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex justify-center items-center">
               <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />}
                  {translation.imageInput.detectButton}
               </Button>
            </div>
         </form>
      </Form>
   );
};
