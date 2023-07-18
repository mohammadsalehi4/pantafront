/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'
// ** Images
import img1 from '../../../public/images/1.jpg'
import img2 from '@src/assets/images/slider/03.jpg'
const CardMain = (props) => {
  return (
    <div id='cardMain' style={{background:"white", width:"100%"}}>
        <CardImg src={img1} style={{height:"33%", borderRadius:"10px"}} />
        <CardBody className='p-3'>
            <h5>{props.data.title}</h5>
            <p>
              {props.data.description}
            </p>
            <Button className='mt-2 mb-3' style={{float:"left"}} outline>ادامه</Button>
        </CardBody>
    </div>

  )
}

export default CardMain
