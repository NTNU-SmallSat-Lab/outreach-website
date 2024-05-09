/**
 * Converts a full name to initials.
 * If the name is undefined, it returns the default initials "JD" for John Doe.
 * If there are more than 3 names, it uses the first and last name initials.
 * Otherwise, it uses the first letter of each name as initials.
 * @param name - The full name to convert to initials.
 * @returns The initials of the full name.
 */
function fullNameToInitials(name: string | undefined): string {
    // If undefined return default JD for John Doe
    if (name === undefined) {
        return "JD";
    }

    const names = name.split(" ").filter(Boolean); //Filter null or undefined

    let initials = "";
    // If there are more than 3 names, use the first and last name
    if (names.length >= 3) {
        initials = `${names[0][0]}${names[names.length - 1][0]}`;
    } else {
        // Otherwise, use the first letter of each name
        initials = names.map((partialName) => partialName[0]).join("");
    }

    return initials;
}

export default fullNameToInitials;

more 