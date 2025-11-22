import React, {StrictMode} from "react"
import {HashRouter, Route, Routes} from "react-router"

import Index from "./views/pages/Index"
import Json from "./views/pages/Json"

export default function App() {
  return <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:name.json" element={<Json />} />
      </Routes>
    </HashRouter>
  </StrictMode>
}