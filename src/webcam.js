import axios from 'axios';
import React, { useState } from 'react'
import { Container, Form, Table } from 'react-bootstrap';
import Webcam from "react-webcam"

function WebcamScreen() {
    const [image, setImage] = useState('')
    const [imghide, setimghide] = useState("hidden")
    const [height, setHeight] = useState()
    const [measurements, setMeasurements] = useState(null)

    const fetchMeasurements = () =>{
        axios.get("http://127.0.0.1:8003/measurements").then((res)=>{
            setMeasurements(res.data.measurements)
            console.log(res.data)
            setimghide("hidden")
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const blob = await fetch(image).then((res) => res.blob());
        const formData = new FormData();

        // await axios.get('http://127.0.0.1:8002/').then((res)=>{
        //     console.log(res.data.message)
        // })

        formData.append('file', blob)

        await axios.post(`http://127.0.0.1:8003/getmeasurements?height=${height}`, formData,{
          headers: {
              'content-type': 'multipart/form-data'
          }
        }).then((res)=>{
            fetchMeasurements()
        })
        

    }

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };


  return (
      <> 
        <Webcam
            audio={false}
            height="500"
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={videoConstraints}
        > 
        {({ getScreenshot }) => (
            <>
            <button
                className='btn btn-info'
                onClick={() => {
                    setTimeout(()=>{
                        const imageSrc = getScreenshot()
                        setImage(imageSrc)
                        setimghide("")
                    },5000);                    
                }}
            >
                Capture photo
            </button>
            
            </>
            )}
        </Webcam>
        <Form id="body-form" >
            <Table align="center">
                <tr>
                    <td>Height:</td>
                    <td>
                        <Form.Control type="number" placeholder='Enter your Height in cms' onChange={(e)=>{
                            setHeight(e.target.value)
                        }}/>
                    </td>
                </tr>
                <tr>
                    <input hidden type="file" name="inputfile" onChange={(e)=>{
                        setImage(e.target.value)
                    }}/>
                </tr>
                <tr>
                    <button
                        className='btn btn-success'
                        onClick={handleSubmit}
                        >
                        Submit photo
                    </button>
                                   
                </tr>
            </Table>
        </Form>
        
        <img 
            src={image} 
            alt="captured pic"
            hidden={imghide}/>
        {
        measurements &&
        <Container style={{boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", marginTop:"50px", padding:"50px"}}>
                <Table>
                    <tr>
                        <th>Body Part</th>
                        <th>Measurement (in cm.)</th>
                    </tr>
                    {Object.keys(measurements).map((key, i) => (
                            <tr>
                                <th>{key.toUpperCase()}</th>
                                <td>{measurements[key]}</td>
                            </tr>
                        ))}    
                </Table>
        </Container>
        }            
      </>
    
  )
}

export default WebcamScreen