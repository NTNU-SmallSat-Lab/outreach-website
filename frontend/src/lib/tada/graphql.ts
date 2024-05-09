import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./graphql-env.d.ts";

// The graphql-env.d.ts file is a generated file that contains the GraphQL introspection query result.

// This allows us to override scalars and add custom types to the introspection result.
export const graphql = initGraphQLTada<{
    introspection: introspection;
    scalars: {
        JSON: any; // Usually BlocksContent from Strapi
        Date: Date | string;
        DateTime: Date | string;
    };
}>();

// Utility types for working with gql.tada
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
