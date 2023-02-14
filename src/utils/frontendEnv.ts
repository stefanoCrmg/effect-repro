import * as Context from '@effect/data/Context'
import * as Config from '@effect/io/Config'
import * as configProvider from '@effect/io/Config/Provider'
import * as Layer from '@effect/io/Layer'
import { flow } from '@fp-ts/core/function'

export const FrontendEnv = Context.Tag<FrontendEnv>()
export interface FrontendEnv { readonly backendURL: URL }

export const ConfigUrl = flow(
  Config.string,
  Config.mapAttempt((_) => new URL(_)),
)

const FrontendEnvMap = new Map([["NEXT_PUBLIC_BACKEND_URL", process.env.NEXT_PUBLIC_BACKEND_URL!]])
const MapProvider = configProvider.fromMap(FrontendEnvMap)

export const FrontendEnvConfig: Config.Config<FrontendEnv> = Config.struct({
  backendURL: ConfigUrl('NEXT_PUBLIC_BACKEND_URL'),
})

export const FrontendLive = Layer.effect(
  FrontendEnv,
  MapProvider.load(FrontendEnvConfig)
)