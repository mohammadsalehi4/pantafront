/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import './style.css'
import AmountLimit from '../../../../components/dashboard/amountLimit'
import TimeLimit from '../../../../components/dashboard/timeLimit'
import DataTable from 'react-data-table-component'
import NiceAddress from '../../../../components/niceAddress/niceAddress'
import { ChevronDown, Download } from 'react-feather'
import { digitsEnToFa } from 'persian-tools'
import moment from 'jalali-moment'

import {
  Card,
  Input,
  CardTitle,
  CardHeader
} from 'reactstrap'

import { MainSiteGray } from '../../../../../public/colors'
import { useSelector } from "react-redux"
// ** Bootstrap Checkbox Component

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const DataTableWithButtons = (props) => {
  const States = useSelector(state => state)
  const [numberOfShow, SetNumberofShow] = useState(0)
  const [showData, SetShowData] = useState([])
  const [NoNumberData, SetNoNumberData] = useState([])
  const [DownloadData, SetDownloadData] = useState([])

  const getMyTime=(index) => {
    
    const date = new Date(index*1000)
    let month
    let day
    let hour
    let minute

    if (String(Number(date.getMonth())+1).length === 1) {
      month = `0${date.getMonth() + 1}`
    } else {
      month = date.getMonth() + 1
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

  const columns = [
    {
      name: 'تاریخ',
      sortable: true,
      maxWidth: '160px',
      minWidth: '160px',
      selector: row => row.Date,
      cell:row => {
        return (
          <div>
            {
              States.jalaliCalendar ? 
                <p style={{marginTop:"20px"}}>{digitsEnToFa(getMyTime(row.Date).hour+':'+getMyTime(row.Date).minute+' - '+moment(getMyTime(row.Date).year+'-'+getMyTime(row.Date).month+'-'+getMyTime(row.Date).day, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))}</p>
              :
                <p style={{marginTop:"20px"}}>{digitsEnToFa(getMyTime(row.Date).hour+':'+getMyTime(row.Date).minute+' - '+getMyTime(row.Date).year+'/'+getMyTime(row.Date).month+'/'+getMyTime(row.Date).day)}</p>
            }
          </div>
        )
      }
    },
    {
      name: 'شناسه تراکنش',
      minWidth: '270px',
      selector: row => (
        <div className='d-flex align-items-end '>
          <div className='user-info text-truncate'>
            <span className='d-block text-truncate ms-0' style={{marginBottom:"-10px"}}>
              <NiceAddress  text={row.address} number={8}/>
            </span>
          </div>
        </div>
      )
    },
    {
      name: '',
      minWidth: '30px',
      selector: row =>  (
        
          row.mode ? <div className='d-flex align-items-end '>
            <ion-icon name="arrow-forward-outline" className="mb-1" id="inkouft"></ion-icon>
          </div> : <div className='d-flex align-items-end '>
            <ion-icon name="arrow-back-outline" className="mb-1" id="outkouft"></ion-icon>
          </div>
      )
    },
    {
      name: `حجم تراکنش (${props.data.symbole})`,
      sortable: true,
      minWidth: '120px',
      selector: row => (
        digitsEnToFa(String(parseFloat(Number(row.BTCAmount).toFixed(5)).toString()))
        
      )
    },
    {
      name: `کارمزد (${props.data.symbole}) `,
      sortable: true,
      minWidth: '130px',
      maxWidth: '130px',
      selector: row => digitsEnToFa(row.Fee)
    }
  ]

  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(DownloadData[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  useEffect(() => {
    const myData=[]
    if (NoNumberData.length > 0) {
      for (let i = 0; i < NoNumberData.length; i++) {
        if (NoNumberData[i].mode) {
          myData.push({
            Address:NoNumberData[i].address,
            Mode:'in',
            Amount:NoNumberData[i].BTCAmount,
            Time:(getMyTime(NoNumberData[i].Date).year+'/'+getMyTime(NoNumberData[i].Date).month+'/'+getMyTime(NoNumberData[i].Date).day)+' '+getMyTime(NoNumberData[i].Date).hour+':'+getMyTime(NoNumberData[i].Date).minute,
            Fee:NoNumberData[i].Fee
          })
        } else {
          myData.push({
            Address:NoNumberData[i].address,
            Mode:'out',
            Amount:NoNumberData[i].BTCAmount,
            Time:(getMyTime(NoNumberData[i].Date).year+'/'+getMyTime(NoNumberData[i].Date).month+'/'+getMyTime(NoNumberData[i].Date).day)+' '+getMyTime(NoNumberData[i].Date).hour+':'+getMyTime(NoNumberData[i].Date).minute,
            Fee:NoNumberData[i].Fee
          })
        }

      }
      SetDownloadData(myData)
    } else {
      SetDownloadData('empty')
    }
  }, [NoNumberData])

  let filteredData = []
  useEffect(() => {
    const a = 5 * (numberOfShow + 1)

    let filteredData2=[]
    for (let i = 0; i < props.transactions.length; i++) {
      if (States.startAmount > 0) {
        if (props.transactions[i].BTCAmount > States.startAmount) {
          filteredData2.push(props.transactions[i])
        }
      } else {
        filteredData2.push(props.transactions[i])
      }
    }

    let filteredData3=[]
    for (let i = 0; i < filteredData2.length; i++) {
      if (States.endAmount > 0) {
        if (filteredData2[i].BTCAmount < States.endAmount) {
          filteredData3.push(filteredData2[i])
        }
      } else {
        filteredData3.push(filteredData2[i])
      }
    }

    let filteredData4=[]
    for (let i = 0; i < filteredData3.length; i++) {
      if (States.starttime !== 0) {
        if ((filteredData3[i].Date)*1000 > States.starttime) {
          filteredData4.push(filteredData3[i])
        }
      } else {
        filteredData4.push(filteredData3[i])
      }
    }

    let filteredData5=[]
    for (let i = 0; i < filteredData4.length; i++) {
      if (States.endtime !== 0) {
        if ((filteredData4[i].Date)*1000 < States.endtime) {
          filteredData5.push(filteredData4[i])
        }
      } else {
        filteredData5.push(filteredData4[i])
      }
    }

    SetNoNumberData(filteredData5)

    filteredData = []
    for (let i = 0; i < a; i++) {
      if (filteredData5[i]) {
        filteredData.push(filteredData5[i])
        if (filteredData.length === filteredData5.length) {
          document.getElementById('PaginationButton').style.color = MainSiteGray
        } else {
          document.getElementById('PaginationButton').style.color = "rgb(100,100,100)"
        }
      }
    }

    SetShowData(filteredData)
  }, [, numberOfShow, props.transactions, States.startAmount, States.endAmount, States.starttime, States.endtime])

  return (
    <Fragment>
      <Card  style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle className='mb-2' tag='h3' id="CardTitle">آخرین تراکنش ها<img src={props.data.image} style={{ marginTop:"-10px", float:"left", width:"30px"}}/></CardTitle>
          <div style={{width:"100%"}}>
            <div className='row'>
              <div className='col-lg-3 mt-3'>
                <TimeLimit/>
              </div>
              <div className='col-lg-3 mt-3'>
                <AmountLimit/>
              </div>
              <div className='col-lg-6 mt-3' style={{textAlign:"left"}}>
                <Download style={{cursor:"pointer", marginTop:"12px"}} onClick={() => { downloadCSV(DownloadData) }} />
              </div>
            </div>
          </div>

        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            columns={columns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={ showData}
          />
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-4'>
            </div>
            <div className='col-lg-4 mt-3 mb-3'>
              <button id='PaginationButton' onClick={() => { SetNumberofShow(numberOfShow + 1) }} style={{width:"100%", borderWidth:"1px", borderColor:MainSiteGray, borderStyle:"solid"}} type="button" class="btn">نمایش بیشتر...</button>
            </div>
            <div className='col-lg-4'>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
