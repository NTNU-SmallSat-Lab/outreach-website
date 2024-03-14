import * as React from "react";
import { ExternalLink } from "./ExternalLink";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Helpers from "@/lib/helpers";
import { Label } from "@/components/ui/label";

type ContactCardProps = {
    name?: string;
    role: string | null | undefined;
    imageUrl?: string;
    externalUrl: string;
};

export function ContactCard({
    name = "",
    role,
    imageUrl,
    externalUrl,
}: ContactCardProps) {
    return (
        <Card className="m-2 w-[350px]">
            <CardHeader>
                <Avatar>
                    <AvatarImage src={imageUrl} alt={name} />
                    <AvatarFallback>
                        {Helpers.fullNameToInitials(name)}
                    </AvatarFallback>
                </Avatar>
                <CardTitle>{name}</CardTitle>
                <Label>{role}</Label>
            </CardHeader>
            <CardContent>
                <ExternalLink href={externalUrl}>NTNU</ExternalLink>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
        </Card>
    );
}
