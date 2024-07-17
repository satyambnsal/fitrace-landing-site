import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { VideoIcon } from 'lucide-react';

export function PresentationModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="inline-block text-blue-300 no-underline hover:text-pink-500 flex items-center gap-2 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                    <VideoIcon />
                    <span>Watch Demo</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="p-4">
                    <video
                        src="/video/demo.mov"
                        width={600}
                        height={300}
                        controls={true}
                        muted={true}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
