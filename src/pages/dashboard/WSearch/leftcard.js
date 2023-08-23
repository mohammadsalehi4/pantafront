/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
import './walletdetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'
import {CornerLeftDown, CornerUpRight, Crop, CreditCard, Circle, Aperture} from 'react-feather'
import CalendarSwitch from '../../../components/dashboard/switch/switch'
import { useEffect, useState } from 'react'
import moment from 'jalali-moment'
import { useSelector, useDispatch } from "react-redux"

const CardTransactions = (props) => {
  const States = useSelector(state => state)

  const [FirstActivity, SetFirstActivity] = useState(0)
  const [LastActivity, SetLastActivity] = useState(0)
  
  const [FirstTime, SetFirstTime] = useState(0)
  const [LastTime, SetLastTime] = useState(0)

  //find first and last activity
  useEffect(()=>{
    if (props.transactions.length > 0) {
      let first = props.transactions[0].Date
      let last = props.transactions[0].Date
      for (let i = 0; i < props.transactions.length; i++) {
        if (props.transactions[i].Date < first) {
          first = props.transactions[i].Date
        }
  
        if (props.transactions[i].Date > last) {
          last = props.transactions[i].Date
        }
      }
      SetFirstActivity(first)
      SetLastActivity(last)
    }
  }, [, props.transactions])

  const getMyTime = (index) => {
    const date = new Date(index * 1000)
    let month
    let day
    let hour
    let minute

    if (String(Number(date.getMonth())).length === 1) {
      month = `0${date.getMonth() }`
    } else {
      month = date.getMonth() 
    }

    if (String(date.getDate()).length === 1) {
      day = `0${date.getDate()}`
    } else {
      day = date.getDate()
    }

    if (String(date.getHours()).length === 1) {
      hour = `0${date.getHours()}`
    } else {
      hour = date.getHours()
    }

    if (String(date.getMinutes()).length === 1) {
      minute = `0${date.getMinutes()}`
    } else {
      minute = date.getMinutes()
    }

    return ({
      year:date.getFullYear(),
      month,
      day,
      hour,
      minute
    })
  }

  //tabdil zaman be taarikh
  useEffect(() => {
    const first = `${getMyTime(FirstActivity).year}/${Number(getMyTime(FirstActivity).month) + 1}/${getMyTime(FirstActivity).day}`
    const last = `${getMyTime(LastActivity).year}/${Number(getMyTime(LastActivity).month) + 1}/${getMyTime(LastActivity).day}`
    if (States.jalaliCalendar) {
      SetFirstTime(moment(first, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
      SetLastTime(moment(last, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
    } else {
      SetFirstTime(first)
      SetLastTime(last)
      console.log(FirstTime)
      console.log(LastTime)
    }
  }, [FirstActivity, LastActivity, States.jalaliCalendar])

  const renderTransactions = () => {
    return (
      <div className=''>
        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'ارسال شده'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.OutCome)}
                <small> {props.data.symbole}</small>
                <CornerUpRight size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
          <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'دریافت شده'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.InCome)}
                <small> {props.data.symbole}</small>
                <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'مجموع'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.Total)}
                <small> {props.data.symbole}</small>
                <Crop size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px", transform:"rotate(90deg)"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'تعداد تراکنش'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.transactions.length)}
                <CreditCard size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'اولین فعالیت'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(FirstTime)}
                <Circle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'آخرین فعالیت'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(LastTime)}
                <Aperture size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>
      </div>

    )
  }

  return (
    <Card className='card-transaction  m-0' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", height:"100%"}}>
      <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
        <CardTitle tag='h4'>
          جزئیات
        </CardTitle>
        <CalendarSwitch options={['میلادی', 'شمسی']} color={props.data.color}/>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
