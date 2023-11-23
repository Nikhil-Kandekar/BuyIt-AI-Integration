import React, { useState } from 'react'
import { Container, Form, FormLabel, Table } from 'react-bootstrap';
import apiDynamic from './apiDynamic';

function DynamicPricing() {
    const [tier, setTier] = useState("")
    const [id, setId] = useState()

    const handleSubmit = (e) =>{
        e.preventDefault();
        apiDynamic({
            method:"GET",
            url:`gettier?id=${id}`
        }).then((res)=>{
            setTier(res.data.tier)
            console.log(res.data.tier)
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
                        onClick={handleSubmit}
                        >
                        Get Tier
                    </button>                                   
                </tr>
            </Table>
        </Form>
        {
            tier.length>0 &&
            <Container style={{boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", marginTop:"50px", padding:"50px"}}>
                <h4>
                    This user is of {tier} Tier
                </h4>
            </Container>
        }
    </Container>
  )
}

export default DynamicPricing