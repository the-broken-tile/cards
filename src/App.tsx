import React, { FormEvent, FormEventHandler, useState } from 'react'

import ivionJson from "./definitions/ivion.json"
import Game from './lib/dto/Game'
import { gameFactory } from './lib/container'
import { IDCodec } from "./lib/encoding/id-codec"

const encodingTest = () => {
  const ids = [5,5,10,10,15,1000,1000]
  const encodedString = IDCodec.encodeToString(ids);
  const decoded = IDCodec.decodeFromString(encodedString);

  //<pre>
  // Encoded {ids.join(', ')} = {encodedString}
  // <br></br>
  // Decoded = {decoded.join(', ')}
  // </pre>
  return { ids, encodedString, decoded}
}


const App = () => {
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<string>('')
  // let result: string
  // try {
  //   const game: Game = gameFactory.build(ivionJson)
  //   result =  `${JSON.stringify(game,  null, "  ")}`
  // } catch (e) {
  //   const error: Error = e as Error
  const handleChange: FormEventHandler<HTMLTextAreaElement> = (event: FormEvent<HTMLTextAreaElement>) => {
    setResult((event.target as HTMLTextAreaElement).value)
  }
  return (
    <>
      <textarea className="halfsies" onInput={handleChange}></textarea>
      <pre className="halfsies">{result}</pre>
    </>
  );
}

export default App;