import React from "react"
import ReactDOM, { Root } from "react-dom/client"
import "./index.css"
import JsonRendererApp from "./apps/JsonRendererApp"
import { HashRouter, Routes, Route } from "react-router"
import reportWebVitals from "./reportWebVitals"

const root: Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/json" element={<JsonRendererApp />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()