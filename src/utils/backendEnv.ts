import * as Context from '@effect/data/Context'
import * as Config from '@effect/io/Config'
import * as Layer from '@effect/io/Layer'
import * as Effect from '@effect/io/Effect'
import { flow } from '@fp-ts/core/function'

export const BackendEnv = Context.Tag<BackendEnv>()
export interface BackendEnv { readonly backendURL: URL }

export const ConfigUrl = flow(
  Config.string,
  Config.mapAttempt((_) => new URL(_)),
)

export const BackendConfig: Config.Config<BackendEnv> = Config.struct({
  backendURL: ConfigUrl('BACKEND_URL'),
})

export const BackendLive = Layer.effect(
  BackendEnv,
  Effect.config(BackendConfig),
)