import deepmerge from 'deepmerge'

const REF = '$@'

export const createHelp = (router) => {
  const getRouteParams = (route) =>
    (route.match(/:\w+\??/g) || []).reduce((acc, param) => {
      return (acc[param.slice(1).replace('?', '')] = {
        required: !param.endsWith('?')
      }) && acc
    }, {})

  const withHelp = (payload: any = {}) => {
    function withHelpInternal({ query, method, route = '' }) {
      if (query.help !== undefined) {
        const params = getRouteParams(route)
        const hasParams = Object.keys(params).length

        return {
          ...deepmerge(
            { ...payload },
            {
              demo: (payload?.demo === undefined && method === 'GET' && !hasParams)
                    ? route
                    : (payload.demo || undefined),
              params: Object.keys(params).length ? params : undefined,
            }
          )
        }
      }
    }

    withHelpInternal.ref = REF

    return withHelpInternal
  }

  const withHelpIndex = (payload = {}) =>
    ({ query }) => {
      if (query.help !== undefined) {
        const endpoints = router.routes.reduce((acc, r) => {
          const help = r[2].find(h => h.ref == REF)

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
