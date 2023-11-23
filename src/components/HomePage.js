import React from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Container>
      <h3 style={{textAlign:"center", paddingTop:"10px"}}>Features</h3>
      <Row>
      <Card border="info" style={{ width: '13rem', margin:"5px" }}>
        <Card.Body>
          <Card.Title>Cloth size Estimation</Card.Title>
          <Card.Text>
            <p>Do you want too buy clothes but don't know what size to choose?
            </p>
          </Card.Text>
          
          
        </Card.Body>
        <Card.Footer><Link to="/webcam"><Button variant="outline-info">Click here!</Button>{' '}</Link></Card.Footer>
      </Card>
      <Card border="info" style={{ width: '13rem', margin:"5px" }}>
        <Card.Body>
          <Card.Title>Chatbot</Card.Title>
          <Card.Text>
            <p>Trouble using our website?
              We're just one text away from helping you out!
            </p>
          </Card.Text>
          
        </Card.Body>
        <Card.Footer><Link to="/chatbot"><Button variant="outline-info">Chat here!</Button>{' '}</Link></Card.Footer>
      </Card>
      <Card border="info" style={{ width: '13rem', margin:"5px" }}>
        <Card.Body>
          <Card.Title>Fake Reviews</Card.Title>
          <Card.Text>
            <p>Tired of checking 100s of reviews just to buy one product?
              We'll help yu detect fake ones!
            </p>
          </Card.Text>
          
        </Card.Body>
        <Card.Footer><Link to="/fakereviews"><Button variant="outline-info">Check here!</Button>{' '}</Link></Card.Footer>
      </Card>
      <Card border="info" style={{ width: '13rem', margin:"5px" }}>
        <Card.Body>
          <Card.Title>Dynamic Pricing</Card.Title>
          <Card.Text>
            <p>I know you've been loyal to us!
              We have got some discounts for you!!!</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer><Link to="/dynamic"><Button variant="outline-info">Check here!</Button>{' '}</Link></Card.Footer>
      </Card>
      <Card border="info" style={{ width: '13rem', margin:"5px" }}>
        <Card.Body>
          <Card.Title>Product Recommendation</Card.Title>
          <Card.Text>
            <p>Can't find the right product for yourself?
              We'll help you with our Personalized Recommendations!
            </p>
          </Card.Text>
          
        </Card.Body>
        <Card.Footer><Link to="/recommend"><Button variant="outline-info">Check here!</Button>{' '}</Link></Card.Footer>
      </Card>
      
      </Row>
    </Container>
  )
}

export default HomePage