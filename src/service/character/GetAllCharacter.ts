import gql from 'graphql-tag'

const GET_ALL_CHARACTERS = gql`
  query Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        name
        image
        id
        gender
        status
        type
        species
        origin {
          name
          type
        }
      }
      info {
        count
        pages
        next
      }
    }
  }
`

export { GET_ALL_CHARACTERS }
