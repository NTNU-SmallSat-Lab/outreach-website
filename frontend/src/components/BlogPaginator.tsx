"use client";

import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

export default function BlogPaginator() {
    const [currentPage, setCurrentPage] = useState(1); // Initial page

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {currentPage > 1 ? (
                        <PaginationPrevious
                            href={"#" + currentPage}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        />
                    ) : (
                        <PaginationPrevious
                            href={"#" + currentPage}
                            onClick={() => setCurrentPage(currentPage)}
                        />
                    )}
                </PaginationItem>
                {currentPage > 1 ? (
                    <PaginationItem
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <PaginationLink href={"#" + currentPage}>
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                ) : null}
                <PaginationItem>
                    <PaginationLink href={"#" + currentPage} isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
                    <PaginationLink href={"#" + currentPage}>
                        {currentPage + 1}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href={"#" + currentPage}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
