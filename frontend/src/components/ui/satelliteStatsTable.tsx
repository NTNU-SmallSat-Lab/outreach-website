export const runtime = "edge";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function satelliteStatsTable() {
    return (
        <Table className="mx-auto w-1/2 border-collapse border">
            <TableBody>
                <TableRow>
                    <TableCell className="text-left" colSpan={2}>
                        <p>{"In Orbit"}</p>
                        <p className="">{"Mission Status"}</p>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="w-1/2 border p-2">
                        <p>{134237 + " Km/h"}</p>
                        <p className="">{"Speed"}</p>
                    </TableCell>
                    <TableCell className="border p-2">
                        <p>{14624 + " Moh"}</p>
                        <p className="">{"Altitude"}</p>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border p-2">
                        <p>{62.7969 + "° N"}</p>
                        <p className="">{"Latitude"}</p>
                    </TableCell>
                    <TableCell className="border p-2">
                        <p>{9.7531 + "° E"}</p>
                        <p className="">{"Longitude"}</p>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-left" colSpan={2}>
                        <p className="text-m">{"Norway"}</p>
                        <p>{"Above Country"}</p>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
