import { CodegenConfig } from "@graphql-codegen/cli";

const HOST_URL = "http://localhost:1337";

const config: CodegenConfig = {
    schema: HOST_URL + "/graphql",
    // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
    documents: ["src/**/*.{ts,tsx}"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
