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
    TableCell,
} from "@/components/shadcn/table";
import { useRouter } from "next/navigation";

export default function SatelliteResponsiveTable({
    satellites,
    inOrbit,
}: {
    satellites: any;
    inOrbit: boolean;
}) {
    const router = useRouter();
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <PageHeaderAndSubtitle>
                <PageHeader>
                    {inOrbit
                        ? "Satellites in orbit"
                        : "Satellites not in orbit"}
                </PageHeader>
                <PageSubtitle>description</PageSubtitle>
            </PageHeaderAndSubtitle>
            <Table className="table-auto border-collapse rounded-md border-b border-white shadow">
                <TableHeader>
                    <TableRow className="border-y border-white px-3 py-2 text-left text-white">
                        <TableHead className="px-6">Name</TableHead>
                        {inOrbit ? (
                            <>
                                <TableHead className="">Velocity</TableHead>
                                <TableHead className="">Altitude</TableHead>
                                <TableHead className="">Latitude</TableHead>
                                <TableHead className="">Longitude</TableHead>
                            </>
                        ) : (
                            <TableHead>Mission Status</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {inOrbit
                        ? satellites.map((satellite: any) => (
                              <SatelliteStatsTableRow
                                  key={satellite.attributes.catalogNumberNORAD}
                                  satName={satellite.attributes.name}
                                  slug={satellite.attributes.slug}
                              />
                          ))
                        : satellites.map((satellite: any) => (
                              <TableRow
                                  onClick={() =>
                                      router.push(
                                          `/satellites/${satellite.attributes.slug}`,
                                      )
                                  }
                                  className="cursor-pointer hover:bg-white hover:text-black"
                              >
                                  <TableCell>
                                      {satellite.attributes.name}
                                  </TableCell>
                                  <TableCell>
                                      {satellite.attributes.missionStatus
                                          ? satellite.attributes.missionStatus
                                          : "Unknown"}
                                  </TableCell>
                              </TableRow>
                          ))}
                </TableBody>
            </Table>
        </div>
    );
}
