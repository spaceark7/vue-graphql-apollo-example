
import gql from 'graphql-tag'

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
      episode {
        id
        name
        air_date
      }
    }
  }
`;

export { GET_CHARACTER_BY_ID
}