import React, { useState } from 'react'
import { Container, Form, Table } from 'react-bootstrap'
import apiFake from './apiFake'

function FakeReviews() {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const [verifiedPurchase, setVerifiedPurchase] = useState(0)
    const [review_type, setType] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        apiFake({
            method:"GET",
            url:`postquestion?review=${review}&rating=${rating}&verified_purchase=${verifiedPurchase}`
        }).then((res)=>{
            setType(res.data.review_type)
            console.log(res.data.review_type)
        })
    }

    

  return (
    <Container>
        <Form id="body-form" >
            <Table align="center" className='table-sm'>
                <tr>
                    <td>Enter Review:</td>
                    <td>
                        <Form.Control placeholder='Enter your review' onChange={(e)=>{
                            setReview(e.target.value)
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>Enter Rating:</td>
                    <td>
                        <Form.Control placeholder='Enter Rating' onChange={(e)=>{
                            setRating(e.target.value)
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>Is it verified Purchase? :</td>
                    <td>
                        <Form.Control placeholder='Enter 1 for yes and 0 for no' onChange={(e)=>{
                            setVerifiedPurchase(e.target.value)
                        }}/>
                    </td>
                </tr>
                <tr>
                    <button
                        className='btn btn-success'
                        onClick={handleSubmit}
                        >
                        Check Review
                    </button>                                   
                </tr>
            </Table>
        </Form>
        {   
            review_type.length>0 &&
            <div style={{boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", marginTop:"50px", padding:"50px"}}>
                 <h4>According to our Model this is a {review_type.toUpperCase()} REVIEW</h4>
            </div>
        }
    </Container>
  )
}

export default FakeReviews