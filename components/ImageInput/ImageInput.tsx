'use client';

import { ECG_IMAGE_PARSE_URL } from '@/api';
import { ManualCropper } from '@/components/ManualCropper';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
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
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
import { useBearStore } from '@/hooks/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FileQuestion, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ALLOWED_FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

export const ImageInput = () => {
   const translation = useTranslation();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);
   const [isCropperVisible, setIsCropperVisible] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(0);

   // const showFullGraph = useBearStore((state) => state.showFullSignal);

   const setImageFile = useBearStore((state) => state.setImageFile);
   const setECGData = useBearStore((state) => state.setECGData);
   // const setShowFullGraph = useBearStore((state) => state.setShowFullSignal);

   const fileInputRef = useRef<HTMLInputElement | null>(null);

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
   });

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         image: undefined,
      },
   });

   const onSubmit = async () => {
      setIsLoading(true);
      const { image } = form.getValues();

      const formData = new FormData();
      formData.append('image_file', image);

      try {
         const response = await axios.post(ECG_IMAGE_PARSE_URL, formData, {
            onUploadProgress: (progressEvent) => {
               const percent = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total || 1),
               );
               setUploadProgress(percent);
            },
         });

         if (response.status === 200) {
            setECGData(response.data);
            router.push('/plot');
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
         {isCropperVisible && form.watch('image') && (
            <>
               <Dialog defaultOpen>
                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle>
                           {translation.imageInput.cropperModalTitle}
                        </DialogTitle>
                        <DialogDescription>
                           {translation.imageInput.cropperModalDescription}
                        </DialogDescription>
                     </DialogHeader>
                  </DialogContent>
               </Dialog>
               <div className="absolute w-full h-full z-5">
                  <ManualCropper
                     imageFile={form.watch('image')}
                     onCropDoneAction={(file) => {
                        form.setValue('image', file);
                        setImageFile(file);
                        setIsCropperVisible(false);
                     }}
                  />
                  <div className="absolute top-6 right-6 z-11">
                     <Button
                        variant="destructive"
                        onClick={() => {
                           setIsCropperVisible(false);
                           form.resetField('image');
                           fileInputRef.current!.value = '';
                        }}
                     >
                        {translation.manualCropper.cancel}
                     </Button>
                  </div>
               </div>
            </>
         )}

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
                           ref={fileInputRef}
                           accept="image/*"
                           onChange={(e) => {
                              const file = e.target.files?.[0];

                              if (file) {
                                 field.onChange(file);
                                 setImageFile(file);
                                 setIsCropperVisible(true);
                              }
                           }}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex flex-col gap-6 justify-center items-center">
               {/*<div className="flex items-center space-x-2">*/}
               {/*   <Switch*/}
               {/*      id="preview-recording"*/}
               {/*      checked={showFullGraph}*/}
               {/*      onClick={() => {*/}
               {/*         setShowFullGraph(!showFullGraph);*/}
               {/*      }}*/}
               {/*   />*/}
               {/*   <Label htmlFor="preview-recording">*/}
               {/*      {translation.imageInput.previewRecording}*/}
               {/*      <HoverCard openDelay={0} closeDelay={150}>*/}
               {/*         <HoverCardTrigger>*/}
               {/*            <CircleHelp*/}
               {/*               size={16}*/}
               {/*               strokeWidth={1.75}*/}
               {/*               className="cursor-help"*/}
               {/*            />*/}
               {/*         </HoverCardTrigger>*/}
               {/*         <HoverCardContent>*/}
               {/*            {translation.imageInput.previewRecordingDescription}*/}
               {/*         </HoverCardContent>*/}
               {/*      </HoverCard>*/}
               {/*   </Label>*/}
               {/*</div>*/}
               <Button
                  type="submit"
                  disabled={isLoading || !form.watch('image')}
               >
                  {isLoading && (
                     <>
                        <Loader2 className="animate-spin" />
                        <span>{uploadProgress}%</span>
                     </>
                  )}
                  {translation.imageInput.detectButton}
               </Button>
            </div>
         </form>
      </Form>
   );
};
