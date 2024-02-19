import { ReactNode } from "react";
type ExternalLinkProps = {
    href: string;
    children: ReactNode;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
    return (
        <a href={href} className="visited:red">
            <p className="">{children}</p>
        </a>
    );
}
