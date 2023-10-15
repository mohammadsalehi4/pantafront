/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** Table Columns
import { useState, useEffect } from 'react'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit3 } from 'react-feather'
import EditUser from './adminEditUser'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Row, Col} from 'reactstrap'
import LocalLoading from '../localLoading/localLoading'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'

const DataTablesBasic = () => {
    const [users, setUsers] = useState([])
    const [number, SetNumber] = useState(1)
    const dispatch = useDispatch()

    const [Edit, setEdit] = useState(false)
    const handleEdit = () => setEdit(!Edit)
    const States = useSelector(state => state)

    const basicColumns = [
      {
          name: 'آی‌دی',
          sortable: true,
          maxWidth: '90px',
          minWidth: '90px',
          selector: row => row.id
      },
      {
          name: 'نام کاربری',
          sortable: true,
          maxWidth: '170px',
          minWidth: '170px',
          selector: row => row.username
      },
      {
          name: 'ایمیل',
          sortable: true,
          minWidth: '270px',
          maxWidth: '270px',
          selector: row => row.email
      },
      {
          name: 'شماره تلفن',
          sortable: true,
          minWidth: '160px',
          maxWidth: '160px',
          selector: row => row.phone_number
      },
      {
        name: 'نقش',
        minWidth: '150px',
        maxWidth: '150px',
        selector: row => (
          row.role
        )
      },
      {
        name: 'ویرایش',
        minWidth: '90px',
        maxWidth: '90px',
        cell: row => (
          <Edit3 onClick={() => { 
            handleEdit()
            SetNumber(row.id)
           }}  size={25} style={{marginLeft:'8px', color:'rgb(160,160,160)', cursor:'pointer'}}/>
        )
      }
    ]

    useEffect(() => {
        let getUsers = []
        dispatch({type:"CustomLoading", value:true})
        axios.get(`${serverAddress}/accounts/users`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            if (response.data.results.length > 0) {
                getUsers = response.data.results
                axios.get(`${serverAddress}/accounts/role/`, 
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                  }
                })
                .then((resp2) => {
                    if (resp2.data.results.length > 0) {
                        for (let i = 0; i < getUsers.length; i++) {
                          for (let j = 0; j < resp2.data.results.length; j++) {
                            if (String(getUsers[i].role) === String(resp2.data.results[j].id)) {
                              getUsers[i].role = resp2.data.results[j].name
                            }
                          }
                        }
                        setUsers(getUsers)
                    }
                    dispatch({type:"CustomLoading", value:false})
                })
                .catch((err) => {
                    dispatch({type:"CustomLoading", value:false})
                    try {
                      if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                        Cookies.set('refresh', '')
                        Cookies.set('access', '')
                        window.location.assign('/')
                      }
                    } catch (error) {}
                })
            }
        })
        .catch((err) => {

            dispatch({type:"CustomLoading", value:false})
            try {
              if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
              }
            } catch (error) {}
        })
    }, [, States.beLoad])

    //pagination
    const [currentPage, setCurrentPage] = useState(0)
    const handlePagination = page => {
      setCurrentPage(page.selected)
    }
    const CustomPagination = () => (
      
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageRangeDisplayed={2}
        forcePage={(currentPage)}
        marginPagesDisplayed={2}
        activeClassName='active'
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        pageCount={Math.ceil(users.length / 10) || 1}
        onPageChange={page => handlePagination(page)}
        containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
      />
    )

  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
        <CardTitle tag='h6'>لیست کاربران</CardTitle>
      </CardHeader>
      <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-2 mb-2' md='6' sm='12'>
            <div className='d-flex mt-md-0 mt-1'>
              <button style={{background:MainSiteyellow, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px"}} className='ms-2' color='primary' onClick={() => {
                  dispatch({type:"beLoad", value:!(States.beLoad)})
                }}>
                <span className='align-middle'>به‌روزرسانی</span>
              </button>
            </div>
          </Col>
        </Row>
      {
        States.CustomLoading ? 
          <LocalLoading/> 
        : 
          <div className='react-dataTable'>
            <DataTable
              noHeader
              data={users}
              columns={basicColumns}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
              pagination
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
          </div>
      }
 

      <EditUser users={users.find(item => item.id === number)} open={Edit} handleModal={handleEdit}/>

    </Card>
  )
}

export default DataTablesBasic

