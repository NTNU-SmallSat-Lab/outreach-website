import Image from "next/image";
interface NTNULogoProps {
    darkMode?: boolean;
}

export default function NTNULogoImageHelper({ darkMode }: NTNULogoProps) {
    if (darkMode) {
        return (
            <Image
                src="/images/ntnu-white.svg"
                alt="NTNU logo"
                width={200}
                height={200}
            />
        );
    }

    return (
        <Image
            src="/images/ntnu-black.svg"
            alt="NTNU logo"
            width={200}
            height={200}
        />
    );
}
