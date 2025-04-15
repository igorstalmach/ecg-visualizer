import { Button } from '@/components/ui/button';
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useTranslation } from '@/hooks/useTranslation';

export const Status = () => {
   const translation = useTranslation();

   return (
      <div className="absolute bottom-5 left-5 z-50">
         <HoverCard openDelay={0} closeDelay={150}>
            <HoverCardTrigger>
               <Button variant="outline">
                  <div className="w-3 h-3 rounded-full bg-[lightgreen] mr-2" />
                  {translation.status.statusHeader}
               </Button>
            </HoverCardTrigger>
            <HoverCardContent>
               {translation.status.statusDescription}
            </HoverCardContent>
         </HoverCard>
      </div>
   );
};
