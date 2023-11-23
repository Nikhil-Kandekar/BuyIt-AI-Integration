import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Header = () => {
  
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <Navbar.Brand>
              <a href="http://localhost:3000/" style={{color:"white",textDecoration:"none"}}>
                <img src="logo.png" alt='BUY IT'/>  
              </a>  
            </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Link to="/webcam" style={{color:"white",textDecoration:"none"}}>Cloth size Estimation</Link>                
            </Nav>
            <Nav className='ml-auto'>
              <Link to="/chatbot" style={{color:"white",textDecoration:"none"}}>Chatbot</Link>                
            </Nav>
            <Nav className='ml-auto'>
              <Link to="/fakereviews" style={{color:"white",textDecoration:"none"}}>Fake Reviews</Link>                
            </Nav>
            <Nav className='ml-auto'>
              <Link to="/dynamic" style={{color:"white",textDecoration:"none"}}>Dynamic Pricing</Link>                
            </Nav>
            <Nav className='ml-auto'>
              <Link to="/recommend" style={{color:"white",textDecoration:"none"}}>Product Recommendation</Link>                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header