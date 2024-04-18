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

export default function SatelliteResponsiveTable({ satellites }: any) {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <PageHeaderAndSubtitle>
                <PageHeader>Satellites</PageHeader>
                <PageSubtitle>
                    Here are the satellites we have worked on. Click on them to
                    see more details.
                </PageSubtitle>
            </PageHeaderAndSubtitle>
            <Table className="table-auto border-collapse rounded-md border-b border-white shadow">
                <TableHeader>
                    <TableRow className="border-y border-white px-3 py-2 text-left text-white">
                        <TableHead className="px-6">Satellite</TableHead>
                        <TableHead className="px-6">Speed</TableHead>
                        <TableHead className=" hidden px-6 lg:table-cell">
                            Altitude
                        </TableHead>
                        <TableHead className="hidden px-6 md:table-cell">
                            Latitude
                        </TableHead>
                        <TableHead className="hidden px-6 md:table-cell ">
                            Longitude
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {satellites.map((satellite: any) => {
                        let satelliteName = satellite?.attributes?.name ?? "";
                        return (
                            <SatelliteStatsTableRow
                                key={satellite.id}
                                satName={satelliteName}
                                slug={satellite?.attributes?.slug}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
