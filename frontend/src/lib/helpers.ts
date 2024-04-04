class Helpers {
    static fullNameToInitials(name: string): string {
        const names = name.split(" ").filter(Boolean); //Filter null or undefined

        let initials = "";
        if (names.length >= 3) {
            initials = `${names[0][0]}${names[names.length - 1][0]}`;
        } else {
            initials = names.map((partialName) => partialName[0]).join("");
        }

        return initials;
    }
}

export default Helpers;
