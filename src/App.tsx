import React from 'react';

import './App.css'
import Card from './lib/dto/Card'
import { cardFactory } from './lib/container'
import { IDCodec } from "./lib/encoding/id-codec"


function App() {
  const ids = [5,5,10,10,15,1000,1000]
  const encodedString = IDCodec.encodeToString(ids);
  const decoded = IDCodec.decodeFromString(encodedString);

  let result: string
  try {
    const card: Card = cardFactory.build(
    {
      id: 1,
      name: "Fateful strike",
      attributes: [
        {
          name: "type",
          type: "string",
          value: "attack",
        },
        {
          name: "tags",
          type: "string[]",
          value: ["good"]
        },
        {
          name: "damage",
          type: "number",
          value: 5,
        },
        {
          name: "health",
          type: "number[]",
          value: [1, 2, 3],
        },
        {
          name: "ultimate",
          type: "boolean",
          value: false,
        },
      ]
    })
    result =  String(JSON.stringify(card))
  } catch (e) {
    const error: Error = e as Error
    
    result = error.message
  }
  return (
    <div className="App">
      <header className="App-header">
        {result}
        <div>
        encoded {ids.join(', ')} = {encodedString}
        <br />
        Decoded = {decoded.join(', ')}
      </div>
      </header>
    </div>
  );
}

export default App;