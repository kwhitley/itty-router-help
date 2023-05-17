import { Router } from 'itty-router'
import { describe, expect, it } from 'vitest'
import { createHelp } from './createHelp'

describe('createHelp(router: RouterType)', () => {
  it('returns { withHelp, withHelpIndex }', async () => {
    const router = Router()
    const { withHelp, withHelpIndex } = createHelp(router)

    expect(typeof withHelp).toBe('function')
    expect(typeof withHelpIndex).toBe('function')
  })
})
