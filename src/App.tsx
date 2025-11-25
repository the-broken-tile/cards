import React, {JSX, StrictMode} from "react"
import {HashRouter, Route, Routes} from "react-router"
import CssBaseline from '@mui/material/CssBaseline'

import Index from "./views/pages/Index"
import Card from "./views/pages/Card"
import Deck from "./views/pages/Deck"
import Game from "./views/pages/Game"

export default function App(): JSX.Element {
  return <StrictMode>
    <CssBaseline />
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:slug" element={<Game />} />
        <Route path="/:slug/deck/:encoded" element={<Deck/>} />
        <Route path="/:slug/card/:id" element={<Card/>} />
      </Routes>
    </HashRouter>
  </StrictMode>
}