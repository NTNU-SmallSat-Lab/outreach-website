import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
const STRAPI_URL = process.env.STRAPI_URL;

const AvatarImageFix = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, src, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        src={STRAPI_URL + "_next/image?url=" + src + "&w=100&q=100"}
        {...props}
    />
));
AvatarImageFix.displayName = "AvatarImageFix";

export { AvatarImageFix };
