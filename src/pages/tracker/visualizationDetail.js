/* eslint-disable multiline-ternary */
/* eslint-disable array-bracket-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import './tracker.css'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import CardAction from '@components/card-actions'
import { digitsEnToFa } from 'persian-tools'
import { useSelector, useDispatch } from "react-redux"
import { CardBody, CardText, Row, Col, Table, Label, Modal, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import Cookies from 'js-cookie'
import axios from 'axios'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'
import LoadingButton from '../../components/loadinButton/LoadingButton'

const VisualizationDetail = (props) => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)
  
  const [ Address , SetAddress] = useState(false)
  const [ OpenSaveBox , SetOpenSaveBox] = useState(false)
  const [ Loading , SetLoading] = useState(false)

  const saveGraph = () => {
    const GraphData = States.GraphData
    const Scale = States.Scale
    const positionX = States.positionX
    const positionY = States.positionY
    const NodesPosition = States.NodesPosition
    const itemNumbers = States.itemNumbers
    const GraphName = document.getElementById('GraphName').value
    const GraphDescription = document.getElementById('GraphDescription').value

    if (GraphName !== '') {
      if (GraphData.length > 0) {
        SetLoading(true)
        //Error Done
        axios.post(`${serverAddress}/tracing/graph/`, 
        {
          value:{
            GraphName,
            GraphDescription,
            itemNumbers,
            GraphData,
            Scale,
            positionX,
            positionY,
            NodesPosition
          }
        },
        {headers: {Authorization: `Bearer ${Cookies.get('access')}`}})
        .then((response) => {
          SetLoading(false)
          if (response.status >= 200 && response.status < 300) {
            SetOpenSaveBox(false)
            return toast.success('با موفقیت ذخیره شد.', {
              position: 'bottom-left'
            })
          } else {
            return toast.error('ناموفق', {
              position: 'bottom-left'
            })
          }
        })
        .catch((err) => {
          SetLoading(false)
          console.log(err.response.status)
          try {
            if (err.response.status === 403) {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
              return toast.error('دوباره به حساب کاربری وارد شوید.', {
                position: 'bottom-left'
              })
            } else {
              return toast.error('ناموفق', {
                position: 'bottom-left'
              })
            }
          } catch (error) {
            return toast.error('ناموفق', {
              position: 'bottom-left'
            })
          }
        })
      } else {
        return toast.error('گراف رسم نشده است.', {
          position: 'bottom-left'
        })
      }
    } else {
      return toast.error('عنوان گراف نباید خالی باشد.', {
        position: 'bottom-left'
      })
    }

  }

  useEffect(() => {
    if (props.hash !== undefined) {
      SetAddress(props.hash)
    } else { SetAddress(false) }
  }, [,props.hash])
  return (
    <div id="visualizationDetail">
    <Fragment>
      <Row>
        <Col md='12' sm='12'>
          <CardAction title='جزئیات نمایش' actions='collapse' >
          <CardBody className='pt-0'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{display:"inline-block", marginLeft:"20px"}}>آدرس </p>
                  {
                    !Address ? 
                       <span >بدون آدرس</span>
                      :
                      <NiceAddress2 text={Address} number={6}/>
                  }
                </div>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{display:"inline-block", marginLeft:"20px"}}>تعداد آیتم ها</p>
                  {
                    States.itemNumbers === 0 ? 
                    <small> ۰ از {digitsEnToFa(500)}</small>
                    :
                    <small>{digitsEnToFa(States.itemNumbers)} از {digitsEnToFa(500)}</small>
                  }
                </div>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{ marginLeft:"20px"}}>تنظیمات</p>

                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش مقادیر</small>
                    <FormControlLabel control={<Switch defaultChecked
                      onChange={ (event) => {
                        dispatch({type:"showValues", value:(event.target.checked)})
                      }}
                    />} style={{float:"left"}}/>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش زمان</small>
                    <FormControlLabel control={<Switch
                      onChange={ (event) => {
                        dispatch({type:"showTime", value:(event.target.checked)})
                      }}
                    />} style={{float:"left"}}/>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش قیمت دلاری</small>
                    <FormControlLabel control={<Switch
                      onChange={ (event) => {
                        dispatch({type:"showDollar", value:(event.target.checked)})
                      }}
                    />} style={{float:"left"}}/>
                    </div>
                  </div>

                </div>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  {/* <p style={{display:"inline-block"}}>جهت حرکت</p>
                  <div style={{display:"inline-block", float:"left"}}>
                  <svg style={{background:"rgb(240,240,240)", padding:"2px", marginLeft:"20px", borderRadius:"5px", cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-move-right" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M11 12h10" />
                      <path d="M18 9l3 3l-3 3" />
                      <path d="M7 12a2 2 0 1 1 -4 0a2 2 0 0 1 4 0z" />
                    </svg>
                    <svg style={{background:"rgb(240,240,240)", padding:"2px", borderRadius:"5px", cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-move-left" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M13 12h-10" />
                      <path d="M6 15l-3 -3l3 -3" />
                      <path d="M17 12a2 2 0 1 1 4 0a2 2 0 0 1 -4 0z" />
                    </svg>
                  </div> */}

                  <p style={{display:"inline-block"}}>ذخیره گراف</p>
                  <ion-icon onClick={ () => { SetOpenSaveBox(!OpenSaveBox) } } title={'ذخیره'} style={{fontSize:'20px', marginRight:'12px', marginBottom:'-4px', cursor:'pointer'}} name="save-outline"></ion-icon>
                </div>
              </div>
            </div>
          </CardBody>
        </CardAction>
        </Col>
      </Row>
    </Fragment>
    <Modal
      isOpen={OpenSaveBox}
      className='modal-dialog-centered'
      modalClassName={'modal-danger'}
    >
      <ModalBody>
          <h6>ذخیره گراف</h6>
          <Input placeholder='عنوان گراف' id='GraphName'/>
          <Input
            id='GraphDescription'
            type='textarea'
            name='text'
            className='mt-3'
            placeholder='توضیحات'
            style={{ minHeight: '100px' }}
          />
      </ModalBody>
      <ModalFooter>

        <Button onClick={saveGraph} color={'warning'} style={{height:'37px', width:'80px'}}>
          {
            Loading ? 
              <LoadingButton/>
            :
            <span>ذخیره</span>
          }
        </Button>
        <Button onClick={ () => { SetOpenSaveBox(false) } } color={'danger'} style={{height:'37px', width:'80px'}}>
          بازگشت
        </Button>
      </ModalFooter>
    </Modal>
    </div>
    
  )
}

export default VisualizationDetail