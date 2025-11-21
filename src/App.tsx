import React from 'react'

import game from "./definitions/ivion.json"
import Game from './lib/dto/Game'
import { gameFactory } from './lib/container'
import { IDCodec } from "./lib/encoding/id-codec"

const encodingTest = () => {
  const ids: number[] = [5, 5, 10, 10, 15, 1000, 1000]
  const encodedString: string = IDCodec.encodeToString(ids);
  const decoded: number[] = IDCodec.decodeFromString(encodedString);

  //<pre>
  // Encoded {ids.join(', ')} = {encodedString}
  // <br></br>
  // Decoded = {decoded.join(', ')}
  // </pre>
  return { ids, encodedString, decoded }
}

const App = () => {
  const parseInput = (i: Record<string, any>): string => {
    let result: string
    try {
      const game: Game = gameFactory.build(i)
      result =  `${JSON.stringify(game,  null, "  ")}`
    } catch (e) {
      const error: Error = e as Error
      result = error.message
    }

    return result
  }


  return (
    <div className="app">
      <pre className="halfsies">{parseInput(game)}</pre>
    </div>
  );
}

export default App;