/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import {  Row, Col, Input, Form, Label } from 'reactstrap'
import { MainSiteGray, MainSiteOrange } from '../../../public/colors'
import CreatableSelect from 'react-select/creatable'
import toast from 'react-hot-toast'

const AdminAddNewUser = () => {
    const [inputValue, setInputValue] = useState('')
    const [inputLastValue, setInputLastValue] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    
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

    var customStyles = {
      singleValue: (provided) => ({
        ...provided,
        color: 'rgb(120,120,120)'
      }),
      control: (provided) => ({
        ...provided,
        borderColor: MainSiteGray
      })
    }

    var ErrcustomStyles = {
      singleValue: (provided) => ({
        ...provided,
        color: 'rgb(120,120,120)'
      }),
      control: (provided) => ({
        ...provided,
        borderColor: 'red'
      })
    }

    useEffect(() => {
      if (NameErr) {
        document.getElementById('NameAddUserAdmin').style.borderColor = "red"
      } else {
        document.getElementById('NameAddUserAdmin').style.borderColor = MainSiteGray
      }

      if (LastnameErr) {
        document.getElementById('lastNameMulti').style.borderColor = "red"
      } else {
        document.getElementById('lastNameMulti').style.borderColor = MainSiteGray
      }

      if (EmailErr) {
        document.getElementById('AdminAddUserEmailInput').style.borderColor = "red"
      } else {
        document.getElementById('AdminAddUserEmailInput').style.borderColor = MainSiteGray
      }

      if (UsernameErr) {
        document.getElementById('AdminAddUserUsernameInput').style.borderColor = "red"
      } else {
        document.getElementById('AdminAddUserUsernameInput').style.borderColor = MainSiteGray
      }

      if (NumberErr) {
        document.getElementById('AdminAddUserPhoneNumber').style.borderColor = "red"
      } else {
        document.getElementById('AdminAddUserPhoneNumber').style.borderColor = MainSiteGray
      }
    }, [NameErr, LastnameErr, EmailErr, RollErr, UsernameErr, NumberErr])

    const handleSelectChange = (newValue) => {
      setSelectedOption(newValue)
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

    const [inputUsernameValue, setInputUsernameValue] = useState('')

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

    const handleSubmit = (event) => {
      const Emailvalue = document.getElementById('AdminAddUserEmailInput').value
      const Numbervalue = document.getElementById('AdminAddUserPhoneNumber').value
      const nameValue = document.getElementById('NameAddUserAdmin').value
      const LastnameValue = document.getElementById('lastNameMulti').value
      const UsernameValue = document.getElementById('AdminAddUserUsernameInput').value
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phoneRegex = /^09[0-9]{9}$/

      event.preventDefault()
      if (emailRegex.test(Emailvalue)) {
        if (phoneRegex.test(Numbervalue)) {
          if (selectedOption !== null) {
            if (LastnameValue !== '') {
              if (UsernameValue !== '') {
                if (nameValue !== '') {
                  alert('ok')
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
        <form onSubmit={(event) => { handleSubmit(event) }}>
          <Row>
            <Col md='6' sm='12' className='mb-1 mt-1'>
              <Label className='form-label' for='NameAddUserAdmin'>
                نام
              </Label>
              <Input value={inputValue} onChange={handleInputChange} type='text' name='name' id='NameAddUserAdmin'/>
              {
                NameErr ? 
                  <small style={{color:"red"}} id='NameErrTag'>
                    {NameErrText}
                  </small>
                :
                  null
              }

            </Col>
            <Col md='6' sm='12' className='mb-1 mt-1'>
              <Label className='form-label' for='lastNameMulti'>
                نام خانوادگی
              </Label>
              <Input value={inputLastValue} onChange={handleInputLastChange} type='text' name='lastname' id='lastNameMulti' />
              {
                LastnameErr ?
                  <small style={{color:"red"}} id='LastNameErrTag'>
                    {LastnameErrText}
                  </small>
                :
                  null
              }

            </Col>

            <Col md='6' sm='12' className='mb-1 mt-1'>
              <Label className='form-label' for='AdminAddUserEmailInput'>
                ایمیل
              </Label>
              <Input id="AdminAddUserEmailInput" type='text' name='company' placeholder='example@example.com' />
              {
                EmailErr ? 
                  <small style={{color:"red"}} id='EmailErrTag'>
                    {EmailErrText}
                  </small>
                :
                  null
              }

            </Col>
            <Col md='6' sm='12' className='mb-1 mt-1'>
                <Label className='form-label'>
                    نقش
                </Label>
                {
                  RollErr ? 
                    <div>
                      <CreatableSelect 
                        value={selectedOption}
                        onChange={handleSelectChange}
                        styles={ErrcustomStyles}
                        
                        placeholder="انتخاب نقش"
                        options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' }
                        ]}
                        id='AdminAddUserRollSelect' 
                      />
                      <small style={{color:"red"}} id='RollErrTag'>
                        {RollErrText}
                      </small>
                    </div>

                  :
                    <CreatableSelect 
                      value={selectedOption}
                      onChange={handleSelectChange}
                      styles={customStyles}
                      
                      placeholder="انتخاب نقش"
                      options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' },
                      { value: 'option3', label: 'Option 3' }
                      ]}
                      id='AdminAddUserRollSelect' 
                    />
                }

            </Col>
            <Col md='6' sm='12' className='mb-1 mt-1'>
              <Label className='form-label' for='cityMulti'>
                نام کاربری
              </Label>
              <Input id="AdminAddUserUsernameInput" value={inputUsernameValue} onChange={handleInputUsernameChange} type='text' name='city' />
              {
                UsernameErr ?
                  <small style={{color:"red"}} id='UsernameErrTag'>
                    {UsernameErrText}
                  </small>
                :
                  null
              }

            </Col>
            <Col md='6' sm='12' className='mb-1 mt-1'>
              <Label className='form-label' for='AdminAddUserPhoneNumber'>
                شماره همراه
              </Label>
              <Input type='text' name='Email' id='AdminAddUserPhoneNumber' placeholder='09121234567' />
              {
                NumberErr ?
                  <small style={{color:"red"}} id='NumberErrTag'>
                    {NumberErrText}
                  </small>
                :
                  null
              }

            </Col>
            <Col md='6' sm='12' className='mb-1 mt-1'>
              <Label className='form-label'>
              *رمز عبور توسط سیستم به طور خودکار تولید شده و برای کاربر ارسال (پیامک، ایمیل) میشود.
              </Label>
            </Col>
            <Col md='6' sm='12' className='mb-1 mt-1'>
              <Label className='form-label' for='EmailMulti'>
                
              </Label>
              <div style={{textAlign:"left"}}>
                <button style={{border:"none", float:"left", background:MainSiteOrange, color:"white", padding:"6px 16px", borderRadius:"6px", marginTop:"4px"}}>افزودن</button>
              </div>
            </Col>
          </Row>
        </form>
  )
}

export default AdminAddNewUser
