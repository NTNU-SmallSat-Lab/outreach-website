import { SatRec } from "satellite.js";
import * as satellite from "satellite.js";

export function mapRawDataToTleData(rawData: string): string[][] {
    return (
        rawData
            // Remove any carriage returns
            .replace(/\r/g, "")
            // Split the data into individual TLEs (https://en.wikipedia.org/wiki/Two-line_element_set).
            /* It splits the string at newline characters (\n) only if they are followed by a character that is not 1 or 2. The (?=[^12]) is a positive lookahead assertion,
             ensuring that the newline is followed by a character that is not 1 or 2 without including that character in the split result.*/
            .split(/\n(?=[^12])/)
            //This step filters out any empty lines from the array of substrings obtained in the previous step. The callback function (d) => d checks if the substring d is truthy, effectively removing empty lines.
            .filter((d) => d)
            /* Finally, this step maps each substring (now representing a line) into an array of lines.
             It splits each substring again using the newline character (\n) as the delimiter.
             This results in a two-dimensional array where each element is an array of lines from the original string. */
            .map((tle) => tle.split("\n"))
    );
}

export type SatelliteData = {
    satrec: SatRec;
    name: string;
};

export function mapTleToSatData(tle: string[][]): SatelliteData[] {
    const satData = tle
        .map(([name, ...tle]) => ({
            satrec: satellite.twoline2satrec(
                ...(tle as [string, string]), // spread the array as arguments to the function
            ),
            name: name.trim().replace(/^0 /, ""), // remove leading 0 from name
        }))
        // exclude those that can't be propagated
        .filter((d) => !!satellite.propagate(d.satrec, new Date()).position);
    return satData;
}

export function mapRawDataToSatData(rawData: string): SatelliteData[] {
    return mapTleToSatData(mapRawDataToTleData(rawData));
}
