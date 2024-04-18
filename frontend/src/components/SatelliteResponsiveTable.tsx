"use client";
import {
    PageHeaderAndSubtitle,
    PageHeader,
    PageSubtitle,
} from "@/components/PageHeader";
import SatelliteStatsTableRow from "@/components/satelliteData/SatelliteStatsTableRow";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shadcn/table";

interface columnInterface {
    [key: string]: any;
    name: string;
    attributeName: string;
    classNames: string;
}

export default function SatelliteResponsiveTable({
    satellites,
    columns,
    title,
    description,
}: {
    satellites: any;
    columns: columnInterface[] | undefined;
    title: string,
    description: string
}) {

    console.log(satellites);
    console.log(columns);
    
    
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <PageHeaderAndSubtitle>
                <PageHeader>{title}</PageHeader>
                <PageSubtitle>
                    {description}
                </PageSubtitle>
            </PageHeaderAndSubtitle>
            <Table className="table-auto border-collapse rounded-md border-b border-white shadow">
                <TableHeader>
                    <TableRow className="border-y border-white px-3 py-2 text-left text-white">
                        <TableHead className="px-6">
                            Name
                        </TableHead>
                        {columns ? columns.map((column) => (
                            <TableHead
                                className={column.classNames}
                                key={column.id}
                            >
                                {column.name}
                            </TableHead>
                        )): <></>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {satellites.map((satellite: any) => {
                        console.log("-------------------------------------");
                        console.log(satellites);
                        console.log("-------------------------------------");

                        let satelliteName = satellite?.attributes?.name ?? "";
                        
                        return (
                            <SatelliteStatsTableRow
                                key={satellite.id}
                                satName={satelliteName}
                                slug={satellite?.attributes?.slug}
                                columns={columns}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
