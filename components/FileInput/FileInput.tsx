'use client';

import { ECG_WFDB_FILES_PARSE_URL } from '@/api';
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

export const FileInput = () => {
   const translation = useTranslation();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);

   const setHeaFile = useBearStore((state) => state.setHeaFile);
   const setDatFile = useBearStore((state) => state.setDatFile);
   const setXwsFile = useBearStore((state) => state.setXwsFile);
   const setECGData = useBearStore((state) => state.setECGData);

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

   const onSubmit = async () => {
      setIsLoading(true);

      const { hea_file, dat_file, xws_file } = form.getValues();

      const formData = new FormData();
      formData.append('hea_file', hea_file);
      formData.append('dat_file', dat_file);
      formData.append('xws_file', xws_file);

      const response = await axios.post(ECG_WFDB_FILES_PARSE_URL, formData);

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
               name="hea_file"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        {translation.fileInput.headerFileHeader}
                        <HoverCard openDelay={0} closeDelay={150}>
                           <HoverCardTrigger>
                              <FileQuestion
                                 size={16}
                                 strokeWidth={1.75}
                                 className="cursor-help"
                              />
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.fileInput.headerFileDescription}
                           </HoverCardContent>
                        </HoverCard>
                     </FormLabel>
                     <FormControl>
                        <Input
                           type="file"
                           onChange={(e) => {
                              const file = e.target.files?.[0];

                              if (file) {
                                 field.onChange(file);
                                 setHeaFile(file);
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
               name="dat_file"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        {translation.fileInput.dataFileHeader}
                        <HoverCard openDelay={0} closeDelay={150}>
                           <HoverCardTrigger>
                              <FileQuestion
                                 size={16}
                                 strokeWidth={1.75}
                                 className="cursor-help"
                              />
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.fileInput.dataFileDescription}
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
                                 setDatFile(file);
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
               name="xws_file"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        {translation.fileInput.annotationsFileHeader}
                        <HoverCard openDelay={0} closeDelay={150}>
                           <HoverCardTrigger>
                              <FileQuestion
                                 size={16}
                                 strokeWidth={1.75}
                                 className="cursor-help"
                              />
                           </HoverCardTrigger>
                           <HoverCardContent>
                              {translation.fileInput.annotationsFileDescription}
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
                                 setXwsFile(file);
                              }
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
                  {translation.fileInput.detectButton}
               </Button>
            </div>
         </form>
      </Form>
   );
};
