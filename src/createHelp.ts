import deepmerge from 'deepmerge'

export const createHelp = (router) => {
  const getRouteParams = (route) =>
    (route.match(/:\w+\??/g) || []).reduce((acc, param) => {
      return (acc[param.slice(1).replace('?', '')] = {
        required: !param.endsWith('?')
      }) && acc
    }, {})

  const withHelp = (payload = {}) => {
    function withHelpInternal({ query, method, route = '' }) {
      if (query.help !== undefined) {
        const params = getRouteParams(route)
        return {
          ...deepmerge(
            { ...payload },
            {
              params: Object.keys(params).length ? params : undefined,
            }
          )
        }
      }
    }

    return withHelpInternal
  }

  const withHelpIndex = (payload = {}) =>
    ({ query }) => {
      if (query.help !== undefined) {
        const endpoints = router.routes.reduce((acc, r) => {
          const help = r[2].find(h => h.name === 'withHelpInternal')

          if (help) {
            const payload = help({ query, method: r[0], route: r[3] })

            if (payload?.indexed !== false) {
              acc[`${r[0]} ${r[3]}`] = payload
            }
          }

          return acc
        }, {})

        return {
          ...payload,
          endpoints
        }
      }
    }

  return {
    withHelp,
    withHelpIndex,
  }
}
