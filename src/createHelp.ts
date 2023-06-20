import deepmerge from 'deepmerge'
import { RouterType } from 'itty-router'

const REF = '$@'

const getRouteParams = (route) =>
    (route.match(/:\w+\??/g) || []).reduce((acc, param) => {
      return (acc[param.slice(1).replace('?', '')] = {
        required: !param.endsWith('?')
      }) && acc
    }, {})

export const withHelp = (payload: any = {}) => {
  function withHelpInternal({ query, method, route = '' }) {
    if (query.help !== undefined) {
      const params = getRouteParams(route)
      const hasParams = Object.keys(params).length

      return {
        ...deepmerge(
          {
            [`${method} ${route}`]: {
              description: payload.description,
              params: Object.keys(params).length ? params : undefined,
              ...payload,
            }
          },
          {
            [`${method} ${route}`]: {
              demo: (payload?.demo === undefined && method === 'GET' && !hasParams)
                  ? route
                  : (payload.demo || undefined),
            }
          },
        )
      }
    }
  }

  withHelpInternal.ref = REF

  return withHelpInternal
}

export const withHelpIndex = (router, payload = {}) =>
  ({ query }) => {
    if (query.help !== undefined) {
      const endpoints = router.routes.reduce((acc, r) => {
        const help = r[2].find(h => h.ref == REF)

        if (help) {
          const payload = help({ query, method: r[0], route: r[3] })

          if (payload?.indexed !== false) {
            Object.assign(acc, payload)
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
