import { digitsEnToFa } from 'persian-tools'
import NiceAddress2 from '../niceAddress2/niceAddress'
// ** Table Columns

const basicColumns = [
  {
    name: <p style={{marginBottom:"0px"}}>شناسه UTXO<ion-icon title='توضیحات' style={{fontSize:"10px", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth:'180px',
    selector: row => row.utxo,
    cell: row => {
      return (
        <NiceAddress2 text={row.utxo} number={6}/>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>دارایی (BTC)<ion-icon title='توضیحات' style={{fontSize:"10px", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth:'150px',
    selector: row => row.assets,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.assets)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>تاریخ خرید<ion-icon title='توضیحات' style={{fontSize:"10px", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth:'150px',
    selector: row => row.buyTime,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.buyTime)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>قیمت خرید (USD)<ion-icon title='توضیحات' style={{fontSize:"10px", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth:'150px',
    selector: row => row.buyPrice,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.buyPrice)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>مدت نگهداری (روز)<ion-icon title='توضیحات' style={{fontSize:"10px", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth:'170px',
    selector: row => row.holdingPeriod,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.holdingPeriod)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>درصد اعمال<ion-icon title='توضیحات' style={{fontSize:"10px", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth:'150px',
    selector: row => row.applyPercentage,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.applyPercentage)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>مالیات (ريال)<ion-icon title='توضیحات' style={{fontSize:"10px", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '150px',
    selector: row => row.tax,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.tax)}</p>
      )
    }
  }
]
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card } from 'reactstrap'


const DataTablesBasic = (props) => {
  return (
    <Card className='overflow-hidden'>
      <div className='react-dataTable'>
        <DataTable
          selectableRows
          noHeader
          data={props.data}
          columns={basicColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default DataTablesBasic
