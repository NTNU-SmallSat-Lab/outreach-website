import Image from "next/image";
interface NTNULogoProps {
    width?: number;
    height?: number;
}

export default function NTNULogo({ width = 200, height = 200 }: NTNULogoProps) {
    return (
        <Image
            src="/images/ntnu-white.svg"
            alt="NTNU logo"
            width={width}
            height={height}
        />
    );
}
