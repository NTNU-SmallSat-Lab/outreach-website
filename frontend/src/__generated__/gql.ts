/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GET_PARTNERS {\n    partners {\n      data {\n        attributes {\n          partnerName\n          logoUrl\n          websiteUrl\n          logoImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.Get_PartnersDocument,
    "query ArticleWithSlug($articlesFilters: ArticleFiltersInput) {\n    articles(filters: $articlesFilters) {\n      data {\n        attributes {\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n          body\n          coverImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n          datePublished\n          subtitle\n          title\n        }\n      }\n    }\n  }\n  \n  ": types.ArticleWithSlugDocument,
    "\nquery GET_ARTICLES {\n    articles(sort: [\"datePublished:desc\"]) {\n        data {\n            id\n            attributes {\n                author {\n                    data {\n                        attributes {\n                            name\n                            avatar {\n                                data {\n                                    attributes {\n                                        url\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n                title\n                datePublished\n                body\n                coverImage {\n                    data {\n                        attributes {\n                            url\n                        }\n                    }\n                }\n                createdAt\n                publishedAt\n                slug\n                subtitle\n            }\n        }\n    }\n}\n": types.Get_ArticlesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GET_PARTNERS {\n    partners {\n      data {\n        attributes {\n          partnerName\n          logoUrl\n          websiteUrl\n          logoImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery GET_PARTNERS {\n    partners {\n      data {\n        attributes {\n          partnerName\n          logoUrl\n          websiteUrl\n          logoImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query ArticleWithSlug($articlesFilters: ArticleFiltersInput) {\n    articles(filters: $articlesFilters) {\n      data {\n        attributes {\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n          body\n          coverImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n          datePublished\n          subtitle\n          title\n        }\n      }\n    }\n  }\n  \n  "): (typeof documents)["query ArticleWithSlug($articlesFilters: ArticleFiltersInput) {\n    articles(filters: $articlesFilters) {\n      data {\n        attributes {\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n          body\n          coverImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n          datePublished\n          subtitle\n          title\n        }\n      }\n    }\n  }\n  \n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GET_ARTICLES {\n    articles(sort: [\"datePublished:desc\"]) {\n        data {\n            id\n            attributes {\n                author {\n                    data {\n                        attributes {\n                            name\n                            avatar {\n                                data {\n                                    attributes {\n                                        url\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n                title\n                datePublished\n                body\n                coverImage {\n                    data {\n                        attributes {\n                            url\n                        }\n                    }\n                }\n                createdAt\n                publishedAt\n                slug\n                subtitle\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery GET_ARTICLES {\n    articles(sort: [\"datePublished:desc\"]) {\n        data {\n            id\n            attributes {\n                author {\n                    data {\n                        attributes {\n                            name\n                            avatar {\n                                data {\n                                    attributes {\n                                        url\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n                title\n                datePublished\n                body\n                coverImage {\n                    data {\n                        attributes {\n                            url\n                        }\n                    }\n                }\n                createdAt\n                publishedAt\n                slug\n                subtitle\n            }\n        }\n    }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;