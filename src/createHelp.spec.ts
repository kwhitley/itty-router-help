import { Router, json } from 'itty-router'
import { describe, expect, it } from 'vitest'
import { withHelp, withHelpIndex } from './createHelp'

describe('EXPORTS', () => {
  it('withHelp', async () => {
    expect(typeof withHelp).toBe('function')
  })
  it('withHelpIndex', async () => {
    expect(typeof withHelpIndex).toBe('function')
  })
})

describe('withHelpIndex(router: RouterType, payload?: object)', () => {
  it('can deliver a help index using withHelpIndex(payload = {})', async () => {
    const router = Router()
    const description = 'Foo bar baz'

    router
      .get('/', withHelpIndex(router))
      .get('/foo/:bar', withHelp({
        description,
      }))

    const response = await router.handle({ method: 'GET', url: 'https://a.b.c/?help' })

    expect(response).toEqual({
      endpoints: {
        'GET /foo/:bar': {
          description,
          params: {
            bar: {
              required: true
            }
          }
        }
      }
    })
  })
})

describe('withHelp(payload: object)', () => {
  it('can be triggered on an individual route using withHelp(payload = {})', async () => {
    const router = Router()
    const description = 'Foo bar baz'

    router
      .get('/foo', withHelp({
        description,
      }))

    const response = await router.handle({ method: 'GET', url: 'https://a.b.c/foo?help' })

    expect(response).toEqual({
      'GET /foo': {
        description,
        demo: '/foo',
      }
    })
  })

  it('withHelp will autoparse params and add if they are required or not.', async () => {
    const router = Router()
    const description = 'Foo bar baz'

    router
      .get('/foo/:bar', withHelp({
        description,
      }))

    const response = await router.handle({ method: 'GET', url: 'https://a.b.c/foo/13?help' })

    expect(response).toEqual({
      'GET /foo/:bar': {
        description,
        params: {
          bar: {
            required: true
          }
        }
      }
    })
  })

  it('withHelp() will use defined demo, if available', async () => {
    const router = Router()
    const demo = 'whatever'

    router
      .get('/foo', withHelp({ demo }))

    const response = await router.handle({ method: 'GET', url: 'https://a.b.c/foo?help' })

    expect(response).toEqual({
      'GET /foo': {
        demo
      }
    })
  })

  it('withHelp() will omit demo, if set to false', async () => {
    const router = Router()

    router
      .get('/foo', withHelp({ demo: false }))

    const response = await router.handle({ method: 'GET', url: 'https://a.b.c/foo?help' })

    expect(response).toEqual({
      'GET /foo': {}
    })
  })
})
