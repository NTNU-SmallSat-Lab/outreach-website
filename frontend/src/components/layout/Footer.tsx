import { env } from "process";
import NTNULogo from "./NTNULogo";

/**
 * The footer component at the bottom of the page.
 * It includes the NTNU logo, social media links, and contact information.
 */
export default function Footer() {
    const now = new Date();
    return (
        <footer className="flex flex-col items-center border-t bg-background p-4 text-foreground">
            <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row">
                <div className="flex flex-1 justify-start">
                    <NTNULogo />
                </div>

                <div className="flex flex-1 justify-center">
                    <div className="flex flex-col gap-2 text-center">
                        <div className="flex flex-wrap justify-center gap-x-4">
                            <a
                                href="https://www.facebook.com/NTNUSmallSat"
                                className="hover:underline"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://www.instagram.com/ntnusmallsat/"
                                className="hover:underline"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://www.linkedin.com/company/20559539/"
                                className="hover:underline"
                            >
                                LinkedIn
                            </a>
                        </div>
                        <div className="flex flex-row justify-center">
                            <a
                                href={env.STRAPI_URL + "/admin"}
                                className="hover:underline"
                            >
                                Admin panel
                            </a>
                        </div>
                        <p className="hidden lg:inline">
                            &copy; 2017 - {now.getFullYear()} NTNU Small
                            Satellite Lab
                        </p>
                    </div>
                </div>

                <div className="flex flex-1 justify-end">
                    <div className="flex flex-col text-center lg:text-right">
                        <span className="">NTNU Small Satellite Lab</span>
                        <span className="">Trondheim, Norway</span>
                        <p>Norwegian University of Science and Technology</p>
                        <p className="lg:hidden">
                            &copy; 2021 NTNU Small Satellite Lab
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
