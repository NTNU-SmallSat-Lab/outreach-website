import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Label } from "@/components/ui/label";

type ContactCardProps = {
    name: string;
    role: string;
    imageUrl: string;
    externalUrl: string;
    handleClick: () => void; // Adjust the type if your event handler has a different signature
};

export function ContactCard({
    name,
    role,
    imageUrl,
    externalUrl,
    handleClick,
}: ContactCardProps) {
    return (
        <Card className="w-[350px] m-2">
            <CardHeader>
                <Avatar>
                    <AvatarImage src={imageUrl} alt={name} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{name}</CardTitle>
                <Label>{role}</Label>
            </CardHeader>
            <CardContent>
                <a href={externalUrl} className="hover:underline blue">
                    NTNU
                </a>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button onClick={handleClick}>Contact</Button>
            </CardFooter>
        </Card>
    );
}
