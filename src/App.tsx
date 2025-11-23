import React, {StrictMode} from "react"
import {HashRouter, Route, Routes} from "react-router"

import Index from "./views/pages/Index"
import Json from "./views/pages/Json"
import CardList from "./views/pages/CardList"

export default function App() {
  return <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:name" element={<Json />} />
        <Route path="/:name/deck/:encoded" element={<CardList/>} />
      </Routes>
    </HashRouter>
  </StrictMode>
}