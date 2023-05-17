export type GenericTraps = {
  [key: string]: any
}

export type RequestLike = {
  method: string,
  url: string,
} & GenericTraps

export type IRequest = {
  method: string,
  url: string,
  params: {
    [key: string]: string,
  },
  query: {
    [key: string]: string | string[] | undefined,
  },
  proxy?: any,
} & GenericTraps

export interface RouterOptions {
  base?: string
  routes?: RouteEntry[]
}

export interface RouteHandler {
  (request: IRequest, ...args: any): any
}

export type RouteEntry = [string, RegExp, RouteHandler[], string]

export type Route = <T extends RouterType>(
  path: string,
  ...handlers: RouteHandler[]
) => T

export type RouterHints = {
  all: Route,
  delete: Route,
  get: Route,
  options: Route,
  patch: Route,
  post: Route,
  put: Route,
}

export type RouterType = {
  __proto__: RouterType,
  routes: RouteEntry[],
  handle: (request: RequestLike, ...extra: any) => Promise<any>
} & RouterHints

export const Router = ({ base = '', routes = [] }: RouterOptions = {}): RouterType =>
  // @ts-expect-error TypeScript doesn't know that Proxy makes this work
  ({
    __proto__: new Proxy({} as RouterType, {
      // @ts-expect-error (we're adding an expected prop "path" to the get)
      get: (target: any, prop: string, receiver: object, path: string) => (route: string, ...handlers: RouteHandler[]) =>
        routes.push(
          [
            prop.toUpperCase(),
            RegExp(`^${(path = (base + '/' + route).replace(/\/+(\/|$)/g, '$1'))
              .replace(/(\/?\.?):(\w+)\+/g, '($1(?<$2>*))')      // greedy params
              .replace(/(\/?\.?):(\w+)/g, '($1(?<$2>[^$1/]+?))') // named params and image format
              .replace(/\./g, '\\.')                             // dot in path
              .replace(/(\/?)\*/g, '($1.*)?')                    // wildcard
            }/*$`),
            handlers,
            path,
          ]
        ) && receiver
    }),
    routes,
    async handle (request: RequestLike, ...args)  {
      let response, match, url = new URL(request.url), query: any = request.query = {}
      for (let [k, v] of url.searchParams) {
        query[k] = query[k] === undefined ? v : [query[k], v].flat()
      }
      for (let [method, regex, handlers, path] of routes) {
        if ((method === request.method || method === 'ALL') && (match = url.pathname.match(regex))) {
          request.params = match.groups || {}
          request.route = path
          for (let handler of handlers) {
            if ((response = await handler(request.proxy || request, ...args)) !== undefined) return response
          }
        }
      }
    }
  })

// type CustomMethods = {
//   foo?: Route,
//   bar?: Route,
// }

// // const router = Router() as RouterType & CustomMethods

// // router.foo()


// type RequestWithAuthors = {
//   authors?: string[]
// } & IRequest

// // middleware: adds authors to the request
// const addAuthors = (request) => {
//   request.authors = ['foo', 'bar']
// }


// const router = Router()

// type BooksResponse = {
//   books: string[]
// }

// // FAILING EXAMPLE
// router.get('books', (request): BooksResponse => {
//   request.foo = 'asd'

//   return false // fails to return a Response with books
// })

// // PASSING EXAMPLE
// router.get('books', (request): BooksResponse => {
//   request.foo = 'asd'

//   return {
//     books: ['foo', 'bar'] // passes!
//   }
// })

// const router = Router()
// router.routes.push(['GET', /gsadfa/, []])

// type MyTraps = {
//   foo?: Route;
// }

// const router = Router() as RouterType & MyTraps;


/*

{
  name: string,
  age: number,
  handler: (name: string) => any,

  ?? => Route
  ?? => Route
  ?? => Route
}


*/
