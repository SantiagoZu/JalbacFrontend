import React from 'react'
import Footer from '../components/Footer'

function Main({ children }) {
  return (
    <>
    <main className="h-full overflow-y-auto">
      <div className="container grid px-6 mx-auto">{children}</div>
    </main>
    <Footer/>
    </>
    
  )
}

export default Main
