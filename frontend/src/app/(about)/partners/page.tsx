import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface PartnerInfo {
    id: number;
    name: string;
    src: string;
    URL: string;
}

export default function PartnersPage() {
    const data: PartnerInfo[] = [
        {
            id: 1,
            name: "NTNU OCEANS",
            src: "https://www.ntnu.edu/documents/919518/981063644/oceans_webbanner_TSO_1200x168.jpg/1b662672-7ddd-4a62-aec0-9d11aa30faa7?t=1432636474377",
            URL: "https://www.ntnu.edu/oceans",
        },
        {
            id: 2,
            name: "NTNU AMOS",
            src: "https://www.ntnu.edu/documents/1277411470/0/amos_logo.png/5549873f-873d-4ea7-b772-47bd690f4db9?t=1514638950115",
            URL: "https://www.ntnu.edu/amos",
        },
        {
            id: 3,
            name: "The Research Council of Norway",
            src: "https://www.forskningsradet.no/siteassets/logoer/forskningsradet-logo-en-svart.svg",
            URL: "https://www.forskningsradet.no/en/",
        },
    ];

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mb-10 mt-5">
                Partners and Collaborators
            </h1>
            {data.map((partner) => (
                <Link
                    href={partner.URL}
                    target="_blank"
                    key={partner.id}
                    className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                    <Card className="max-w-md mb-6 bg-neutral-50">
                        <CardHeader>
                            <CardTitle className="text-black">
                                <p>{partner.name}</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={partner.src}
                                alt={partner.name}
                                width={500}
                                height={0}
                            />
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
