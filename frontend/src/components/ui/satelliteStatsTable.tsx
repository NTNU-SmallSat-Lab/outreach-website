export const runtime = "edge";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function satelliteStatsTable() {
    return (
        <Table className="w-1/2 mx-auto border border-collapse">
            <TableBody>
                <TableRow>
                    <TableCell className="text-left">
                        <p>{"In Orbit"}</p>
                        <p className="">{"Mission Status"}</p>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border p-2 w-1/2">
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
                    <TableCell className="text-left">
                        <p className="text-m">{"Norway"}</p>
                        <p>{"Above Country"}</p>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
