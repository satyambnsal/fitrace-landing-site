import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { VideoIcon } from 'lucide-react';

export function PresentationModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="no-underline  flex items-center gap-2 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                    <VideoIcon />
                    <span>Watch Demo</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] text-black bg-transparent backdrop-blur-md border-none bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                <div className="p-4">
                    <video
                        src="/video/demo.mov"
                        width={400}
                        height={500}
                        controls={true}
                        muted={true}
                        className="max-h-[calc(100vh-115px)]"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
