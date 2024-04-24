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
