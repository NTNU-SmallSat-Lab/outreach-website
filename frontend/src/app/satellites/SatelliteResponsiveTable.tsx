"use client";
import {
    PageHeaderAndSubtitle,
    PageHeader,
    PageSubtitle,
} from "@/components/layout/PageHeader";
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
import { SatellitesResult } from "./page";
import { SatelliteName, SatelliteNumber } from "@/lib/store";

/**
 * Renders a table displaying satellite information that updates continuously.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.satellites - The array of satellite objects to display.
 * @param {boolean} props.inOrbit - Indicates whether the satellites are in orbit or not.
 * @returns {JSX.Element} The rendered SatelliteResponsiveTable component.
 */
export default function SatelliteResponsiveTable({
    satellites,
    inOrbit,
}: {
    satellites: SatellitesResult | undefined;
    inOrbit: boolean;
}) {
    const router = useRouter();
    const handleRowClick = (slug: string) => {
        // This will update the URL without triggering a full page refresh, must be used because Link element does not work here.
        router.push(`/satellites/${slug}`, undefined);
    };

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <PageHeaderAndSubtitle>
                <PageHeader>
                    {inOrbit
                        ? "Satellites in orbit"
                        : "Satellites not in orbit"}
                </PageHeader>
                <PageSubtitle>
                    {inOrbit
                        ? "Here are some satellites we have worked on that are in orbit. Click on a satellite to view more information."
                        : "Here are some satellites we have worked on that are not currently in orbit."}
                </PageSubtitle>
            </PageHeaderAndSubtitle>
            <Table className="table-auto border-collapse border-b border-white shadow">
                <TableHeader>
                    <TableRow className="border-y border-white px-3 py-2 text-left text-white">
                        <TableHead className="px-6">Name</TableHead>
                        {inOrbit ? (
                            <>
                                <TableHead className="hidden min-w-[100px] sm:table-cell">
                                    Velocity
                                </TableHead>
                                <TableHead className="min-w-[135px]">
                                    Altitude
                                </TableHead>
                                <TableHead className="hidden min-w-[100px] sm:table-cell">
                                    Latitude
                                </TableHead>
                                <TableHead className="hidden min-w-[100px] sm:table-cell">
                                    Longitude
                                </TableHead>
                            </>
                        ) : (
                            <TableHead>Mission Status</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inOrbit
                        ? (satellites ?? []).map((satellite) => (
                              <SatelliteStatsTableRow
                                  key={satellite.attributes?.catalogNumberNORAD}
                                  satName={
                                      satellite.attributes
                                          ?.name as SatelliteName
                                  }
                                  satNum={
                                      Number(
                                          satellite.attributes
                                              ?.catalogNumberNORAD,
                                      ) as SatelliteNumber
                                  }
                                  handleRowClick={() =>
                                      handleRowClick(
                                          satellite.attributes?.slug ?? "",
                                      )
                                  }
                              />
                          ))
                        : (satellites ?? []).map((satellite) => (
                              <TableRow
                                  className="cursor-pointer hover:bg-white hover:text-black"
                                  key={satellite.attributes?.catalogNumberNORAD}
                                  {...(satellite.attributes?.catalogNumberNORAD
                                      ? {
                                            onClick: () =>
                                                handleRowClick(
                                                    satellite.attributes
                                                        ?.slug ?? "",
                                                ),
                                        }
                                      : {})}
                              >
                                  <TableCell className="px-6">
                                      {satellite.attributes?.name}
                                  </TableCell>
                                  <TableCell>
                                      {satellite.attributes?.missionStatus
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
