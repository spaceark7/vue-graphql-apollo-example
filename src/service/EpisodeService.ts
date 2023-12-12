import gql from 'graphql-tag'

const GET_ALL_EPISODE = gql`
  query Episodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        next
        pages
      }
      results {
        name
        id
        episode
        created
        characters {
          name
          id
        }
        air_date
      }
    }
  }
`

export default GET_ALL_EPISODE
