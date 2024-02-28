import NTNULogo from "./ntnu/NTNULogo";

export default function Footer() {
    return (
        <footer className="p-4 bg-background text-foreground flex flex-col items-center">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex-1 flex justify-start">
                    <NTNULogo />
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
                        <span className="">NTNU Small Satellite Lab</span>
                        <span className="">Trondheim, Norway</span>
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
