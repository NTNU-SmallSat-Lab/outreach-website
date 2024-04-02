"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams } from "next/navigation";

export default function BlogPaginator() {
    const searchParams = useSearchParams();

    const page = searchParams.get("page");
    let currentPage = parseInt(page ?? "1", 10);
    currentPage = currentPage > 1 ? currentPage : 1;

    return (
        <Pagination className="my-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={
                            "?page=" + (currentPage > 1 ? currentPage - 1 : 1)
                        }
                    />
                </PaginationItem>
                {currentPage > 1 ? (
                    <PaginationItem>
                        <PaginationLink href={"?page=" + (currentPage - 1)}>
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                ) : null}
                <PaginationItem>
                    <PaginationLink href={"?page=" + currentPage} isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={"?page=" + (currentPage + 1)}>
                        {currentPage + 1}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={"?page=" + (currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
