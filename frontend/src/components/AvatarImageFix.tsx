import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AvatarImageFix = React.forwardRef<
    React.ElementRef<typeof Image>,
    React.ComponentPropsWithoutRef<typeof Image>
>(({ className, src, ...props }, ref) => (
    <Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        src={src}
        {...props}
    />
));
AvatarImageFix.displayName = "AvatarImageFix";

export { AvatarImageFix };
