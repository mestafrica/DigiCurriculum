import React from 'react'
import Navbar from '../Navbar/navbar'
import Footer from '../Footer/footer'

const PageLayout = ({children}) => {
    return (
      
      <>
      <Navbar/>
      <div>{children}</div>
      <Footer/>
      </>
  
    )
  }
  
  export default PageLayout;