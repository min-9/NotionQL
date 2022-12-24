import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum Object {
    list
    block
    page
    database
    user
    workspace
  }
  interface ObjectNode {
    object: Object!
    id: ID!
  }
  enum Type {
    paragraph
    heading_1
    heading_2
    heading_3
    bulleted_list_item
    numbered_list_item
    to_do
    toggle
    unsupported
    child_page
    database_id
    page_id
    workspace
    rich_text
    text
    boolean
    number
    formula
    multi_select
    select
    files
    array
    rollup
    date
    people
    checkbox
    email
    phone_number
    created_time
    created_by
    last_edited_time
    last_edited_by
    url
    mention
    user
    person
    bot
    page
    database
    equation
  }
  type NotionAnnotation {
    bold: Boolean
    italic: Boolean
    strikethrough: Boolean
    underline: Boolean
    code: Boolean
    color: String
  }
  interface RichText {
    type: Type
    plain_text: String
    href: String
    annotations: NotionAnnotation
  }
  type DatabasePropertiesConnection {
    edges: [DatabasePropertyEdge]
  }
  type DatabasePropertyEdge {
    name: String
    node: Configuration
  }
  interface Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
  }
  enum DataBasePropertyConfigurationType {
    title
    rich_text
    number
    select
    multi_select
    date
    people
    file
    checkbox
    url
    email
    phone_number
    formula
    relation
    rollup
    created_time
    created_by
    last_edited_time
    last_edited_by
  }
  type Database implements ObjectNode {
    object: Object!
    id: ID!
    created_time: String
    last_edited_time: String
    title: [RichText]
    properties: DatabasePropertiesConnection
    entries: EntriesConnection
  }
  type EntriesConnection {
    edges: [EntryEdge]
  }
  type EntryEdge {
    node: Page
  }
  enum BlockType {
    paragraph
    heading_1
    heading_2
    heading_3
    bulleted_list_item
    numbered_list_item
    to_do
    toggle
    child_page
    unsupported
  }
  interface Block {
    id: ID!
    object: Object
    type: BlockType
    createdTime: String
    last_edited_time: String
    has_children: Boolean
  }
  enum PropertyValueType {
    rich_text
    number
    select
    multi_select
    date
    formula
    relation
    rollup
    title
    people
    files
    checkbox
    url
    email
    phone_number
    created_time
    created_by
    last_edited_time
    last_edited_by
    status
    text
  }
  interface PropertyValue {
    id: ID!
    type: PropertyValueType!
  }
  type PagePropertyEdge {
    # key
    name: String

    # value
    node: PropertyValue
  }
  type StatusValue {
    id: ID!
    name: String!
    color: String!
  }
  type TextField {
    content: String!
    link: String
  }
  type TitleValue {
    type: PropertyValueType
    text: TextField!
    annotations: NotionAnnotation
    plain_text: String!
    href: String
  }
  type StatusType implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    status: StatusValue!
  }
  type IdType implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    number: Int!
  }
  type TodoType implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    title: [TitleValue!]
  }
  type PageProperties {
    Status: StatusType!
    Id: IdType!
    Todo: TodoType!
  }
  scalar DateTime
  type Page implements ObjectNode {
    object: Object!
    id: ID!
    created_time: DateTime
    last_edited_time: DateTime
    archived: Boolean
    parent: PageParent
    properties: PageProperties
    content: [Block]
  }
  type PageParent {
    type: Type!
    database_id: ID!
  }
  enum Direction {
    ascending
    descending
  }
  type Query {
    pages(databaseId: ID!, direction: Direction): [Page!]
  }
`;
