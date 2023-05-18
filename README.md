# [![itty-router-help](https://github.com/kwhitley/itty-router-help/assets/865416/92a4b1d6-ee42-4b09-8174-56828a62e57f)](https://itty.dev)

[![Version](https://img.shields.io/npm/v/itty-router-help.svg?style=flat-square)](https://npmjs.com/package/itty-router-help)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/itty-router-help?style=flat-square)](https://bundlephobia.com/result?p=itty-router-help)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kwhitley/itty-router-help/verify.yml?branch=v0.x&style=flat-square)](https://github.com/kwhitley/itty-router-help/actions/workflows/verify.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-router-help/v0.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-router-help?branch=v0.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-router-help?style=flat-square)](https://npmjs.com/package/itty-router-help)
[![Open Issues](https://img.shields.io/github/issues/kwhitley/itty-router-help?style=flat-square)](https://github.com/kwhitley/itty-router-help/issues)

[![Discord](https://img.shields.io/discord/832353585802903572?style=flat-square)](https://discord.com/channels/832353585802903572)
[![GitHub Repo stars](https://img.shields.io/github/stars/kwhitley/itty-router-help?style=social)](https://github.com/kwhitley/itty-router-help)
[![Twitter](https://img.shields.io/twitter/follow/kevinrwhitley.svg?style=social&label=Follow)](https://www.twitter.com/kevinrwhitley)

Experimental library to make browsable, documented REST APIs extremely easy (requires itty-router).  This is currently in pre-alpha, so use with care - the API will certainly be evolving.  While itty-router API code tends to be very simple/readable, I still found myself forgeting endpoints and having to open code to see what was available.  This aims to solve that, by
allowing APIs to be explored in-place, live in your browser.

## Features
- easily add documentation to specific routes or indexes
- auto-documents method, route, params, demo links (on GET routes without params)
- add anything you like into the help notes (format agnostic)

## How to Use
1. create middleware via `createHelp(router)` function
1. use `withHelp` middleware on individual routes
1. use `withHelpIndex` middleware on upstream index route to summarize
1. add `?help` to any documented route or index to see live documentation

## Installation
```
npm install itty-router@next itty-router-help
```

## Example
```js
import { 
  Router,
  withParams,
} from 'itty-router'
import { createHelp } from 'itty-router-help'

// create a new Router
const router = Router()   

// we create two middlewares from the router
const { withHelp, withHelpIndex } = createHelp(router)

router
  // add some global middleware
  .all('*', withParams) 
  
  // embed the help index upstream
  .get('/', withHelpIndex())

  // It can be this easy... this will document the method, route, and each param
  .get('/foo/bar/:baz/:extra?',
    withHelp(),
    () => 'Foo Bar Baz!'
  )

  // This route help will only be accessible directly, not visible in the index.
  .get('/secret/route',
    withHelp({ indexed: false })
    () => ''
  )

  // Add any payload you like... this will be merged with the automatic output.
  .get('/add/anything',
    withHelp({
      'description': 'Adding a description to your help routes is a nice touch.',
      'query_params': {
        'awesome': {
          'description': 'Make things awesome!',
          'required': false,
        }
      }
    })
    ({ query }) => query.awesome ? 'AWESOME!' : 'normal'
  )

  // 404 for everything else
  .all('*', () => error(404))
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
