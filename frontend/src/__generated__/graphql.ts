/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends " $fragmentName" | "__typename"
              ? T[P]
              : never;
      };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: { input: any; output: any };
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: { input: any; output: any };
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: { input: any; output: any };
    /** The `Upload` scalar type represents a file upload. */
    Upload: { input: any; output: any };
};

export type Article = {
    __typename?: "Article";
    Tag?: Maybe<Enum_Article_Tag>;
    author?: Maybe<AuthorEntityResponse>;
    body: Scalars["JSON"]["output"];
    coverImage?: Maybe<UploadFileEntityResponse>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    datePublished: Scalars["Date"]["output"];
    previewTitle: Scalars["String"]["output"];
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    slug: Scalars["String"]["output"];
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ArticleEntity = {
    __typename?: "ArticleEntity";
    attributes?: Maybe<Article>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type ArticleEntityResponse = {
    __typename?: "ArticleEntityResponse";
    data?: Maybe<ArticleEntity>;
};

export type ArticleEntityResponseCollection = {
    __typename?: "ArticleEntityResponseCollection";
    data: Array<ArticleEntity>;
    meta: ResponseCollectionMeta;
};

export type ArticleFiltersInput = {
    Tag?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
    author?: InputMaybe<AuthorFiltersInput>;
    body?: InputMaybe<JsonFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    datePublished?: InputMaybe<DateFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<ArticleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
    previewTitle?: InputMaybe<StringFilterInput>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleInput = {
    Tag?: InputMaybe<Enum_Article_Tag>;
    author?: InputMaybe<Scalars["ID"]["input"]>;
    body?: InputMaybe<Scalars["JSON"]["input"]>;
    coverImage?: InputMaybe<Scalars["ID"]["input"]>;
    datePublished?: InputMaybe<Scalars["Date"]["input"]>;
    previewTitle?: InputMaybe<Scalars["String"]["input"]>;
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type ArticleRelationResponseCollection = {
    __typename?: "ArticleRelationResponseCollection";
    data: Array<ArticleEntity>;
};

export type Author = {
    __typename?: "Author";
    articles?: Maybe<ArticleRelationResponseCollection>;
    avatar?: Maybe<UploadFileEntityResponse>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    name: Scalars["String"]["output"];
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AuthorArticlesArgs = {
    filters?: InputMaybe<ArticleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AuthorEntity = {
    __typename?: "AuthorEntity";
    attributes?: Maybe<Author>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type AuthorEntityResponse = {
    __typename?: "AuthorEntityResponse";
    data?: Maybe<AuthorEntity>;
};

export type AuthorEntityResponseCollection = {
    __typename?: "AuthorEntityResponseCollection";
    data: Array<AuthorEntity>;
    meta: ResponseCollectionMeta;
};

export type AuthorFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<AuthorFiltersInput>>>;
    articles?: InputMaybe<ArticleFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<AuthorFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<AuthorFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AuthorInput = {
    articles?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    avatar?: InputMaybe<Scalars["ID"]["input"]>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type BooleanFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
    contains?: InputMaybe<Scalars["Boolean"]["input"]>;
    containsi?: InputMaybe<Scalars["Boolean"]["input"]>;
    endsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
    eq?: InputMaybe<Scalars["Boolean"]["input"]>;
    eqi?: InputMaybe<Scalars["Boolean"]["input"]>;
    gt?: InputMaybe<Scalars["Boolean"]["input"]>;
    gte?: InputMaybe<Scalars["Boolean"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
    lt?: InputMaybe<Scalars["Boolean"]["input"]>;
    lte?: InputMaybe<Scalars["Boolean"]["input"]>;
    ne?: InputMaybe<Scalars["Boolean"]["input"]>;
    nei?: InputMaybe<Scalars["Boolean"]["input"]>;
    not?: InputMaybe<BooleanFilterInput>;
    notContains?: InputMaybe<Scalars["Boolean"]["input"]>;
    notContainsi?: InputMaybe<Scalars["Boolean"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DateFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
    contains?: InputMaybe<Scalars["Date"]["input"]>;
    containsi?: InputMaybe<Scalars["Date"]["input"]>;
    endsWith?: InputMaybe<Scalars["Date"]["input"]>;
    eq?: InputMaybe<Scalars["Date"]["input"]>;
    eqi?: InputMaybe<Scalars["Date"]["input"]>;
    gt?: InputMaybe<Scalars["Date"]["input"]>;
    gte?: InputMaybe<Scalars["Date"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
    lt?: InputMaybe<Scalars["Date"]["input"]>;
    lte?: InputMaybe<Scalars["Date"]["input"]>;
    ne?: InputMaybe<Scalars["Date"]["input"]>;
    nei?: InputMaybe<Scalars["Date"]["input"]>;
    not?: InputMaybe<DateFilterInput>;
    notContains?: InputMaybe<Scalars["Date"]["input"]>;
    notContainsi?: InputMaybe<Scalars["Date"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["Date"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DateTimeFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
    contains?: InputMaybe<Scalars["DateTime"]["input"]>;
    containsi?: InputMaybe<Scalars["DateTime"]["input"]>;
    endsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
    eq?: InputMaybe<Scalars["DateTime"]["input"]>;
    eqi?: InputMaybe<Scalars["DateTime"]["input"]>;
    gt?: InputMaybe<Scalars["DateTime"]["input"]>;
    gte?: InputMaybe<Scalars["DateTime"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
    lt?: InputMaybe<Scalars["DateTime"]["input"]>;
    lte?: InputMaybe<Scalars["DateTime"]["input"]>;
    ne?: InputMaybe<Scalars["DateTime"]["input"]>;
    nei?: InputMaybe<Scalars["DateTime"]["input"]>;
    not?: InputMaybe<DateTimeFilterInput>;
    notContains?: InputMaybe<Scalars["DateTime"]["input"]>;
    notContainsi?: InputMaybe<Scalars["DateTime"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export enum Enum_Article_Tag {
    General = "General",
    Projects = "Projects",
    Satellites = "Satellites",
}

export type FeaturedImage = {
    __typename?: "FeaturedImage";
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    featuredImage: UploadFileEntityResponse;
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    satellite?: Maybe<SatelliteEntityResponse>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type FeaturedImageEntity = {
    __typename?: "FeaturedImageEntity";
    attributes?: Maybe<FeaturedImage>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type FeaturedImageEntityResponse = {
    __typename?: "FeaturedImageEntityResponse";
    data?: Maybe<FeaturedImageEntity>;
};

export type FeaturedImageInput = {
    featuredImage?: InputMaybe<Scalars["ID"]["input"]>;
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
    satellite?: InputMaybe<Scalars["ID"]["input"]>;
};

export type FileInfoInput = {
    alternativeText?: InputMaybe<Scalars["String"]["input"]>;
    caption?: InputMaybe<Scalars["String"]["input"]>;
    name?: InputMaybe<Scalars["String"]["input"]>;
};

export type FloatFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
    contains?: InputMaybe<Scalars["Float"]["input"]>;
    containsi?: InputMaybe<Scalars["Float"]["input"]>;
    endsWith?: InputMaybe<Scalars["Float"]["input"]>;
    eq?: InputMaybe<Scalars["Float"]["input"]>;
    eqi?: InputMaybe<Scalars["Float"]["input"]>;
    gt?: InputMaybe<Scalars["Float"]["input"]>;
    gte?: InputMaybe<Scalars["Float"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
    lt?: InputMaybe<Scalars["Float"]["input"]>;
    lte?: InputMaybe<Scalars["Float"]["input"]>;
    ne?: InputMaybe<Scalars["Float"]["input"]>;
    nei?: InputMaybe<Scalars["Float"]["input"]>;
    not?: InputMaybe<FloatFilterInput>;
    notContains?: InputMaybe<Scalars["Float"]["input"]>;
    notContainsi?: InputMaybe<Scalars["Float"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["Float"]["input"]>;
};

export type GenericMorph =
    | Article
    | Author
    | FeaturedImage
    | Hero
    | HomeFeaturedProjects
    | HomeMissionStatement
    | I18NLocale
    | Project
    | Satellite
    | UploadFile
    | UploadFolder
    | UsersPermissionsPermission
    | UsersPermissionsRole
    | UsersPermissionsUser;

export type Hero = {
    __typename?: "Hero";
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    image: UploadFileEntityResponse;
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    text?: Maybe<Scalars["String"]["output"]>;
    title?: Maybe<Scalars["String"]["output"]>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type HeroEntity = {
    __typename?: "HeroEntity";
    attributes?: Maybe<Hero>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type HeroEntityResponse = {
    __typename?: "HeroEntityResponse";
    data?: Maybe<HeroEntity>;
};

export type HeroInput = {
    image?: InputMaybe<Scalars["ID"]["input"]>;
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
    text?: InputMaybe<Scalars["String"]["input"]>;
    title?: InputMaybe<Scalars["String"]["input"]>;
};

export type HomeFeaturedProjects = {
    __typename?: "HomeFeaturedProjects";
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    featuredProject1?: Maybe<ProjectEntityResponse>;
    featuredProject2?: Maybe<ProjectEntityResponse>;
    featuredProject3?: Maybe<ProjectEntityResponse>;
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    textContent?: Maybe<Scalars["String"]["output"]>;
    title?: Maybe<Scalars["String"]["output"]>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type HomeFeaturedProjectsEntity = {
    __typename?: "HomeFeaturedProjectsEntity";
    attributes?: Maybe<HomeFeaturedProjects>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type HomeFeaturedProjectsEntityResponse = {
    __typename?: "HomeFeaturedProjectsEntityResponse";
    data?: Maybe<HomeFeaturedProjectsEntity>;
};

export type HomeFeaturedProjectsInput = {
    featuredProject1?: InputMaybe<Scalars["ID"]["input"]>;
    featuredProject2?: InputMaybe<Scalars["ID"]["input"]>;
    featuredProject3?: InputMaybe<Scalars["ID"]["input"]>;
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
    textContent?: InputMaybe<Scalars["String"]["input"]>;
    title?: InputMaybe<Scalars["String"]["input"]>;
};

export type HomeMissionStatement = {
    __typename?: "HomeMissionStatement";
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    textContent?: Maybe<Scalars["String"]["output"]>;
    title?: Maybe<Scalars["String"]["output"]>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type HomeMissionStatementEntity = {
    __typename?: "HomeMissionStatementEntity";
    attributes?: Maybe<HomeMissionStatement>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type HomeMissionStatementEntityResponse = {
    __typename?: "HomeMissionStatementEntityResponse";
    data?: Maybe<HomeMissionStatementEntity>;
};

export type HomeMissionStatementInput = {
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
    textContent?: InputMaybe<Scalars["String"]["input"]>;
    title?: InputMaybe<Scalars["String"]["input"]>;
};

export type I18NLocale = {
    __typename?: "I18NLocale";
    code?: Maybe<Scalars["String"]["output"]>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    name?: Maybe<Scalars["String"]["output"]>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type I18NLocaleEntity = {
    __typename?: "I18NLocaleEntity";
    attributes?: Maybe<I18NLocale>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type I18NLocaleEntityResponse = {
    __typename?: "I18NLocaleEntityResponse";
    data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
    __typename?: "I18NLocaleEntityResponseCollection";
    data: Array<I18NLocaleEntity>;
    meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    code?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<I18NLocaleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    contains?: InputMaybe<Scalars["ID"]["input"]>;
    containsi?: InputMaybe<Scalars["ID"]["input"]>;
    endsWith?: InputMaybe<Scalars["ID"]["input"]>;
    eq?: InputMaybe<Scalars["ID"]["input"]>;
    eqi?: InputMaybe<Scalars["ID"]["input"]>;
    gt?: InputMaybe<Scalars["ID"]["input"]>;
    gte?: InputMaybe<Scalars["ID"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    lt?: InputMaybe<Scalars["ID"]["input"]>;
    lte?: InputMaybe<Scalars["ID"]["input"]>;
    ne?: InputMaybe<Scalars["ID"]["input"]>;
    nei?: InputMaybe<Scalars["ID"]["input"]>;
    not?: InputMaybe<IdFilterInput>;
    notContains?: InputMaybe<Scalars["ID"]["input"]>;
    notContainsi?: InputMaybe<Scalars["ID"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IntFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    contains?: InputMaybe<Scalars["Int"]["input"]>;
    containsi?: InputMaybe<Scalars["Int"]["input"]>;
    endsWith?: InputMaybe<Scalars["Int"]["input"]>;
    eq?: InputMaybe<Scalars["Int"]["input"]>;
    eqi?: InputMaybe<Scalars["Int"]["input"]>;
    gt?: InputMaybe<Scalars["Int"]["input"]>;
    gte?: InputMaybe<Scalars["Int"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    lt?: InputMaybe<Scalars["Int"]["input"]>;
    lte?: InputMaybe<Scalars["Int"]["input"]>;
    ne?: InputMaybe<Scalars["Int"]["input"]>;
    nei?: InputMaybe<Scalars["Int"]["input"]>;
    not?: InputMaybe<IntFilterInput>;
    notContains?: InputMaybe<Scalars["Int"]["input"]>;
    notContainsi?: InputMaybe<Scalars["Int"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["Int"]["input"]>;
};

export type JsonFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
    contains?: InputMaybe<Scalars["JSON"]["input"]>;
    containsi?: InputMaybe<Scalars["JSON"]["input"]>;
    endsWith?: InputMaybe<Scalars["JSON"]["input"]>;
    eq?: InputMaybe<Scalars["JSON"]["input"]>;
    eqi?: InputMaybe<Scalars["JSON"]["input"]>;
    gt?: InputMaybe<Scalars["JSON"]["input"]>;
    gte?: InputMaybe<Scalars["JSON"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
    lt?: InputMaybe<Scalars["JSON"]["input"]>;
    lte?: InputMaybe<Scalars["JSON"]["input"]>;
    ne?: InputMaybe<Scalars["JSON"]["input"]>;
    nei?: InputMaybe<Scalars["JSON"]["input"]>;
    not?: InputMaybe<JsonFilterInput>;
    notContains?: InputMaybe<Scalars["JSON"]["input"]>;
    notContainsi?: InputMaybe<Scalars["JSON"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type Mutation = {
    __typename?: "Mutation";
    /** Change user password. Confirm with the current password. */
    changePassword?: Maybe<UsersPermissionsLoginPayload>;
    createArticle?: Maybe<ArticleEntityResponse>;
    createAuthor?: Maybe<AuthorEntityResponse>;
    createProject?: Maybe<ProjectEntityResponse>;
    createSatellite?: Maybe<SatelliteEntityResponse>;
    createUploadFile?: Maybe<UploadFileEntityResponse>;
    createUploadFolder?: Maybe<UploadFolderEntityResponse>;
    /** Create a new role */
    createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
    /** Create a new user */
    createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    deleteArticle?: Maybe<ArticleEntityResponse>;
    deleteAuthor?: Maybe<AuthorEntityResponse>;
    deleteFeaturedImage?: Maybe<FeaturedImageEntityResponse>;
    deleteHero?: Maybe<HeroEntityResponse>;
    deleteHomeFeaturedProjects?: Maybe<HomeFeaturedProjectsEntityResponse>;
    deleteHomeMissionStatement?: Maybe<HomeMissionStatementEntityResponse>;
    deleteProject?: Maybe<ProjectEntityResponse>;
    deleteSatellite?: Maybe<SatelliteEntityResponse>;
    deleteUploadFile?: Maybe<UploadFileEntityResponse>;
    deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
    /** Delete an existing role */
    deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
    /** Delete an existing user */
    deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    /** Confirm an email users email address */
    emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
    /** Request a reset password token */
    forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
    login: UsersPermissionsLoginPayload;
    multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
    /** Register a user */
    register: UsersPermissionsLoginPayload;
    removeFile?: Maybe<UploadFileEntityResponse>;
    /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
    resetPassword?: Maybe<UsersPermissionsLoginPayload>;
    updateArticle?: Maybe<ArticleEntityResponse>;
    updateAuthor?: Maybe<AuthorEntityResponse>;
    updateFeaturedImage?: Maybe<FeaturedImageEntityResponse>;
    updateFileInfo: UploadFileEntityResponse;
    updateHero?: Maybe<HeroEntityResponse>;
    updateHomeFeaturedProjects?: Maybe<HomeFeaturedProjectsEntityResponse>;
    updateHomeMissionStatement?: Maybe<HomeMissionStatementEntityResponse>;
    updateProject?: Maybe<ProjectEntityResponse>;
    updateSatellite?: Maybe<SatelliteEntityResponse>;
    updateUploadFile?: Maybe<UploadFileEntityResponse>;
    updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
    /** Update an existing role */
    updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
    /** Update an existing user */
    updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
    currentPassword: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
    passwordConfirmation: Scalars["String"]["input"];
};

export type MutationCreateArticleArgs = {
    data: ArticleInput;
};

export type MutationCreateAuthorArgs = {
    data: AuthorInput;
};

export type MutationCreateProjectArgs = {
    data: ProjectInput;
};

export type MutationCreateSatelliteArgs = {
    data: SatelliteInput;
};

export type MutationCreateUploadFileArgs = {
    data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
    data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
};

export type MutationDeleteArticleArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationDeleteAuthorArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationDeleteProjectArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationDeleteSatelliteArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFileArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFolderArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationEmailConfirmationArgs = {
    confirmation: Scalars["String"]["input"];
};

export type MutationForgotPasswordArgs = {
    email: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
    input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
    field?: InputMaybe<Scalars["String"]["input"]>;
    files: Array<InputMaybe<Scalars["Upload"]["input"]>>;
    ref?: InputMaybe<Scalars["String"]["input"]>;
    refId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationRegisterArgs = {
    input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
    id: Scalars["ID"]["input"];
};

export type MutationResetPasswordArgs = {
    code: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
    passwordConfirmation: Scalars["String"]["input"];
};

export type MutationUpdateArticleArgs = {
    data: ArticleInput;
    id: Scalars["ID"]["input"];
};

export type MutationUpdateAuthorArgs = {
    data: AuthorInput;
    id: Scalars["ID"]["input"];
};

export type MutationUpdateFeaturedImageArgs = {
    data: FeaturedImageInput;
};

export type MutationUpdateFileInfoArgs = {
    id: Scalars["ID"]["input"];
    info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateHeroArgs = {
    data: HeroInput;
};

export type MutationUpdateHomeFeaturedProjectsArgs = {
    data: HomeFeaturedProjectsInput;
};

export type MutationUpdateHomeMissionStatementArgs = {
    data: HomeMissionStatementInput;
};

export type MutationUpdateProjectArgs = {
    data: ProjectInput;
    id: Scalars["ID"]["input"];
};

export type MutationUpdateSatelliteArgs = {
    data: SatelliteInput;
    id: Scalars["ID"]["input"];
};

export type MutationUpdateUploadFileArgs = {
    data: UploadFileInput;
    id: Scalars["ID"]["input"];
};

export type MutationUpdateUploadFolderArgs = {
    data: UploadFolderInput;
    id: Scalars["ID"]["input"];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
    id: Scalars["ID"]["input"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
    id: Scalars["ID"]["input"];
};

export type MutationUploadArgs = {
    field?: InputMaybe<Scalars["String"]["input"]>;
    file: Scalars["Upload"]["input"];
    info?: InputMaybe<FileInfoInput>;
    ref?: InputMaybe<Scalars["String"]["input"]>;
    refId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Pagination = {
    __typename?: "Pagination";
    page: Scalars["Int"]["output"];
    pageCount: Scalars["Int"]["output"];
    pageSize: Scalars["Int"]["output"];
    total: Scalars["Int"]["output"];
};

export type PaginationArg = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    page?: InputMaybe<Scalars["Int"]["input"]>;
    pageSize?: InputMaybe<Scalars["Int"]["input"]>;
    start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Project = {
    __typename?: "Project";
    content?: Maybe<Scalars["JSON"]["output"]>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    previewImage?: Maybe<UploadFileEntityResponse>;
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    satellites?: Maybe<SatelliteRelationResponseCollection>;
    slug: Scalars["String"]["output"];
    title: Scalars["String"]["output"];
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ProjectSatellitesArgs = {
    filters?: InputMaybe<SatelliteFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ProjectEntity = {
    __typename?: "ProjectEntity";
    attributes?: Maybe<Project>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type ProjectEntityResponse = {
    __typename?: "ProjectEntityResponse";
    data?: Maybe<ProjectEntity>;
};

export type ProjectEntityResponseCollection = {
    __typename?: "ProjectEntityResponseCollection";
    data: Array<ProjectEntity>;
    meta: ResponseCollectionMeta;
};

export type ProjectFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<ProjectFiltersInput>>>;
    content?: InputMaybe<JsonFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<ProjectFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ProjectFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    satellites?: InputMaybe<SatelliteFiltersInput>;
    slug?: InputMaybe<StringFilterInput>;
    title?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProjectInput = {
    content?: InputMaybe<Scalars["JSON"]["input"]>;
    previewImage?: InputMaybe<Scalars["ID"]["input"]>;
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
    satellites?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
    title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ProjectRelationResponseCollection = {
    __typename?: "ProjectRelationResponseCollection";
    data: Array<ProjectEntity>;
};

export enum PublicationState {
    Live = "LIVE",
    Preview = "PREVIEW",
}

export type Query = {
    __typename?: "Query";
    article?: Maybe<ArticleEntityResponse>;
    articles?: Maybe<ArticleEntityResponseCollection>;
    author?: Maybe<AuthorEntityResponse>;
    authors?: Maybe<AuthorEntityResponseCollection>;
    featuredImage?: Maybe<FeaturedImageEntityResponse>;
    hero?: Maybe<HeroEntityResponse>;
    homeFeaturedProjects?: Maybe<HomeFeaturedProjectsEntityResponse>;
    homeMissionStatement?: Maybe<HomeMissionStatementEntityResponse>;
    i18NLocale?: Maybe<I18NLocaleEntityResponse>;
    i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
    me?: Maybe<UsersPermissionsMe>;
    project?: Maybe<ProjectEntityResponse>;
    projects?: Maybe<ProjectEntityResponseCollection>;
    satellite?: Maybe<SatelliteEntityResponse>;
    satellites?: Maybe<SatelliteEntityResponseCollection>;
    uploadFile?: Maybe<UploadFileEntityResponse>;
    uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
    uploadFolder?: Maybe<UploadFolderEntityResponse>;
    uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
    usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
    usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
    usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
    usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryArticleArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryArticlesArgs = {
    filters?: InputMaybe<ArticleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryAuthorArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryAuthorsArgs = {
    filters?: InputMaybe<AuthorFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryFeaturedImageArgs = {
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryHeroArgs = {
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryHomeFeaturedProjectsArgs = {
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryHomeMissionStatementArgs = {
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryI18NLocaleArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryI18NLocalesArgs = {
    filters?: InputMaybe<I18NLocaleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryProjectArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryProjectsArgs = {
    filters?: InputMaybe<ProjectFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QuerySatelliteArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QuerySatellitesArgs = {
    filters?: InputMaybe<SatelliteFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUploadFileArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUploadFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUploadFolderArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUploadFoldersArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUsersPermissionsRoleArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUsersPermissionsRolesArgs = {
    filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUsersPermissionsUserArgs = {
    id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUsersPermissionsUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ResponseCollectionMeta = {
    __typename?: "ResponseCollectionMeta";
    pagination: Pagination;
};

export type Satellite = {
    __typename?: "Satellite";
    catalogNumberNORAD?: Maybe<Scalars["String"]["output"]>;
    content?: Maybe<Scalars["JSON"]["output"]>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    launchDate?: Maybe<Scalars["DateTime"]["output"]>;
    massKg?: Maybe<Scalars["Float"]["output"]>;
    missionStatus?: Maybe<Scalars["String"]["output"]>;
    name: Scalars["String"]["output"];
    projects?: Maybe<ProjectRelationResponseCollection>;
    publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
    satelliteImage?: Maybe<UploadFileEntityResponse>;
    slug: Scalars["String"]["output"];
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type SatelliteProjectsArgs = {
    filters?: InputMaybe<ProjectFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SatelliteEntity = {
    __typename?: "SatelliteEntity";
    attributes?: Maybe<Satellite>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type SatelliteEntityResponse = {
    __typename?: "SatelliteEntityResponse";
    data?: Maybe<SatelliteEntity>;
};

export type SatelliteEntityResponseCollection = {
    __typename?: "SatelliteEntityResponseCollection";
    data: Array<SatelliteEntity>;
    meta: ResponseCollectionMeta;
};

export type SatelliteFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<SatelliteFiltersInput>>>;
    catalogNumberNORAD?: InputMaybe<StringFilterInput>;
    content?: InputMaybe<JsonFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    launchDate?: InputMaybe<DateTimeFilterInput>;
    massKg?: InputMaybe<FloatFilterInput>;
    missionStatus?: InputMaybe<StringFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<SatelliteFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<SatelliteFiltersInput>>>;
    projects?: InputMaybe<ProjectFiltersInput>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SatelliteInput = {
    catalogNumberNORAD?: InputMaybe<Scalars["String"]["input"]>;
    content?: InputMaybe<Scalars["JSON"]["input"]>;
    launchDate?: InputMaybe<Scalars["DateTime"]["input"]>;
    massKg?: InputMaybe<Scalars["Float"]["input"]>;
    missionStatus?: InputMaybe<Scalars["String"]["input"]>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    projects?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
    satelliteImage?: InputMaybe<Scalars["ID"]["input"]>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type SatelliteRelationResponseCollection = {
    __typename?: "SatelliteRelationResponseCollection";
    data: Array<SatelliteEntity>;
};

export type StringFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    contains?: InputMaybe<Scalars["String"]["input"]>;
    containsi?: InputMaybe<Scalars["String"]["input"]>;
    endsWith?: InputMaybe<Scalars["String"]["input"]>;
    eq?: InputMaybe<Scalars["String"]["input"]>;
    eqi?: InputMaybe<Scalars["String"]["input"]>;
    gt?: InputMaybe<Scalars["String"]["input"]>;
    gte?: InputMaybe<Scalars["String"]["input"]>;
    in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    lt?: InputMaybe<Scalars["String"]["input"]>;
    lte?: InputMaybe<Scalars["String"]["input"]>;
    ne?: InputMaybe<Scalars["String"]["input"]>;
    nei?: InputMaybe<Scalars["String"]["input"]>;
    not?: InputMaybe<StringFilterInput>;
    notContains?: InputMaybe<Scalars["String"]["input"]>;
    notContainsi?: InputMaybe<Scalars["String"]["input"]>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
    null?: InputMaybe<Scalars["Boolean"]["input"]>;
    or?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadFile = {
    __typename?: "UploadFile";
    alternativeText?: Maybe<Scalars["String"]["output"]>;
    caption?: Maybe<Scalars["String"]["output"]>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    ext?: Maybe<Scalars["String"]["output"]>;
    formats?: Maybe<Scalars["JSON"]["output"]>;
    hash: Scalars["String"]["output"];
    height?: Maybe<Scalars["Int"]["output"]>;
    mime: Scalars["String"]["output"];
    name: Scalars["String"]["output"];
    previewUrl?: Maybe<Scalars["String"]["output"]>;
    provider: Scalars["String"]["output"];
    provider_metadata?: Maybe<Scalars["JSON"]["output"]>;
    related?: Maybe<Array<Maybe<GenericMorph>>>;
    size: Scalars["Float"]["output"];
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
    url: Scalars["String"]["output"];
    width?: Maybe<Scalars["Int"]["output"]>;
};

export type UploadFileEntity = {
    __typename?: "UploadFileEntity";
    attributes?: Maybe<UploadFile>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type UploadFileEntityResponse = {
    __typename?: "UploadFileEntityResponse";
    data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
    __typename?: "UploadFileEntityResponseCollection";
    data: Array<UploadFileEntity>;
    meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
    alternativeText?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
    caption?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    ext?: InputMaybe<StringFilterInput>;
    folder?: InputMaybe<UploadFolderFiltersInput>;
    folderPath?: InputMaybe<StringFilterInput>;
    formats?: InputMaybe<JsonFilterInput>;
    hash?: InputMaybe<StringFilterInput>;
    height?: InputMaybe<IntFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    mime?: InputMaybe<StringFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UploadFileFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
    previewUrl?: InputMaybe<StringFilterInput>;
    provider?: InputMaybe<StringFilterInput>;
    provider_metadata?: InputMaybe<JsonFilterInput>;
    size?: InputMaybe<FloatFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    url?: InputMaybe<StringFilterInput>;
    width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
    alternativeText?: InputMaybe<Scalars["String"]["input"]>;
    caption?: InputMaybe<Scalars["String"]["input"]>;
    ext?: InputMaybe<Scalars["String"]["input"]>;
    folder?: InputMaybe<Scalars["ID"]["input"]>;
    folderPath?: InputMaybe<Scalars["String"]["input"]>;
    formats?: InputMaybe<Scalars["JSON"]["input"]>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    height?: InputMaybe<Scalars["Int"]["input"]>;
    mime?: InputMaybe<Scalars["String"]["input"]>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    previewUrl?: InputMaybe<Scalars["String"]["input"]>;
    provider?: InputMaybe<Scalars["String"]["input"]>;
    provider_metadata?: InputMaybe<Scalars["JSON"]["input"]>;
    size?: InputMaybe<Scalars["Float"]["input"]>;
    url?: InputMaybe<Scalars["String"]["input"]>;
    width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadFileRelationResponseCollection = {
    __typename?: "UploadFileRelationResponseCollection";
    data: Array<UploadFileEntity>;
};

export type UploadFolder = {
    __typename?: "UploadFolder";
    children?: Maybe<UploadFolderRelationResponseCollection>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    files?: Maybe<UploadFileRelationResponseCollection>;
    name: Scalars["String"]["output"];
    parent?: Maybe<UploadFolderEntityResponse>;
    path: Scalars["String"]["output"];
    pathId: Scalars["Int"]["output"];
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UploadFolderChildrenArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UploadFolderFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UploadFolderEntity = {
    __typename?: "UploadFolderEntity";
    attributes?: Maybe<UploadFolder>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type UploadFolderEntityResponse = {
    __typename?: "UploadFolderEntityResponse";
    data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
    __typename?: "UploadFolderEntityResponseCollection";
    data: Array<UploadFolderEntity>;
    meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
    children?: InputMaybe<UploadFolderFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    files?: InputMaybe<UploadFileFiltersInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UploadFolderFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
    parent?: InputMaybe<UploadFolderFiltersInput>;
    path?: InputMaybe<StringFilterInput>;
    pathId?: InputMaybe<IntFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    files?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    parent?: InputMaybe<Scalars["ID"]["input"]>;
    path?: InputMaybe<Scalars["String"]["input"]>;
    pathId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadFolderRelationResponseCollection = {
    __typename?: "UploadFolderRelationResponseCollection";
    data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
    __typename?: "UsersPermissionsCreateRolePayload";
    ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsDeleteRolePayload = {
    __typename?: "UsersPermissionsDeleteRolePayload";
    ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsLoginInput = {
    identifier: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
    provider?: Scalars["String"]["input"];
};

export type UsersPermissionsLoginPayload = {
    __typename?: "UsersPermissionsLoginPayload";
    jwt?: Maybe<Scalars["String"]["output"]>;
    user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
    __typename?: "UsersPermissionsMe";
    blocked?: Maybe<Scalars["Boolean"]["output"]>;
    confirmed?: Maybe<Scalars["Boolean"]["output"]>;
    email?: Maybe<Scalars["String"]["output"]>;
    id: Scalars["ID"]["output"];
    role?: Maybe<UsersPermissionsMeRole>;
    username: Scalars["String"]["output"];
};

export type UsersPermissionsMeRole = {
    __typename?: "UsersPermissionsMeRole";
    description?: Maybe<Scalars["String"]["output"]>;
    id: Scalars["ID"]["output"];
    name: Scalars["String"]["output"];
    type?: Maybe<Scalars["String"]["output"]>;
};

export type UsersPermissionsPasswordPayload = {
    __typename?: "UsersPermissionsPasswordPayload";
    ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsPermission = {
    __typename?: "UsersPermissionsPermission";
    action: Scalars["String"]["output"];
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UsersPermissionsPermissionEntity = {
    __typename?: "UsersPermissionsPermissionEntity";
    attributes?: Maybe<UsersPermissionsPermission>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type UsersPermissionsPermissionFiltersInput = {
    action?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
    __typename?: "UsersPermissionsPermissionRelationResponseCollection";
    data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
    email: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
    username: Scalars["String"]["input"];
};

export type UsersPermissionsRole = {
    __typename?: "UsersPermissionsRole";
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    description?: Maybe<Scalars["String"]["output"]>;
    name: Scalars["String"]["output"];
    permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
    type?: Maybe<Scalars["String"]["output"]>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
    users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
    filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleEntity = {
    __typename?: "UsersPermissionsRoleEntity";
    attributes?: Maybe<UsersPermissionsRole>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type UsersPermissionsRoleEntityResponse = {
    __typename?: "UsersPermissionsRoleEntityResponse";
    data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
    __typename?: "UsersPermissionsRoleEntityResponseCollection";
    data: Array<UsersPermissionsRoleEntity>;
    meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    description?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
    permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    type?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
    description?: InputMaybe<Scalars["String"]["input"]>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
    type?: InputMaybe<Scalars["String"]["input"]>;
    users?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type UsersPermissionsUpdateRolePayload = {
    __typename?: "UsersPermissionsUpdateRolePayload";
    ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsUser = {
    __typename?: "UsersPermissionsUser";
    blocked?: Maybe<Scalars["Boolean"]["output"]>;
    confirmed?: Maybe<Scalars["Boolean"]["output"]>;
    createdAt?: Maybe<Scalars["DateTime"]["output"]>;
    email: Scalars["String"]["output"];
    provider?: Maybe<Scalars["String"]["output"]>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
    username: Scalars["String"]["output"];
};

export type UsersPermissionsUserEntity = {
    __typename?: "UsersPermissionsUserEntity";
    attributes?: Maybe<UsersPermissionsUser>;
    id?: Maybe<Scalars["ID"]["output"]>;
};

export type UsersPermissionsUserEntityResponse = {
    __typename?: "UsersPermissionsUserEntityResponse";
    data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
    __typename?: "UsersPermissionsUserEntityResponseCollection";
    data: Array<UsersPermissionsUserEntity>;
    meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
    blocked?: InputMaybe<BooleanFilterInput>;
    confirmationToken?: InputMaybe<StringFilterInput>;
    confirmed?: InputMaybe<BooleanFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    email?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<UsersPermissionsUserFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
    password?: InputMaybe<StringFilterInput>;
    provider?: InputMaybe<StringFilterInput>;
    resetPasswordToken?: InputMaybe<StringFilterInput>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
    blocked?: InputMaybe<Scalars["Boolean"]["input"]>;
    confirmationToken?: InputMaybe<Scalars["String"]["input"]>;
    confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
    email?: InputMaybe<Scalars["String"]["input"]>;
    password?: InputMaybe<Scalars["String"]["input"]>;
    provider?: InputMaybe<Scalars["String"]["input"]>;
    resetPasswordToken?: InputMaybe<Scalars["String"]["input"]>;
    role?: InputMaybe<Scalars["ID"]["input"]>;
    username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
    __typename?: "UsersPermissionsUserRelationResponseCollection";
    data: Array<UsersPermissionsUserEntity>;
};

export type ArticleWithSlugQueryVariables = Exact<{
    articlesFilters?: InputMaybe<ArticleFiltersInput>;
}>;

export type ArticleWithSlugQuery = {
    __typename?: "Query";
    articles?: {
        __typename?: "ArticleEntityResponseCollection";
        data: Array<{
            __typename?: "ArticleEntity";
            id?: string | null;
            attributes?: {
                __typename?: "Article";
                body: any;
                datePublished: any;
                previewTitle: string;
                author?: {
                    __typename?: "AuthorEntityResponse";
                    data?: {
                        __typename?: "AuthorEntity";
                        attributes?: {
                            __typename?: "Author";
                            name: string;
                            avatar?: {
                                __typename?: "UploadFileEntityResponse";
                                data?: {
                                    __typename?: "UploadFileEntity";
                                    attributes?: {
                                        __typename?: "UploadFile";
                                        url: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null;
                } | null;
                coverImage?: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        }>;
    } | null;
};

export type ProjectsQueryVariables = Exact<{
    projectFilters?: InputMaybe<ProjectFiltersInput>;
}>;

export type ProjectsQuery = {
    __typename?: "Query";
    projects?: {
        __typename?: "ProjectEntityResponseCollection";
        data: Array<{
            __typename?: "ProjectEntity";
            attributes?: {
                __typename?: "Project";
                title: string;
                content?: any | null;
                slug: string;
                satellites?: {
                    __typename?: "SatelliteRelationResponseCollection";
                    data: Array<{
                        __typename?: "SatelliteEntity";
                        id?: string | null;
                        attributes?: {
                            __typename?: "Satellite";
                            name: string;
                            slug: string;
                            satelliteImage?: {
                                __typename?: "UploadFileEntityResponse";
                                data?: {
                                    __typename?: "UploadFileEntity";
                                    attributes?: {
                                        __typename?: "UploadFile";
                                        url: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    }>;
                } | null;
                previewImage?: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        id?: string | null;
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        }>;
    } | null;
};

export type Get_ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type Get_ProjectsQuery = {
    __typename?: "Query";
    projects?: {
        __typename?: "ProjectEntityResponseCollection";
        data: Array<{
            __typename?: "ProjectEntity";
            id?: string | null;
            attributes?: {
                __typename?: "Project";
                title: string;
                content?: any | null;
                slug: string;
                satellites?: {
                    __typename?: "SatelliteRelationResponseCollection";
                    data: Array<{
                        __typename?: "SatelliteEntity";
                        attributes?: {
                            __typename?: "Satellite";
                            catalogNumberNORAD?: string | null;
                        } | null;
                    }>;
                } | null;
                previewImage?: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        }>;
    } | null;
};

export type Get_SatellitesQueryVariables = Exact<{ [key: string]: never }>;

export type Get_SatellitesQuery = {
    __typename?: "Query";
    satellites?: {
        __typename?: "SatelliteEntityResponseCollection";
        data: Array<{
            __typename?: "SatelliteEntity";
            id?: string | null;
            attributes?: {
                __typename?: "Satellite";
                catalogNumberNORAD?: string | null;
                name: string;
                missionStatus?: string | null;
                slug: string;
                massKg?: number | null;
                satelliteImage?: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        }>;
    } | null;
};

export type QueryQueryVariables = Exact<{
    publicationState?: InputMaybe<PublicationState>;
}>;

export type QueryQuery = {
    __typename?: "Query";
    hero?: {
        __typename?: "HeroEntityResponse";
        data?: {
            __typename?: "HeroEntity";
            attributes?: {
                __typename?: "Hero";
                title?: string | null;
                text?: string | null;
                image: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                };
            } | null;
        } | null;
    } | null;
};

export type Get_ArticlesQueryVariables = Exact<{
    pagination?: InputMaybe<PaginationArg>;
    filters?: InputMaybe<ArticleFiltersInput>;
}>;

export type Get_ArticlesQuery = {
    __typename?: "Query";
    articles?: {
        __typename?: "ArticleEntityResponseCollection";
        data: Array<{
            __typename?: "ArticleEntity";
            id?: string | null;
            attributes?: {
                __typename?: "Article";
                previewTitle: string;
                datePublished: any;
                body: any;
                createdAt?: any | null;
                publishedAt?: any | null;
                slug: string;
                Tag?: Enum_Article_Tag | null;
                author?: {
                    __typename?: "AuthorEntityResponse";
                    data?: {
                        __typename?: "AuthorEntity";
                        attributes?: {
                            __typename?: "Author";
                            name: string;
                            avatar?: {
                                __typename?: "UploadFileEntityResponse";
                                data?: {
                                    __typename?: "UploadFileEntity";
                                    attributes?: {
                                        __typename?: "UploadFile";
                                        url: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null;
                } | null;
                coverImage?: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        }>;
        meta: {
            __typename?: "ResponseCollectionMeta";
            pagination: { __typename?: "Pagination"; total: number };
        };
    } | null;
};

export type FeaturedImageQueryVariables = Exact<{ [key: string]: never }>;

export type FeaturedImageQuery = {
    __typename?: "Query";
    featuredImage?: {
        __typename?: "FeaturedImageEntityResponse";
        data?: {
            __typename?: "FeaturedImageEntity";
            attributes?: {
                __typename?: "FeaturedImage";
                createdAt?: any | null;
                updatedAt?: any | null;
                publishedAt?: any | null;
                featuredImage: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                };
                satellite?: {
                    __typename?: "SatelliteEntityResponse";
                    data?: {
                        __typename?: "SatelliteEntity";
                        attributes?: {
                            __typename?: "Satellite";
                            catalogNumberNORAD?: string | null;
                            name: string;
                            slug: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        } | null;
    } | null;
};

export type HomeFeaturedProjectsQueryVariables = Exact<{
    [key: string]: never;
}>;

export type HomeFeaturedProjectsQuery = {
    __typename?: "Query";
    homeFeaturedProjects?: {
        __typename?: "HomeFeaturedProjectsEntityResponse";
        data?: {
            __typename?: "HomeFeaturedProjectsEntity";
            attributes?: {
                __typename?: "HomeFeaturedProjects";
                title?: string | null;
                textContent?: string | null;
                featuredProject1?: {
                    __typename?: "ProjectEntityResponse";
                    data?: {
                        __typename?: "ProjectEntity";
                        attributes?: {
                            __typename?: "Project";
                            title: string;
                            slug: string;
                            content?: any | null;
                            previewImage?: {
                                __typename?: "UploadFileEntityResponse";
                                data?: {
                                    __typename?: "UploadFileEntity";
                                    attributes?: {
                                        __typename?: "UploadFile";
                                        url: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null;
                } | null;
                featuredProject2?: {
                    __typename?: "ProjectEntityResponse";
                    data?: {
                        __typename?: "ProjectEntity";
                        attributes?: {
                            __typename?: "Project";
                            title: string;
                            slug: string;
                            content?: any | null;
                            previewImage?: {
                                __typename?: "UploadFileEntityResponse";
                                data?: {
                                    __typename?: "UploadFileEntity";
                                    attributes?: {
                                        __typename?: "UploadFile";
                                        url: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null;
                } | null;
                featuredProject3?: {
                    __typename?: "ProjectEntityResponse";
                    data?: {
                        __typename?: "ProjectEntity";
                        attributes?: {
                            __typename?: "Project";
                            title: string;
                            slug: string;
                            content?: any | null;
                            previewImage?: {
                                __typename?: "UploadFileEntityResponse";
                                data?: {
                                    __typename?: "UploadFileEntity";
                                    attributes?: {
                                        __typename?: "UploadFile";
                                        url: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null;
                } | null;
            } | null;
        } | null;
    } | null;
};

export type HomeMissionStatementQueryVariables = Exact<{
    [key: string]: never;
}>;

export type HomeMissionStatementQuery = {
    __typename?: "Query";
    homeMissionStatement?: {
        __typename?: "HomeMissionStatementEntityResponse";
        data?: {
            __typename?: "HomeMissionStatementEntity";
            attributes?: {
                __typename?: "HomeMissionStatement";
                title?: string | null;
                textContent?: string | null;
            } | null;
        } | null;
    } | null;
};

export type Get_Satellite_InfoQueryVariables = Exact<{
    filters?: InputMaybe<SatelliteFiltersInput>;
}>;

export type Get_Satellite_InfoQuery = {
    __typename?: "Query";
    satellites?: {
        __typename?: "SatelliteEntityResponseCollection";
        data: Array<{
            __typename?: "SatelliteEntity";
            id?: string | null;
            attributes?: {
                __typename?: "Satellite";
                catalogNumberNORAD?: string | null;
                content?: any | null;
                name: string;
                massKg?: number | null;
                missionStatus?: string | null;
                launchDate?: any | null;
                satelliteImage?: {
                    __typename?: "UploadFileEntityResponse";
                    data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                            __typename?: "UploadFile";
                            url: string;
                        } | null;
                    } | null;
                } | null;
                projects?: {
                    __typename?: "ProjectRelationResponseCollection";
                    data: Array<{
                        __typename?: "ProjectEntity";
                        id?: string | null;
                        attributes?: {
                            __typename?: "Project";
                            title: string;
                            slug: string;
                            previewImage?: {
                                __typename?: "UploadFileEntityResponse";
                                data?: {
                                    __typename?: "UploadFileEntity";
                                    attributes?: {
                                        __typename?: "UploadFile";
                                        url: string;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    }>;
                } | null;
            } | null;
        }>;
    } | null;
};

export type Get_Satellite_Names_And_IdQueryVariables = Exact<{
    [key: string]: never;
}>;

export type Get_Satellite_Names_And_IdQuery = {
    __typename?: "Query";
    satellites?: {
        __typename?: "SatelliteEntityResponseCollection";
        data: Array<{
            __typename?: "SatelliteEntity";
            id?: string | null;
            attributes?: {
                __typename?: "Satellite";
                catalogNumberNORAD?: string | null;
                name: string;
            } | null;
        }>;
    } | null;
};

export const ArticleWithSlugDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ArticleWithSlug" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "articlesFilters" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "ArticleFiltersInput" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "articles" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "filters" },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "articlesFilters",
                                    },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "id",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "author",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "name",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "avatar",
                                                                                                                },
                                                                                                                selectionSet:
                                                                                                                    {
                                                                                                                        kind: "SelectionSet",
                                                                                                                        selections:
                                                                                                                            [
                                                                                                                                {
                                                                                                                                    kind: "Field",
                                                                                                                                    name: {
                                                                                                                                        kind: "Name",
                                                                                                                                        value: "data",
                                                                                                                                    },
                                                                                                                                    selectionSet:
                                                                                                                                        {
                                                                                                                                            kind: "SelectionSet",
                                                                                                                                            selections:
                                                                                                                                                [
                                                                                                                                                    {
                                                                                                                                                        kind: "Field",
                                                                                                                                                        name: {
                                                                                                                                                            kind: "Name",
                                                                                                                                                            value: "attributes",
                                                                                                                                                        },
                                                                                                                                                        selectionSet:
                                                                                                                                                            {
                                                                                                                                                                kind: "SelectionSet",
                                                                                                                                                                selections:
                                                                                                                                                                    [
                                                                                                                                                                        {
                                                                                                                                                                            kind: "Field",
                                                                                                                                                                            name: {
                                                                                                                                                                                kind: "Name",
                                                                                                                                                                                value: "url",
                                                                                                                                                                            },
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                        },
                                                                                                                                },
                                                                                                                            ],
                                                                                                                    },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "body",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "coverImage",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "datePublished",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "previewTitle",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    ArticleWithSlugQuery,
    ArticleWithSlugQueryVariables
>;
export const ProjectsDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "Projects" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "projectFilters" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "ProjectFiltersInput" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "projects" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "filters" },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "projectFilters",
                                    },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "title",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "content",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "satellites",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "id",
                                                                                            },
                                                                                        },
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "name",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "slug",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "satelliteImage",
                                                                                                                },
                                                                                                                selectionSet:
                                                                                                                    {
                                                                                                                        kind: "SelectionSet",
                                                                                                                        selections:
                                                                                                                            [
                                                                                                                                {
                                                                                                                                    kind: "Field",
                                                                                                                                    name: {
                                                                                                                                        kind: "Name",
                                                                                                                                        value: "data",
                                                                                                                                    },
                                                                                                                                    selectionSet:
                                                                                                                                        {
                                                                                                                                            kind: "SelectionSet",
                                                                                                                                            selections:
                                                                                                                                                [
                                                                                                                                                    {
                                                                                                                                                        kind: "Field",
                                                                                                                                                        name: {
                                                                                                                                                            kind: "Name",
                                                                                                                                                            value: "attributes",
                                                                                                                                                        },
                                                                                                                                                        selectionSet:
                                                                                                                                                            {
                                                                                                                                                                kind: "SelectionSet",
                                                                                                                                                                selections:
                                                                                                                                                                    [
                                                                                                                                                                        {
                                                                                                                                                                            kind: "Field",
                                                                                                                                                                            name: {
                                                                                                                                                                                kind: "Name",
                                                                                                                                                                                value: "url",
                                                                                                                                                                            },
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                        },
                                                                                                                                },
                                                                                                                            ],
                                                                                                                    },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "slug",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "previewImage",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "id",
                                                                                            },
                                                                                        },
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const Get_ProjectsDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GET_PROJECTS" },
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "projects" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "sort" },
                                value: {
                                    kind: "ListValue",
                                    values: [
                                        {
                                            kind: "StringValue",
                                            value: "publishedAt:desc",
                                            block: false,
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "id",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "title",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "content",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "satellites",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "catalogNumberNORAD",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "slug",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "previewImage",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<Get_ProjectsQuery, Get_ProjectsQueryVariables>;
export const Get_SatellitesDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GET_SATELLITES" },
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "satellites" },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "id",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "catalogNumberNORAD",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "name",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "satelliteImage",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "missionStatus",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "slug",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "massKg",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<Get_SatellitesQuery, Get_SatellitesQueryVariables>;
export const QueryDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "Query" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "publicationState" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "PublicationState" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "hero" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: {
                                    kind: "Name",
                                    value: "publicationState",
                                },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "publicationState",
                                    },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "title",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "text",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "image",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const Get_ArticlesDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GET_ARTICLES" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "PaginationArg" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "ArticleFiltersInput" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "articles" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "sort" },
                                value: {
                                    kind: "ListValue",
                                    values: [
                                        {
                                            kind: "StringValue",
                                            value: "datePublished:desc",
                                            block: false,
                                        },
                                    ],
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "pagination" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "pagination" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "filters" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "filters" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "id",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "author",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "name",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "avatar",
                                                                                                                },
                                                                                                                selectionSet:
                                                                                                                    {
                                                                                                                        kind: "SelectionSet",
                                                                                                                        selections:
                                                                                                                            [
                                                                                                                                {
                                                                                                                                    kind: "Field",
                                                                                                                                    name: {
                                                                                                                                        kind: "Name",
                                                                                                                                        value: "data",
                                                                                                                                    },
                                                                                                                                    selectionSet:
                                                                                                                                        {
                                                                                                                                            kind: "SelectionSet",
                                                                                                                                            selections:
                                                                                                                                                [
                                                                                                                                                    {
                                                                                                                                                        kind: "Field",
                                                                                                                                                        name: {
                                                                                                                                                            kind: "Name",
                                                                                                                                                            value: "attributes",
                                                                                                                                                        },
                                                                                                                                                        selectionSet:
                                                                                                                                                            {
                                                                                                                                                                kind: "SelectionSet",
                                                                                                                                                                selections:
                                                                                                                                                                    [
                                                                                                                                                                        {
                                                                                                                                                                            kind: "Field",
                                                                                                                                                                            name: {
                                                                                                                                                                                kind: "Name",
                                                                                                                                                                                value: "url",
                                                                                                                                                                            },
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                        },
                                                                                                                                },
                                                                                                                            ],
                                                                                                                    },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "previewTitle",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "datePublished",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "body",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "coverImage",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "createdAt",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "publishedAt",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "slug",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "Tag",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "meta" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pagination",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "total",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<Get_ArticlesQuery, Get_ArticlesQueryVariables>;
export const FeaturedImageDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "FeaturedImage" },
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "featuredImage" },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "featuredImage",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "satellite",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "catalogNumberNORAD",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "name",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "slug",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "createdAt",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "updatedAt",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "publishedAt",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FeaturedImageQuery, FeaturedImageQueryVariables>;
export const HomeFeaturedProjectsDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "HomeFeaturedProjects" },
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "homeFeaturedProjects" },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "title",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "textContent",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "featuredProject1",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "title",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "previewImage",
                                                                                                                },
                                                                                                                selectionSet:
                                                                                                                    {
                                                                                                                        kind: "SelectionSet",
                                                                                                                        selections:
                                                                                                                            [
                                                                                                                                {
                                                                                                                                    kind: "Field",
                                                                                                                                    name: {
                                                                                                                                        kind: "Name",
                                                                                                                                        value: "data",
                                                                                                                                    },
                                                                                                                                    selectionSet:
                                                                                                                                        {
                                                                                                                                            kind: "SelectionSet",
                                                                                                                                            selections:
                                                                                                                                                [
                                                                                                                                                    {
                                                                                                                                                        kind: "Field",
                                                                                                                                                        name: {
                                                                                                                                                            kind: "Name",
                                                                                                                                                            value: "attributes",
                                                                                                                                                        },
                                                                                                                                                        selectionSet:
                                                                                                                                                            {
                                                                                                                                                                kind: "SelectionSet",
                                                                                                                                                                selections:
                                                                                                                                                                    [
                                                                                                                                                                        {
                                                                                                                                                                            kind: "Field",
                                                                                                                                                                            name: {
                                                                                                                                                                                kind: "Name",
                                                                                                                                                                                value: "url",
                                                                                                                                                                            },
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                        },
                                                                                                                                },
                                                                                                                            ],
                                                                                                                    },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "slug",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "content",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "featuredProject2",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "title",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "previewImage",
                                                                                                                },
                                                                                                                selectionSet:
                                                                                                                    {
                                                                                                                        kind: "SelectionSet",
                                                                                                                        selections:
                                                                                                                            [
                                                                                                                                {
                                                                                                                                    kind: "Field",
                                                                                                                                    name: {
                                                                                                                                        kind: "Name",
                                                                                                                                        value: "data",
                                                                                                                                    },
                                                                                                                                    selectionSet:
                                                                                                                                        {
                                                                                                                                            kind: "SelectionSet",
                                                                                                                                            selections:
                                                                                                                                                [
                                                                                                                                                    {
                                                                                                                                                        kind: "Field",
                                                                                                                                                        name: {
                                                                                                                                                            kind: "Name",
                                                                                                                                                            value: "attributes",
                                                                                                                                                        },
                                                                                                                                                        selectionSet:
                                                                                                                                                            {
                                                                                                                                                                kind: "SelectionSet",
                                                                                                                                                                selections:
                                                                                                                                                                    [
                                                                                                                                                                        {
                                                                                                                                                                            kind: "Field",
                                                                                                                                                                            name: {
                                                                                                                                                                                kind: "Name",
                                                                                                                                                                                value: "url",
                                                                                                                                                                            },
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                        },
                                                                                                                                },
                                                                                                                            ],
                                                                                                                    },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "slug",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "content",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "featuredProject3",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "title",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "previewImage",
                                                                                                                },
                                                                                                                selectionSet:
                                                                                                                    {
                                                                                                                        kind: "SelectionSet",
                                                                                                                        selections:
                                                                                                                            [
                                                                                                                                {
                                                                                                                                    kind: "Field",
                                                                                                                                    name: {
                                                                                                                                        kind: "Name",
                                                                                                                                        value: "data",
                                                                                                                                    },
                                                                                                                                    selectionSet:
                                                                                                                                        {
                                                                                                                                            kind: "SelectionSet",
                                                                                                                                            selections:
                                                                                                                                                [
                                                                                                                                                    {
                                                                                                                                                        kind: "Field",
                                                                                                                                                        name: {
                                                                                                                                                            kind: "Name",
                                                                                                                                                            value: "attributes",
                                                                                                                                                        },
                                                                                                                                                        selectionSet:
                                                                                                                                                            {
                                                                                                                                                                kind: "SelectionSet",
                                                                                                                                                                selections:
                                                                                                                                                                    [
                                                                                                                                                                        {
                                                                                                                                                                            kind: "Field",
                                                                                                                                                                            name: {
                                                                                                                                                                                kind: "Name",
                                                                                                                                                                                value: "url",
                                                                                                                                                                            },
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                        },
                                                                                                                                },
                                                                                                                            ],
                                                                                                                    },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "slug",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "content",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    HomeFeaturedProjectsQuery,
    HomeFeaturedProjectsQueryVariables
>;
export const HomeMissionStatementDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "HomeMissionStatement" },
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "homeMissionStatement" },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "title",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "textContent",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    HomeMissionStatementQuery,
    HomeMissionStatementQueryVariables
>;
export const Get_Satellite_InfoDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GET_SATELLITE_INFO" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "SatelliteFiltersInput" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "satellites" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "filters" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "filters" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "id",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "catalogNumberNORAD",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "content",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "name",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "massKg",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "missionStatus",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "satelliteImage",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "url",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "projects",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data",
                                                                        },
                                                                        selectionSet:
                                                                            {
                                                                                kind: "SelectionSet",
                                                                                selections:
                                                                                    [
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "attributes",
                                                                                            },
                                                                                            selectionSet:
                                                                                                {
                                                                                                    kind: "SelectionSet",
                                                                                                    selections:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "title",
                                                                                                                },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "previewImage",
                                                                                                                },
                                                                                                                selectionSet:
                                                                                                                    {
                                                                                                                        kind: "SelectionSet",
                                                                                                                        selections:
                                                                                                                            [
                                                                                                                                {
                                                                                                                                    kind: "Field",
                                                                                                                                    name: {
                                                                                                                                        kind: "Name",
                                                                                                                                        value: "data",
                                                                                                                                    },
                                                                                                                                    selectionSet:
                                                                                                                                        {
                                                                                                                                            kind: "SelectionSet",
                                                                                                                                            selections:
                                                                                                                                                [
                                                                                                                                                    {
                                                                                                                                                        kind: "Field",
                                                                                                                                                        name: {
                                                                                                                                                            kind: "Name",
                                                                                                                                                            value: "attributes",
                                                                                                                                                        },
                                                                                                                                                        selectionSet:
                                                                                                                                                            {
                                                                                                                                                                kind: "SelectionSet",
                                                                                                                                                                selections:
                                                                                                                                                                    [
                                                                                                                                                                        {
                                                                                                                                                                            kind: "Field",
                                                                                                                                                                            name: {
                                                                                                                                                                                kind: "Name",
                                                                                                                                                                                value: "url",
                                                                                                                                                                            },
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                        },
                                                                                                                                },
                                                                                                                            ],
                                                                                                                    },
                                                                                                            },
                                                                                                            {
                                                                                                                kind: "Field",
                                                                                                                name: {
                                                                                                                    kind: "Name",
                                                                                                                    value: "slug",
                                                                                                                },
                                                                                                            },
                                                                                                        ],
                                                                                                },
                                                                                        },
                                                                                        {
                                                                                            kind: "Field",
                                                                                            name: {
                                                                                                kind: "Name",
                                                                                                value: "id",
                                                                                            },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "launchDate",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    Get_Satellite_InfoQuery,
    Get_Satellite_InfoQueryVariables
>;
export const Get_Satellite_Names_And_IdDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GET_SATELLITE_NAMES_AND_ID" },
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "satellites" },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "data" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "id",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "attributes",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "catalogNumberNORAD",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "name",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    Get_Satellite_Names_And_IdQuery,
    Get_Satellite_Names_And_IdQueryVariables
>;
