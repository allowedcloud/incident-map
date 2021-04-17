/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIncident = /* GraphQL */ `
  query GetIncident($id: ID!) {
    getIncident(id: $id) {
      id
      title
      description
      date
      state
      lat
      long
      sources
      type
      createdAt
      updatedAt
    }
  }
`;
export const listIncidents = /* GraphQL */ `
  query ListIncidents(
    $filter: ModelIncidentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIncidents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        date
        state
        lat
        long
        sources
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
