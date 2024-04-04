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
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogPaginator() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tag = useSearchParams().get("tag");
    const page = searchParams.get("page");

    let currentPage = parseInt(page ?? "1", 10);
    currentPage = currentPage > 1 ? currentPage : 1;

    function handlePageChange(page: number) {
        console.log(page);
        if (page < 1) {
            return;
        }
        if (tag === null) {
            router.replace(`/blog?page=${page}`);
        } else {
            router.replace(`/blog?page=${page}&tag=${tag}`);
        }
    }

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
                {currentPage > 1 ? (
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => {
                                handlePageChange(currentPage - 1);
                            }}
                            href="#"
                        >
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                ) : null}
                <PaginationItem>
                    <PaginationLink
                        onClick={() => {
                            handlePageChange(currentPage);
                        }}
                        href="#"
                        isActive
                    >
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        onClick={() => {
                            handlePageChange(currentPage + 1);
                        }}
                        href="#"
                    >
                        {currentPage + 1}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
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
