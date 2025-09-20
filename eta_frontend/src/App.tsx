import React from 'react'
import Toast from './components/Toast'
import RouterList from './routes'

const App: React.FC = () => {
  return (
    <>
      {/* ============== Routes ============= */}
      
      <RouterList />

      {/* ======= Notification Toast ===========  */}
      <Toast />
    </>
  )
}

export default App