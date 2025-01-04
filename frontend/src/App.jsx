import './App.css'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routes'

function App() {
  return (
    <RouterProvider router={appRouter} ></RouterProvider>
  )
}

export default App
