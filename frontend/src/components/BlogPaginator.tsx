"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./shadcn/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogPaginator({
    totalArticles,
}: {
    totalArticles: Number;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tag = useSearchParams().get("tag");
    const page = searchParams.get("page");

    let currentPage = parseInt(page ?? "1", 10);
    currentPage = currentPage > 1 ? currentPage : 1;

    const pageSize = 7;
    const totalPages = Math.ceil(Number(totalArticles) / pageSize);

    function handlePageChange(page: number) {
        if (page < 1) {
            return;
        }
        if (page > totalPages) {
            return;
        }
        if (tag === null) {
            router.replace(`/blog?page=${page}`);
        } else {
            router.replace(`/blog?page=${page}&tag=${tag}`);
        }
    }

    let startPage: number;
    let endPage: number;

    if (totalPages <= 3) {
        startPage = 1;
        endPage = totalPages;
    } else {
        startPage = Math.max(currentPage - 1, 1);
        endPage = Math.min(currentPage + 1, totalPages);
        if (endPage - startPage < 2) {
            if (currentPage === 1) {
                endPage = Math.min(endPage + 1, totalPages);
            } else {
                startPage = Math.max(startPage - 1, 1);
            }
        }
    }

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => index + startPage,
    );

    return (
        <Pagination className="my-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            handlePageChange(currentPage - 1);
                        }}
                        href="#"
                    />
                </PaginationItem>

                {pages.map((page, id) => (
                    <PaginationItem
                        key={id}
                        className={
                            currentPage === page ? "rounded-md bg-primary" : ""
                        }
                    >
                        <PaginationLink
                            onClick={() => {
                                handlePageChange(page);
                            }}
                            href="#"
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => {
                            handlePageChange(currentPage + 1);
                        }}
                        href="#"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
