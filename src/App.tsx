import React from 'react'

import './App.css'
import ivionJson from "./definitions/ivion.json"
import Game from './lib/dto/Game'
import { gameFactory } from './lib/container'
import { IDCodec } from "./lib/encoding/id-codec"


function App() {
  const ids = [5,5,10,10,15,1000,1000]
  const encodedString = IDCodec.encodeToString(ids);
  const decoded = IDCodec.decodeFromString(encodedString);

  let result: string
  try {
    const game: Game = gameFactory.build(ivionJson)
    result =  `${JSON.stringify(game,  null, "  ")}`
  } catch (e) {
    const error: Error = e as Error
    
    result = error.message
  }
  return (
    <>
      <pre>{result}</pre>
      <pre>
        Encoded {ids.join(', ')} = {encodedString}
        <br></br>
        Decoded = {decoded.join(', ')}
      </pre>
    </>
  );
}

export default App;