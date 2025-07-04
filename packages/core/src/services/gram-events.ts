import type { Api } from 'telegram'

import type { CoreContext } from '../context'

import { NewMessage } from 'telegram/events'

export interface GramEventsEventToCore {}

export interface GramEventsEventFromCore {
  'gram:message:received': (data: { message: Api.Message }) => void
}

export type GramEventsEvent = GramEventsEventFromCore & GramEventsEventToCore
export type GramEventsService = ReturnType<typeof createGramEventsService>

export function createGramEventsService(ctx: CoreContext) {
  const { emitter, getClient } = ctx

  function registerGramEvents() {
    getClient().addEventHandler((event) => {
      if (event.message) {
        emitter.emit('gram:message:received', { message: event.message })
      }
    }, new NewMessage({}))
  }

  return {
    registerGramEvents,
  }
}
