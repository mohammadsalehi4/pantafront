/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect, forwardRef } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
  Card,
  Input,
  CardTitle,
  CardHeader
} from 'reactstrap'
import { MainSiteGray } from '../../../../../../public/colors'
import NiceAddress from '../../../../../components/niceAddress/niceAddress'
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const columns = [

  {
    name: 'آدرس',
    minWidth: '130px',
    maxWidth:"140px",
    selector: row => (
      <div className='d-flex mt-2 align-items-end '>
        <div className='user-info text-truncate'>
          <NiceAddress text={row.address} number={3}/>
        </div>
      </div>
    )
  },
  {
    name: 'ریسک',
    sortable: true,
    minWidth: '10px',
    maxWidth:'90px',
    selector: row => digitsEnToFa(row.RiskScore)
    },
    {
    name: 'حجم',
    sortable: true,
    minWidth: '110px',
    maxWidth:'120px',
    selector: row => digitsEnToFa(row.BTCAmount)
  },

  {
    name: 'مالک',
    maxWidth: '20px',
    cell: () => {
      return (
          // <button style={{background:"white", margin:"none", borderColor:"rgb(200,200,200)", color:"rgb(100,100,100)", borderStyle:"solid", borderRadius:"5px"}}>نمایش</button>
        <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="-700 0 1200 500">
          <path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
          <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="24"/>
        </svg>
      )
    }
  },
  {
    name: '',
    allowOverflow: true,
    width:"120px",
    maxWidth:"120px",
    cell: () => {
      return (
        <div  style={{background:"#dcdcdc", padding:"2px 4px", borderRadius:"6px", marginRight:"-20px", cursor:"pointer"}} >
          <ion-icon style={{marginBottom:"-3px", marginRight:"-2px"}} name="chevron-back-outline"></ion-icon>
        </div>
      )
    }
  }
]

const LeftDataTableWithButtons = (props) => {

  const [numberOfShow, SetNumberofShow] = useState(0)
  const [showData, SetShowData] = useState([])
  let filteredData = []
  useEffect(() => {
    const a = 5 * (numberOfShow + 1)
    filteredData = []
    for (let i = 0; i < a; i++) {
      if (props.data.outputData[i]) {
        filteredData.push(props.data.outputData[i])
        if (filteredData.length === props.data.outputData.length) {
          document.getElementById('LeftPaginationButton').style.color = MainSiteGray
        }
      }
    }
    SetShowData(filteredData)
    console.log(filteredData)
    console.log(props.data.outputData)
  }, [, numberOfShow])

  return (
    <Fragment >
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle tag='h3' id="CardTitle">کیف های خروجی</CardTitle>
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
            <div className='col-md-2'>
            </div>
            <div className='col-md-8 mt-3 mb-3'>
              <button id='LeftPaginationButton' onClick={() => { SetNumberofShow(numberOfShow + 1) }} style={{width:"100%", borderWidth:"1px", borderColor:MainSiteGray, borderStyle:"solid"}} type="button" class="btn">نمایش بیشتر...</button>
            </div>
            <div className='col-md-2'>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default LeftDataTableWithButtons
