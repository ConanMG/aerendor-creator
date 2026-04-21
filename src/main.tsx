import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RouteList } from './components/route-list'

const root = createRoot(document.getElementById('root')!)


root.render(
  <BrowserRouter>
    <RouteList/>
  </BrowserRouter>
)
