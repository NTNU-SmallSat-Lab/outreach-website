import Image from "next/image";
interface NTNULogoProps {
    width?: number;
    height?: number;
}

/**
 * Renders the NTNU logo.
 *
 * @component
 * @param {number} width - The width of the logo image. Default is 200.
 * @param {number} height - The height of the logo image. Default is 200.
 * @returns {JSX.Element} The rendered NTNU logo component.
 */
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
