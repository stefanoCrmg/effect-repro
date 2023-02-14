import { pipe } from "@fp-ts/core/Function"
import * as Z from '@effect/io/Effect'
import { useEffect, useState } from "react"
import { fetchAndValidate } from '../utils/fetch'
import { FrontendLive } from '../utils/frontendEnv'
import { BackendLive } from '../utils/backendEnv'
import { FrontendEnv } from "@/utils/frontendEnv"
import { Pokemon } from "@/schema/pokemon"
import { BackendEnv } from "@/utils/backendEnv"

export default function Home() {
  const [stuff, setStuff] = useState<string | null>(null)
  
  useEffect(() => {
    pipe(
      Z.serviceWithEffect(FrontendEnv, ({ backendURL }) => fetchAndValidate(Pokemon, `${backendURL}/gengar`)),
      Z.tap(({ name }) => Z.log(`Pokemon was actually fetched on the client: ${name}`)),
      Z.flatMap(({ name }) => Z.sync(() => setStuff(name))),
      Z.provideSomeLayer(FrontendLive),
      Z.catchAllCause(Z.logErrorCause),
      Z.runPromise
    )
  })

  return (
    <>
      <div>Frontend env is available: {process.env.NEXT_PUBLIC_BACKEND_URL}</div>
      <div>Pokemon name: {stuff}</div>
      {/* <div>Backend env is NOT available: {process.env.BACKEND_URL ?? '---'}</div> */}
      </>)
}

export async function getServerSideProps() {
  return pipe(
    Z.serviceWithEffect(BackendEnv, ({ backendURL }) => fetchAndValidate(Pokemon, `${backendURL}/gengar`)),
    Z.tap(({ name }) => Z.log(`Pokemon was actually fetched on the server: ${name}`)),
    Z.map(({ name }) => ({ props: { name }})),
    Z.provideSomeLayer(BackendLive),
    Z.catchAllCause(Z.logErrorCause),
    Z.runPromise
  )
}
