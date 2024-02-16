import Image from "next/image";

export default function Footer() {
    return (
        <footer className="p-4 bg-slate-700 text-white flex flex-col items-center">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex-1 flex justify-start">
                    <Image
                        src={
                            "https://www.ntnu.edu/o/ntnu-theme/images/logo_ntnu_tag_english.svg"
                        }
                        alt={"NTNU"}
                        width={200}
                        height={50}
                    />
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="flex flex-col text-center">
                        <div className="flex flex-row gap-4">
                            <a href="#" className="hover:underline">
                                Twitter
                            </a>
                            <a href="#" className="hover:underline">
                                Facebook
                            </a>
                            <a href="#" className="hover:underline">
                                Instagram
                            </a>
                            <a href="#" className="hover:underline">
                                Youtube
                            </a>
                        </div>
                        <p>&copy; 2021 NTNU Small Satellite Lab</p>
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    <div className="flex flex-col text-right">
                        <span className="text-white">
                            NTNU Small Satellite Lab
                        </span>
                        <span className="text-white">Trondheim, Norway</span>
                    </div>
                </div>
            </div>

            <hr className="my-4 w-full" />

            <div className="text-center">
                <p>Norwegian University of Science and Technology</p>
            </div>

            <div className="mt-4 flex flex-col text-center">
                <a href="#" className="hover:underline">
                    Use of cookies
                </a>
                <a href="#" className="hover:underline">
                    Accessibility statement (in Norwegian)
                </a>
                <a href="#" className="hover:underline">
                    Privacy policy
                </a>
                <a href="#" className="hover:underline">
                    Editorial responsibility
                </a>
            </div>
        </footer>
    );
}
