import * as Context from '@effect/data/Context'
import * as Config from '@effect/io/Config'
import * as Layer from '@effect/io/Layer'
import * as Effect from '@effect/io/Effect'
import { flow } from '@fp-ts/core/function'

export const FrontendEnv = Context.Tag<FrontendEnv>()
export interface FrontendEnv { readonly backendURL: URL }

export const ConfigUrl = flow(
  Config.string,
  Config.mapAttempt((_) => new URL(_)),
)

export const FrontendConfig: Config.Config<FrontendEnv> = Config.struct({
  backendURL: ConfigUrl('NEXT_PUBLIC_BACKEND_URL'),
})

export const FrontendLive = Layer.effect(
  FrontendEnv,
  Effect.config(FrontendConfig),
)