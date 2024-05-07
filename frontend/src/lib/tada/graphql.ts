import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./graphql-env.d.ts";
import type { DateTimeValue } from "@strapi/types/dist/types/core/attributes/date-time.d.ts";

export const graphql = initGraphQLTada<{
    introspection: introspection;
    scalars: {
        JSON: any;
        Date: DateTimeValue;
    };
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
