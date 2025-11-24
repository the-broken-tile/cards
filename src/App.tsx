import React, {StrictMode} from "react"
import {HashRouter, Route, Routes} from "react-router"
import CssBaseline from '@mui/material/CssBaseline'

import Index from "./views/pages/Index"
import Game from "./views/pages/Game"
import Deck from "./views/pages/Deck"

export default function App() {
  return <StrictMode>
    <CssBaseline />
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:name" element={<Game />} />
        <Route path="/:name/deck/:encoded" element={<Deck/>} />
      </Routes>
    </HashRouter>
  </StrictMode>
}