import React, { useState } from 'react'
import { Col, Container, Form, FormLabel, Row, Table } from 'react-bootstrap'
import apiRecommend from './apiRecommend'

function Recommend() {
    const [id, setId] = useState()
    const [item, setItem] = useState()
    const [itembased, setItembased] = useState()
    const [userbased, setUserbased] = useState()

    const handleSubmitUser= (e) =>{
        e.preventDefault();
        apiRecommend({
            method:"GET",
            url:`recommend?id=${id}`
        }).then((res)=>{
            setUserbased(res.data.list)
            console.log(res.data.list)
        })
    }

    const handleSubmitItem= (e) =>{
        e.preventDefault();
        apiRecommend({
            method:"GET",
            url:`recommenditem?id=${item}`
        }).then((res)=>{
            setItembased(res.data.list)
            console.log(res.data.list)
        })
    }

  return (
    <Container>
        <Form id="body-form" >
            <Table align="center" className='table-sm'>
                <tr>
                    <td className='row'>
                        <FormLabel style={{paddingTop:"10px"}}><b>User ID: </b></FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Form.Control style={{width:"1000px"}} placeholder='Enter ID' onChange={(e)=>{
                            setId(e.target.value)
                        }}/>
                    </td>
                </tr>                
                <tr>
                    <button
                        className='btn btn-success'
                        onClick={handleSubmitUser}
                        >
                        Get User Based Recommendation
                    </button>                                   
                </tr>
                <tr>
                    <td className='row'>
                        <FormLabel style={{paddingTop:"10px"}}><b>Item Code: </b></FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Form.Control style={{width:"1000px"}} placeholder='Enter Item Code' onChange={(e)=>{
                            setItem(e.target.value)
                        }}/>
                    </td>
                </tr>                
                <tr>
                    <button
                        className='btn btn-success'
                        onClick={handleSubmitItem}
                        >
                        Get Product Based Recommendation
                    </button>                                   
                </tr>
            </Table>
        </Form>
        {
            (userbased || itembased) &&
            <>
                <Row>
                    <Col>
                    <Container style={{boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", marginTop:"50px", padding:"50px"}}>
                    <h4>User based Recommendation</h4>
                        <Table>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                            {
                                Object.keys(userbased.Description).map((key, i) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{userbased.Description[key]}</td>
                                        <td>{userbased.UnitPrice[key]}</td>
                                    </tr>
                                ))
                            }                           

                        </Table>
                    </Container>                        
                    </Col>
                    
                    <Col>
                    <Container style={{boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", marginTop:"50px", padding:"50px"}}>
                    <h4>Product based Recommendation</h4>
                        <Table>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                            {
                                Object.keys(itembased.Description).map((key, i) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{itembased.Description[key]}</td>
                                        <td>{itembased.UnitPrice[key]}</td>
                                    </tr>
                                ))
                            }                           

                        </Table>
                    </Container>
                    </Col>
                </Row>
            </>
        }
    </Container>
  )
}

export default Recommend