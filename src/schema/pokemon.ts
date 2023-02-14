import * as S from '@fp-ts/schema'

export const Pokemon = S.struct({
  name: S.string,
  sprites: S.struct({
    back_default: S.string,
    back_shiny: S.string,
    front_default: S.string,
    front_shiny: S.string,
  }),
})

export type Pokemon = S.Infer<typeof Pokemon>