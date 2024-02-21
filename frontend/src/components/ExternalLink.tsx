import { ReactNode } from "react";
type ExternalLinkProps = {
    href: string;
    children: ReactNode;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
    return (
        <a
            href={href}
            className="text-blue-600 visited:text-purple-600 dark:text-blue-300 dark:visited:text-purple-300"
        >
            <p>{children}</p>
        </a>
    );
}
