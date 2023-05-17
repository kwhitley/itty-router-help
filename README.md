# [![Itty Router](https://user-images.githubusercontent.com/865416/146679767-16be95b4-5dd7-4bcf-aed7-b8aa8c828f48.png)](https://itty-router.dev)

[![Version](https://img.shields.io/npm/v/itty-router.svg?style=flat-square)](https://npmjs.com/package/itty-router)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/itty-router?style=flat-square)](https://bundlephobia.com/result?p=itty-router)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kwhitley/itty-router/verify.yml?branch=v4.x&style=flat-square)](https://github.com/kwhitley/itty-router/actions/workflows/verify.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-router/v4.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-router?branch=v4.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-router?style=flat-square)](https://npmjs.com/package/itty-router)
[![Open Issues](https://img.shields.io/github/issues/kwhitley/itty-router?style=flat-square)](https://github.com/kwhitley/itty-router/issues)

[![Discord](https://img.shields.io/discord/832353585802903572?style=flat-square)](https://discord.com/channels/832353585802903572)
[![GitHub Repo stars](https://img.shields.io/github/stars/kwhitley/itty-router?style=social)](https://github.com/kwhitley/itty-router)
[![Twitter](https://img.shields.io/twitter/follow/kevinrwhitley.svg?style=social&label=Follow)](https://www.twitter.com/kevinrwhitley)

Itty aims to be the world's smallest (430 bytes), feature-rich JavaScript router, enabling low-calorie code with a low-calorie bundlesize.  Designed originally for Cloudflare Workers, itty can be used in browsers, Service Workers, edge functions, or standalone runtimes like Node!

## Features:
- [route params](https://itty.dev/itty-router/route-patterns#params) (including [optional params](https://itty.dev/itty-router/route-patterns#optional))
- [wildcards](https://itty.dev/itty-router/route-patterns#wildcards) and [greedy params](https://itty.dev/itty-router/route-patterns#greedy)
- [query parsing](https://itty.dev/itty-router/route-patterns#query)
- [middleware](https://itty.dev/itty-router/middleware)
- [router nesting](https://itty.dev/itty-router/nesting)
- any real/fake HTTP method
- lightweight, easy-to-understand route code
- works in *any* runtime/environment (including the browser)
- fully typed/TS

## [Full Documentation](https://itty.dev/itty-router)
Complete docs/API available on [itty.dev](https://itty.dev/itty-router), or join our [Discord](https://discord.com/channels/832353585802903572) channel to chat.

## Installation
```
npm install itty-router@next
```

## Example
```js
import { 
  error,                  // create an error response
  respondWithError,       // downstream handler for thrown errors
  respondWithJSON,        // downstream handler to send data as JSON
  Router,                 // the ~470 byte router itself
  withParams,             // middleware to auto-embed route params
  notFound,               // create a 404
} from 'itty-router'

const router = Router()   // create a new Router
const todos = []          // and some fake todos

router
  // add some global middleware
  // withParams auto-parses route params into the request
  .all('*', withParams) 

  // GET list of todos
  .get('/todos', () => todos)

  // GET single todo, by ID
  .get('/todos/:id', 
    ({ id }) => todos.find(todo => todo.id === id) 
                || notFound('That todo was not found')
  )

  // 404 for everything else
  .all('*', notFound)

// Example: Cloudflare ESM Worker syntax
export default {
  fetch: (request, env, context) => router
                                      .handle(request, env, context)
                                      .then(respondWithJSON)    // automatically send as JSON
                                      .catch(respondWithError)  // and send error Responses for thrown errors
}
```

## Join the Discussion!
Have a question? Suggestion? Complaint? Want to send me a gift basket?

Join us on [Discord](https://discord.com/channels/832353585802903572)!

## Testing and Contributing
1. Fork repo
1. Install dev dependencies via `yarn`
1. Start test runner/dev mode `yarn dev`
1. Add your code and tests if needed - do NOT remove/alter existing tests
1. Verify that tests pass once minified `yarn verify`
1. Commit files
1. Submit PR with a detailed description of what you're doing
1. I'll add you to the credits! :)

## Special Thanks
This repo goes out to my past and present colleagues at Arundo - who have brought me such inspiration, fun,
and drive over the last couple years.  In particular, the absurd brevity of this code is thanks to a
clever [abuse] of `Proxy`, courtesy of the brilliant [@mvasigh](https://github.com/mvasigh).
This trick allows methods (e.g. "get", "post") to by defined dynamically by the router as they are requested,
**drastically** reducing boilerplate.

## Contributors
These folks are the real heroes, making open source the powerhouse that it is!  Help out and get your name added to this list! <3

#### Core Concepts
- [@mvasigh](https://github.com/mvasigh) - proxy hack wizard behind itty, coding partner in crime, maker of the entire doc site, etc, etc.
- [@hunterloftis](https://github.com/hunterloftis) - router.handle() method now accepts extra arguments and passed them to route functions
- [@SupremeTechnopriest](https://github.com/SupremeTechnopriest) - improved TypeScript support and documentation! :D
#### Code Golfing
- [@taralx](https://github.com/taralx) - router internal code-golfing refactor for performance and character savings
- [@DrLoopFall](https://github.com/DrLoopFall) - v4.x re-minification
#### Fixes & Build
- [@taralx](https://github.com/taralx) - QOL fixes for contributing (dev dep fix and test file consistency) <3
- [@technoyes](https://github.com/technoyes) - three kind-of-a-big-deal errors fixed.  Imagine the look on my face... thanks man!! :)
- [@roojay520](https://github.com/roojay520) - TS interface fixes
- [@jahands](https://github.com/jahands) - v4.x TS fixes
#### Documentation
- [@arunsathiya](https://github.com/arunsathiya),
  [@poacher2k](https://github.com/poacher2k),
  [@ddarkr](https://github.com/ddarkr),
  [@kclauson](https://github.com/kclauson),
  [@jcapogna](https://github.com/jcapogna)
