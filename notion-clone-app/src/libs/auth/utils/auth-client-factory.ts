import { ServerContext, ServerRequest } from '@analogjs/router/tokens';

import { EventHandlerRequest, H3Event } from 'h3';

import { AuthServerClient } from '../server/auth-client';

export function createServerClient(
  event: H3Event<EventHandlerRequest>
): AuthServerClient;

export function createServerClient(context: ServerContext): AuthServerClient;

export function createServerClient(
  eventOrContext: ServerContext | H3Event<EventHandlerRequest>
): AuthServerClient {
  if ('node' in eventOrContext) {
    const { req, res } = eventOrContext.node;
    return new AuthServerClient({ req: req as ServerRequest, res });
  }

  const context = eventOrContext;
  return new AuthServerClient(context);
}
