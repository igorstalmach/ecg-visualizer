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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { CircleHelp, FileQuestion, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const FileInput = () => {
   const translation = useTranslation();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(0);

   const showFullSignal = useBearStore((state) => state.showFullSignal);

   const setHeaFile = useBearStore((state) => state.setHeaFile);
   const setDatFile = useBearStore((state) => state.setDatFile);
   const setXwsFile = useBearStore((state) => state.setXwsFile);
   const setECGData = useBearStore((state) => state.setECGData);
   const setShowFullSignal = useBearStore((state) => state.setShowFullSignal);

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

      try {
         const response = await axios.post(
            `${ECG_WFDB_FILES_PARSE_URL}?crop_idx=0&show_full_signal=${showFullSignal}`,
            formData,
            {
               onUploadProgress: (progressEvent) => {
                  const percent = Math.round(
                     (progressEvent.loaded * 100) / (progressEvent.total || 1),
                  );
                  setUploadProgress(percent);
               },
            },
         );

         if (response.status === 200 && response.data.channels) {
            setECGData(response.data);
            router.push('/plot');
         } else if (response.status === 200) {
            toast.info(translation.messages.noDataFound);
            setIsLoading(false);
         } else {
            toast.error(translation.messages.parsingError);
         }
      } catch (err) {
         toast.error(translation.messages.parsingError);
         console.error(err);
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
            <div className="flex flex-col gap-6 justify-center items-center">
               <div className="flex items-center space-x-2">
                  <Switch
                     id="preview-recording"
                     checked={showFullSignal}
                     onClick={() => {
                        setShowFullSignal(!showFullSignal);
                     }}
                  />
                  <Label htmlFor="preview-recording">
                     {translation.fileInput.previewRecording}
                     <HoverCard openDelay={0} closeDelay={150}>
                        <HoverCardTrigger>
                           <CircleHelp
                              size={16}
                              strokeWidth={1.75}
                              className="cursor-help"
                           />
                        </HoverCardTrigger>
                        <HoverCardContent>
                           {translation.fileInput.previewRecordingDescription}
                        </HoverCardContent>
                     </HoverCard>
                  </Label>
               </div>
               <Button
                  type="submit"
                  disabled={
                     isLoading ||
                     !form.watch('hea_file') ||
                     !form.watch('dat_file') ||
                     !form.watch('xws_file')
                  }
               >
                  {isLoading && (
                     <>
                        <Loader2 className="animate-spin" />
                        <span>{uploadProgress}%</span>
                     </>
                  )}
                  {translation.fileInput.detectButton}
               </Button>
            </div>
         </form>
      </Form>
   );
};
