/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { X } from 'react-feather'
import { Modal, Input, Label, ModalHeader, ModalBody } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { MainSiteOrange} from '../../../public/colors'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
const EditUser = ({ open, handleModal, users }) => {
  const dispatch = useDispatch()
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  //Errors
  const [NameErr, SetNameErr] = useState(false)
  const [NameErrText, SetNameErrText] = useState('')
  const [LastnameErr, SetLastNameErr] = useState(false)
  const [LastnameErrText, SetLastNameErrText] = useState('')
  const [EmailErr, SetEmailErr] = useState(false)
  const [EmailErrText, SetEmailErrText] = useState('')
  const [RollErr, SetRollErr] = useState(false)
  const [RollErrText, SetRollErrText] = useState('')
  const [UsernameErr, SetUsernameErr] = useState(false)
  const [UsernameErrText, SetUsernameErrText] = useState('')
  const [NumberErr, SetNumberErr] = useState(false)
  const [NumberErrText, SetNumberErrText] = useState('')

  const [inputValue, setInputValue] = useState('')
  const [inputLastValue, setInputLastValue] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [GetRole, setGetRole] = useState('')
  const [inputUsernameValue, setInputUsernameValue] = useState('')
  const [inputEmailValue, setInputEmailValue] = useState('')
  const [inputNumberValue, setInputNumberValue] = useState('')
  const [inputIsActive, setInputIsActive] = useState(null)

  const [Rolls, SetRolls] = useState([])

  const numberHandler = (event) => {
    const value = event.target.value
    setInputNumberValue(value)
  }

  const numberValidator = () => {
    const inputNumberElement = document.getElementById('AdminAddUserPhoneNumber2')
    const phoneRegex = /^09[0-9]{9}$/
    if (!(phoneRegex.test(inputNumberElement.value))) {
      SetNumberErr(true)
      SetNumberErrText('شماره مورد نظر را به درستی وارد کنید!')
    } else {
      SetNumberErr(false)
      SetNumberErrText('')
    }
  }

  const EmailHandler = (event) => {
    const value = event.target.value
    setInputEmailValue(value)
  }

  const EmailValidator = (event) => {
    const inputEmailElement = document.getElementById('AdminAddUserEmailInput2')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!(emailRegex.test(inputEmailElement.value))) {
      SetEmailErr(true)
      SetEmailErrText('ایمیل مورد نظر را به درستی وارد کنید!')
    } else {
      SetEmailErr(false)
      SetEmailErrText('')
    }

  }

  const handleInputChange = (event) => {
    const value = event.target.value
    const persianRegex = /^[\u0600-\u06FF\s]+$/

    if (persianRegex.test(value) || value === '') {
      setInputValue(value)
      SetNameErr(false)
      SetNameErrText('')
    } else {
      SetNameErr(true)
      SetNameErrText('نام کاربر باید تنها از حروف فارسی تشکیل شده باشد!')
    }
  }

  const handleInputLastChange = (event) => {
    const value = event.target.value
    const persianRegex = /^[\u0600-\u06FF\s]+$/

    if (persianRegex.test(value) || value === '') {
      setInputLastValue(value)
      SetLastNameErr(false)
      SetLastNameErrText('')
    } else {
      SetLastNameErr(true)
      SetLastNameErrText('نام خانوادگی کاربر باید تنها از حروف فارسی تشکیل شده باشد!')
    }
  }

  const handleInputUsernameChange = (event) => {
    const value = event.target.value
    const englishRegex = /^[a-zA-Z0-9]+$/

    if (englishRegex.test(value) || value === '') {
      setInputUsernameValue(value)
      SetUsernameErr(false)
      SetUsernameErrText('')
    } else {
      SetUsernameErr(true)
      SetUsernameErrText('نام کاربری کاربر باید تنها از حروف و اعداد انگلیسی تشکیل شده باشد!')
    }
  }

  function handleSelectionChange() {
    const selectedValue = document.getElementById('Roll_select_Options2').value
    if (Number(selectedValue) === 0) {
      SetRollErr(true)
      SetRollErrText('نقش را به درستی وارد کنید.')
      setSelectedOption(null)
    } else {
      SetRollErr(false)
      setSelectedOption(String(selectedValue))
    }
  }

  //get Roles
  useEffect(() => {
    dispatch({type:"LOADINGEFFECT", value:true})
    axios.get(`${serverAddress}/accounts/role/`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
        dispatch({type:"LOADINGEFFECT", value:false})
        if (response.data.results.length > 0) {
            SetRolls(response.data.results)
        }
    })
    .catch((err) => {
        dispatch({type:"LOADINGEFFECT", value:false})
        try {
          if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
        } catch (error) {}
    })
  }, [])

  useEffect(() => {
    try {
      if (users) {
        setInputEmailValue(users.email)
        setInputNumberValue(users.phone_number)
        setInputValue(users.first_name)
        setInputLastValue(users.last_name)
        setInputUsernameValue(users.username)
        setGetRole(users.role)
        setInputIsActive(users.is_active)
        setSelectedOption((Rolls.find(item => item.name === users.role)).id)
      }
    } catch (error) {
    }

  }, [users])

  const handleSubmit = (event) => {
    const Emailvalue = document.getElementById('AdminAddUserEmailInput2').value
    const Numbervalue = document.getElementById('AdminAddUserPhoneNumber2').value
    const nameValue = document.getElementById('NameAddUserAdmin2').value
    const LastnameValue = document.getElementById('lastNameMulti2').value
    const UsernameValue = document.getElementById('AdminAddUserUsernameInput2').value
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^09[0-9]{9}$/

    event.preventDefault()
    if (emailRegex.test(Emailvalue)) {
      if (phoneRegex.test(Numbervalue)) {
        if (selectedOption !== null) {
          if (LastnameValue !== '') {
            if (UsernameValue !== '') {
              if (nameValue !== '') {
                // register
                dispatch({type:"LOADINGEFFECT", value:true})
                axios.put(`${serverAddress}/accounts/profile/${users.id}/`, 
                {
                    first_name : document.getElementById('NameAddUserAdmin2').value,
                    last_name : document.getElementById('lastNameMulti2').value,
                    email : document.getElementById('AdminAddUserEmailInput2').value,
                    role_id: String(selectedOption),
                    username : document.getElementById('AdminAddUserUsernameInput2').value,
                    phone_number : document.getElementById('AdminAddUserPhoneNumber2').value,
                    is_active:inputIsActive
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access')}`, 
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    dispatch({type:"LOADINGEFFECT", value:false})
                    if (response.data.message === 'success') {
                      window.location.assign('/admin')
                    } else {
                      console.log(111)
                    }
                })
                .catch((err) => {
                    dispatch({type:"LOADINGEFFECT", value:false})
                    console.log(err.response.data)
                    try {
                      if (err.response.data.phone_number[0] === 'user with this phone number already exists.') {
                        return toast.error('شماره موبایل تکراری است', {
                          position: 'bottom-left'
                        })
                      }
                    } catch (error) {}
                    try {
                      if (err.response.data.username[0] === 'A user with that username already exists.') {
                        return toast.error('نام کاربری انتخاب شده از قبل وجود دارد.', {
                          position: 'bottom-left'
                        })
                      }
                    } catch (error) {}
                })
              }
            }
          }
        }
      }
    }

    if (!(emailRegex.test(Emailvalue))) {
      SetEmailErr(true)
      SetEmailErrText('ایمیل مورد نظر را به درستی وارد کنید!')
    } else {
      SetEmailErr(false)
      SetEmailErrText('')
    }

    if (!(phoneRegex.test(Numbervalue))) {
      SetNumberErr(true)
      SetNumberErrText('شماره مورد نظر را به درستی وارد کنید!')
    } else {
      SetNumberErr(false)
      SetNumberErrText('')
    }

    if (selectedOption === null) {
      SetRollErr(true)
      SetRollErrText('نقش مورد نظر خود را وارد کنید!')
    } else {
      SetRollErr(false)
      SetRollErrText('')
    }

    if (LastnameValue === '') {
      SetLastNameErr(true)
      SetLastNameErrText('نام خانوادگی را وارد کنید!')
    } else {
      SetLastNameErr(false)
      SetLastNameErrText('')
    }

    if (UsernameValue === '') {
      SetUsernameErr(true)
      SetUsernameErrText('نام کاربری مورد نظر خود را وارد کنید!')
    } else {
      SetUsernameErr(false)
      SetUsernameErrText('')
    }

    if (nameValue === '') {
      SetNameErr(true)
      SetNameErrText('نام را وارد کنید!')
    } else {
      SetNameErr(false)
      SetNameErrText('')
    }
  }

  return (
    <Modal
      isOpen={open}
      className='sidebar-sm m-0'
      toggle={ handleModal}
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
      style={{margin:"0px"}}
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>ویرایش کاربر</h5>
        <Label className='form-label' for='full-name'>
           کاربر مورد نظر خود را ویرایش کنید.
        </Label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1 mt-3'>
          <div>
            <div className='row'>
              <Label className='form-label' for='full-name' style={{ fontSize:"12px"}}>
                نام
              </Label>
              <Input value={inputValue} type='text' style={{borderRadius:'4px', borderStyle:'solid'}} id='NameAddUserAdmin2' onChange={handleInputChange}/>
              {
                NameErr ? 
                  <small style={{color:"red"}} id='NameErrTag'>
                    {NameErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                نام خانوادگی
              </Label>
              <Input value={inputLastValue} onChange={handleInputLastChange} type='text' style={{borderRadius:'4px', borderStyle:'solid'}} id='lastNameMulti2'/>
              {
                LastnameErr ?
                  <small style={{color:"red" }} id='LastNameErrTag'>
                    {LastnameErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                نام کاربری
              </Label>
              <Input value={inputUsernameValue} onChange={handleInputUsernameChange} type='text' style={{borderRadius:'4px', borderStyle:'solid'}} id="AdminAddUserUsernameInput2"/>
              {
                UsernameErr ?
                  <small style={{color:"red"}} id='UsernameErrTag'>
                    {UsernameErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                ایمیل
              </Label>
              <Input value={inputEmailValue} onBlur={EmailValidator} onChange={EmailHandler} id="AdminAddUserEmailInput2" type='text' style={{borderRadius:'4px', borderStyle:'solid'}}/>
              {
                EmailErr ? 
                  <small style={{color:"red"}} id='EmailErrTag'>
                    {EmailErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                شماره همراه
              </Label>
              <Input value={inputNumberValue} onBlur={numberValidator} onChange={numberHandler} id='AdminAddUserPhoneNumber2' type='text' style={{borderRadius:'4px', borderStyle:'solid'}}/>
              {
                NumberErr ?
                  <small style={{color:"red"}} id='NumberErrTag'>
                    {NumberErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                نقش
              </Label>

              <select onChange={handleSelectionChange} class="form-select" id='Roll_select_Options2' aria-label="Default select example">
                <option value="0">انتخاب نقش</option>
                {
                  Rolls.map((item, index) => {
                    if (item.name === GetRole) {
                      return (
                        <option selected key={index} value={`${item.id}`}>{item.name}</option>
                      )
                    } else {
                      return (
                        <option key={index} value={`${item.id}`}>{item.name}</option>
                      )
                    }
                  })
                }
                
              </select >
              {
                RollErr ? 
                  <small style={{color:"red"}} id='RollErrTag'>
                    {RollErrText}
                  </small>
                :
                  null
              }
              <div className='mt-3' style={{marginRight:'-12px'}}>
                {
                  inputIsActive === true ? 
                    <Input onClick={(event) => { setInputIsActive(!(event.target.checked)) }} type='checkbox' style={{display:'inline-block', marginTop:'12px', color:'red'}} id='deActiveCheckbox'/>
                  :
                    <Input onClick={(event) => { setInputIsActive(!(event.target.checked)) }} defaultChecked type='checkbox' style={{display:'inline-block', marginTop:'12px', color:'red'}} id='deActiveCheckbox'/>
                }
                <Label className='form-label mt-3 me-1 ' for='deActiveCheckbox' style={{ fontSize:"12px", display:'inline-block', color:'red'}}>
                  غیرفعال سازی کاربر
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div style={{textAlign:"left"}} className='mt-3'>
          <button onClick={(event) => { handleSubmit(event) }} style={{ color:"white", background:MainSiteOrange, border:"none", padding:"8px 16px", borderRadius:"8px"}} color='secondary'  outline>
            <span className='align-middle'>ویرایش کاربر</span>
          </button>

        </div>


      </ModalBody>
    </Modal>
  )
}

export default EditUser