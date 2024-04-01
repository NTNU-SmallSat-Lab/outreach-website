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

interface BlogPaginatorProps {
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

export default function BlogPaginator({
    currentPage,
    onPageChange,
}: BlogPaginatorProps) {
    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {currentPage > 1 ? (
                        <PaginationPrevious
                            href={"#" + currentPage}
                            onClick={() => handlePageChange(currentPage - 1)}
                        />
                    ) : (
                        <PaginationPrevious
                            href={"#" + currentPage}
                            onClick={() => handlePageChange(currentPage)}
                        />
                    )}
                </PaginationItem>
                {currentPage > 1 ? (
                    <PaginationItem
                        onClick={() => handlePageChange(currentPage - 1)}
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
                <PaginationItem
                    onClick={() => handlePageChange(currentPage + 1)}
                >
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
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
