/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * You may import it to create a `graphql()` tag function with `gql.tada`
 * by importing it and passing it to `initGraphQLTada<>()`.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { introspection } from './introspection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof introspection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 * ```
 */
const introspection = {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Article",
        "fields": [
          {
            "name": "Tag",
            "type": {
              "kind": "ENUM",
              "name": "ENUM_ARTICLE_TAG"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "body",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "JSON"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "coverImage",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "datePublished",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previewTitle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "slug",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ArticleEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "Article"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ArticleEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "ArticleEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ArticleEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ArticleEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ArticleFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "previewTitle",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "slug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "datePublished",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilterInput"
            }
          },
          {
            "name": "body",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JSONFilterInput"
            }
          },
          {
            "name": "author",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AuthorFiltersInput"
            }
          },
          {
            "name": "Tag",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ArticleFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ArticleFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ArticleFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ArticleInput",
        "inputFields": [
          {
            "name": "previewTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "slug",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "datePublished",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "coverImage",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "body",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "author",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "Tag",
            "type": {
              "kind": "ENUM",
              "name": "ENUM_ARTICLE_TAG"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "ArticleRelationResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ArticleEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Author",
        "fields": [
          {
            "name": "articles",
            "type": {
              "kind": "OBJECT",
              "name": "ArticleRelationResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ArticleFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "avatar",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AuthorEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "Author"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AuthorEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AuthorEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AuthorEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AuthorFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "articles",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ArticleFiltersInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AuthorFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AuthorFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AuthorFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AuthorInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "avatar",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "articles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BooleanFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "Date"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DateFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Date"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "DateTime"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DateTimeFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "ENUM",
        "name": "ENUM_ARTICLE_TAG",
        "enumValues": [
          {
            "name": "Satellites",
            "isDeprecated": false
          },
          {
            "name": "Projects",
            "isDeprecated": false
          },
          {
            "name": "General",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FeaturedImage",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "featuredImage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UploadFileEntityResponse"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "satellite",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FeaturedImageEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "FeaturedImage"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FeaturedImageEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "FeaturedImageEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FeaturedImageInput",
        "inputFields": [
          {
            "name": "featuredImage",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "satellite",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FileInfoInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "alternativeText",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "caption",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FloatFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FloatFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "UNION",
        "name": "GenericMorph",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Article"
          },
          {
            "kind": "OBJECT",
            "name": "Author"
          },
          {
            "kind": "OBJECT",
            "name": "FeaturedImage"
          },
          {
            "kind": "OBJECT",
            "name": "Hero"
          },
          {
            "kind": "OBJECT",
            "name": "HomeFeaturedProjects"
          },
          {
            "kind": "OBJECT",
            "name": "HomeMissionStatement"
          },
          {
            "kind": "OBJECT",
            "name": "I18NLocale"
          },
          {
            "kind": "OBJECT",
            "name": "Project"
          },
          {
            "kind": "OBJECT",
            "name": "Satellite"
          },
          {
            "kind": "OBJECT",
            "name": "UploadFile"
          },
          {
            "kind": "OBJECT",
            "name": "UploadFolder"
          },
          {
            "kind": "OBJECT",
            "name": "UsersPermissionsPermission"
          },
          {
            "kind": "OBJECT",
            "name": "UsersPermissionsRole"
          },
          {
            "kind": "OBJECT",
            "name": "UsersPermissionsUser"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Hero",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "image",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UploadFileEntityResponse"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HeroEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "Hero"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HeroEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "HeroEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HeroInput",
        "inputFields": [
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "text",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "HomeFeaturedProjects",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "featuredProject1",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "featuredProject2",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "featuredProject3",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "textContent",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HomeFeaturedProjectsEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "HomeFeaturedProjects"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HomeFeaturedProjectsEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "HomeFeaturedProjectsEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HomeFeaturedProjectsInput",
        "inputFields": [
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "textContent",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "featuredProject1",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "featuredProject2",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "featuredProject3",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "HomeMissionStatement",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "textContent",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HomeMissionStatementEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "HomeMissionStatement"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HomeMissionStatementEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "HomeMissionStatementEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HomeMissionStatementInput",
        "inputFields": [
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "textContent",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "I18NLocale",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "I18NLocaleEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "I18NLocale"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "I18NLocaleEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "I18NLocaleEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "I18NLocaleEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "I18NLocaleEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "I18NLocaleFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "code",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "I18NLocaleFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "I18NLocaleFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "I18NLocaleFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IDFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IntFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "JSON"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "JSONFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "JSON"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "JSON"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JSONFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "JSON"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "JSON"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "JSON"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "changePassword",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsLoginPayload"
            },
            "args": [
              {
                "name": "currentPassword",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "passwordConfirmation",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createArticle",
            "type": {
              "kind": "OBJECT",
              "name": "ArticleEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ArticleInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createAuthor",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AuthorInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createProject",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProjectInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createSatellite",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SatelliteInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createUploadFile",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UploadFileInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createUploadFolder",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UploadFolderInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createUsersPermissionsRole",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsCreateRolePayload"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UsersPermissionsRoleInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createUsersPermissionsUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UsersPermissionsUserEntityResponse"
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UsersPermissionsUserInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteArticle",
            "type": {
              "kind": "OBJECT",
              "name": "ArticleEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteAuthor",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteFeaturedImage",
            "type": {
              "kind": "OBJECT",
              "name": "FeaturedImageEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "deleteHero",
            "type": {
              "kind": "OBJECT",
              "name": "HeroEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "deleteHomeFeaturedProjects",
            "type": {
              "kind": "OBJECT",
              "name": "HomeFeaturedProjectsEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "deleteHomeMissionStatement",
            "type": {
              "kind": "OBJECT",
              "name": "HomeMissionStatementEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "deleteProject",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteSatellite",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteUploadFile",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteUploadFolder",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteUsersPermissionsRole",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsDeleteRolePayload"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "deleteUsersPermissionsUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UsersPermissionsUserEntityResponse"
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "emailConfirmation",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsLoginPayload"
            },
            "args": [
              {
                "name": "confirmation",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "forgotPassword",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsPasswordPayload"
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "login",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UsersPermissionsLoginPayload"
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UsersPermissionsLoginInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multipleUpload",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "UploadFileEntityResponse"
                }
              }
            },
            "args": [
              {
                "name": "field",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "files",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Upload"
                    }
                  }
                }
              },
              {
                "name": "ref",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "refId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "register",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UsersPermissionsLoginPayload"
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UsersPermissionsRegisterInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "removeFile",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "resetPassword",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsLoginPayload"
            },
            "args": [
              {
                "name": "code",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "passwordConfirmation",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateArticle",
            "type": {
              "kind": "OBJECT",
              "name": "ArticleEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ArticleInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateAuthor",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AuthorInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateFeaturedImage",
            "type": {
              "kind": "OBJECT",
              "name": "FeaturedImageEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "FeaturedImageInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateFileInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UploadFileEntityResponse"
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "info",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FileInfoInput"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateHero",
            "type": {
              "kind": "OBJECT",
              "name": "HeroEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "HeroInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateHomeFeaturedProjects",
            "type": {
              "kind": "OBJECT",
              "name": "HomeFeaturedProjectsEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "HomeFeaturedProjectsInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateHomeMissionStatement",
            "type": {
              "kind": "OBJECT",
              "name": "HomeMissionStatementEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "HomeMissionStatementInput"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateProject",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ProjectInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateSatellite",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SatelliteInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateUploadFile",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UploadFileInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateUploadFolder",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderEntityResponse"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UploadFolderInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateUsersPermissionsRole",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsUpdateRolePayload"
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UsersPermissionsRoleInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updateUsersPermissionsUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UsersPermissionsUserEntityResponse"
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UsersPermissionsUserInput"
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "upload",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UploadFileEntityResponse"
              }
            },
            "args": [
              {
                "name": "field",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "file",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Upload"
                  }
                }
              },
              {
                "name": "info",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FileInfoInput"
                }
              },
              {
                "name": "ref",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "refId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Pagination",
        "fields": [
          {
            "name": "page",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageSize",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "total",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PaginationArg",
        "inputFields": [
          {
            "name": "page",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "pageSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "start",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "limit",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "Project",
        "fields": [
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previewImage",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "satellites",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteRelationResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SatelliteFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "slug",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProjectEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "Project"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProjectEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProjectEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ProjectEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProjectFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "content",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JSONFilterInput"
            }
          },
          {
            "name": "slug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "satellites",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SatelliteFiltersInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ProjectFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ProjectFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ProjectFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ProjectInput",
        "inputFields": [
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "slug",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "previewImage",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "satellites",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "ProjectRelationResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ProjectEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "PublicationState",
        "enumValues": [
          {
            "name": "LIVE",
            "isDeprecated": false
          },
          {
            "name": "PREVIEW",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "article",
            "type": {
              "kind": "OBJECT",
              "name": "ArticleEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "articles",
            "type": {
              "kind": "OBJECT",
              "name": "ArticleEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ArticleFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "authors",
            "type": {
              "kind": "OBJECT",
              "name": "AuthorEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AuthorFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "featuredImage",
            "type": {
              "kind": "OBJECT",
              "name": "FeaturedImageEntityResponse"
            },
            "args": [
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "hero",
            "type": {
              "kind": "OBJECT",
              "name": "HeroEntityResponse"
            },
            "args": [
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "homeFeaturedProjects",
            "type": {
              "kind": "OBJECT",
              "name": "HomeFeaturedProjectsEntityResponse"
            },
            "args": [
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "homeMissionStatement",
            "type": {
              "kind": "OBJECT",
              "name": "HomeMissionStatementEntityResponse"
            },
            "args": [
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "i18NLocale",
            "type": {
              "kind": "OBJECT",
              "name": "I18NLocaleEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "i18NLocales",
            "type": {
              "kind": "OBJECT",
              "name": "I18NLocaleEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "I18NLocaleFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsMe"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "project",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "projects",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ProjectFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "satellite",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "satellites",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SatelliteFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "uploadFile",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "uploadFiles",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UploadFileFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "uploadFolder",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "uploadFolders",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UploadFolderFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "usersPermissionsRole",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsRoleEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "usersPermissionsRoles",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsRoleEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UsersPermissionsRoleFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "usersPermissionsUser",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsUserEntityResponse"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "usersPermissionsUsers",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsUserEntityResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UsersPermissionsUserFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ResponseCollectionMeta",
        "fields": [
          {
            "name": "pagination",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Pagination"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Satellite",
        "fields": [
          {
            "name": "catalogNumberNORAD",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "launchDate",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "massKg",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "missionStatus",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "projects",
            "type": {
              "kind": "OBJECT",
              "name": "ProjectRelationResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ProjectFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "publicationState",
                "type": {
                  "kind": "ENUM",
                  "name": "PublicationState"
                },
                "defaultValue": "LIVE"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "satelliteImage",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "slug",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SatelliteEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "Satellite"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SatelliteEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "SatelliteEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SatelliteEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SatelliteEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SatelliteFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "catalogNumberNORAD",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "content",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JSONFilterInput"
            }
          },
          {
            "name": "projects",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ProjectFiltersInput"
            }
          },
          {
            "name": "missionStatus",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "launchDate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "slug",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "massKg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FloatFilterInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SatelliteFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SatelliteFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SatelliteFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SatelliteInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "catalogNumberNORAD",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "content",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "satelliteImage",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "projects",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "missionStatus",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "launchDate",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          },
          {
            "name": "slug",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "massKg",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "publishedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "SatelliteRelationResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SatelliteEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringFilterInput",
        "inputFields": [
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "eqi",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "ne",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "nei",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "notContains",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "containsi",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "notContainsi",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "null",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "notNull",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "between",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "SCALAR",
        "name": "Upload"
      },
      {
        "kind": "OBJECT",
        "name": "UploadFile",
        "fields": [
          {
            "name": "alternativeText",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "caption",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ext",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "formats",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "height",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previewUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "provider",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "provider_metadata",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "related",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "UNION",
                "name": "GenericMorph"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "size",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "url",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "width",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadFileEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFile"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadFileEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadFileEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UploadFileEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UploadFileFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "alternativeText",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "caption",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "width",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilterInput"
            }
          },
          {
            "name": "height",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilterInput"
            }
          },
          {
            "name": "formats",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JSONFilterInput"
            }
          },
          {
            "name": "hash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "ext",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "mime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "size",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FloatFilterInput"
            }
          },
          {
            "name": "url",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "previewUrl",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "provider",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "provider_metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JSONFilterInput"
            }
          },
          {
            "name": "folder",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UploadFolderFiltersInput"
            }
          },
          {
            "name": "folderPath",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UploadFileFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UploadFileFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UploadFileFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UploadFileInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "alternativeText",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "caption",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "width",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "height",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "formats",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "ext",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "mime",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "size",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            }
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "previewUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "provider",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "provider_metadata",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            }
          },
          {
            "name": "folder",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "folderPath",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "UploadFileRelationResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UploadFileEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadFolder",
        "fields": [
          {
            "name": "children",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderRelationResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UploadFolderFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "files",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFileRelationResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UploadFileFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parent",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "path",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pathId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadFolderEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolder"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadFolderEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "UploadFolderEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UploadFolderEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UploadFolderEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UploadFolderFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "pathId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilterInput"
            }
          },
          {
            "name": "parent",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UploadFolderFiltersInput"
            }
          },
          {
            "name": "children",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UploadFolderFiltersInput"
            }
          },
          {
            "name": "files",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UploadFileFiltersInput"
            }
          },
          {
            "name": "path",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UploadFolderFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UploadFolderFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UploadFolderFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UploadFolderInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "pathId",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            }
          },
          {
            "name": "parent",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          },
          {
            "name": "children",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "files",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "path",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "UploadFolderRelationResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UploadFolderEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsCreateRolePayload",
        "fields": [
          {
            "name": "ok",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsDeleteRolePayload",
        "fields": [
          {
            "name": "ok",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UsersPermissionsLoginInput",
        "inputFields": [
          {
            "name": "identifier",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "password",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "provider",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "defaultValue": "\"local\""
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsLoginPayload",
        "fields": [
          {
            "name": "jwt",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "user",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UsersPermissionsMe"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsMe",
        "fields": [
          {
            "name": "blocked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "confirmed",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "role",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsMeRole"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsMeRole",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsPasswordPayload",
        "fields": [
          {
            "name": "ok",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsPermission",
        "fields": [
          {
            "name": "action",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "role",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsRoleEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsPermissionEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsPermission"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UsersPermissionsPermissionFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "action",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "role",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UsersPermissionsRoleFiltersInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UsersPermissionsPermissionFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UsersPermissionsPermissionFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UsersPermissionsPermissionFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsPermissionRelationResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UsersPermissionsPermissionEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UsersPermissionsRegisterInput",
        "inputFields": [
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          },
          {
            "name": "password",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsRole",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "permissions",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsPermissionRelationResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UsersPermissionsPermissionFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "users",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsUserRelationResponseCollection"
            },
            "args": [
              {
                "name": "filters",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UsersPermissionsUserFiltersInput"
                }
              },
              {
                "name": "pagination",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PaginationArg"
                },
                "defaultValue": "{}"
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                },
                "defaultValue": "[]"
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsRoleEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsRole"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsRoleEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsRoleEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsRoleEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UsersPermissionsRoleEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UsersPermissionsRoleFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "permissions",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UsersPermissionsPermissionFiltersInput"
            }
          },
          {
            "name": "users",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UsersPermissionsUserFiltersInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UsersPermissionsRoleFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UsersPermissionsRoleFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UsersPermissionsRoleFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UsersPermissionsRoleInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "permissions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          },
          {
            "name": "users",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsUpdateRolePayload",
        "fields": [
          {
            "name": "ok",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsUser",
        "fields": [
          {
            "name": "blocked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "confirmed",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "provider",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "role",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsRoleEntityResponse"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsUserEntity",
        "fields": [
          {
            "name": "attributes",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsUser"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsUserEntityResponse",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "OBJECT",
              "name": "UsersPermissionsUserEntity"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsUserEntityResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UsersPermissionsUserEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "meta",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ResponseCollectionMeta"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UsersPermissionsUserFiltersInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilterInput"
            }
          },
          {
            "name": "username",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "email",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "provider",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "password",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "resetPasswordToken",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "confirmationToken",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilterInput"
            }
          },
          {
            "name": "confirmed",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilterInput"
            }
          },
          {
            "name": "blocked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilterInput"
            }
          },
          {
            "name": "role",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UsersPermissionsRoleFiltersInput"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilterInput"
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UsersPermissionsUserFiltersInput"
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UsersPermissionsUserFiltersInput"
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UsersPermissionsUserFiltersInput"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UsersPermissionsUserInput",
        "inputFields": [
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "provider",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "password",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "resetPasswordToken",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "confirmationToken",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "confirmed",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "blocked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            }
          },
          {
            "name": "role",
            "type": {
              "kind": "SCALAR",
              "name": "ID"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "UsersPermissionsUserRelationResponseCollection",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UsersPermissionsUserEntity"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      }
    ],
    "directives": []
  }
} as const;

export { introspection };