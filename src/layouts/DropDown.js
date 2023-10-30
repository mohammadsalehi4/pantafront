/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, Fragment, useState } from 'react'
import Cookies from 'js-cookie'
import { LogOut, Lock, User, ChevronLeft } from 'react-feather'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'

const DropDown = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dispatch = useDispatch()
    const store = useSelector(state => state.ecommerce)
    const toggle = () => setDropdownOpen(prevState => !prevState)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} tag='li' className='dropdown-cart nav-item me-25'>
      <DropdownToggle tag='a' className=' nav-link dropdown-toggle hide-arrow topHeaderIcon' style={{textAlign:'center'}}>
        <ion-icon name="person-outline"></ion-icon>
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media dropdown-cart mt-0' style={{minWidth:'260px'}}>


        <li className='dropdown-menu-header p-2' style={{direction:'rtl', textAlign:'right'}}>
            <div className='row container-fluid pb-2' style={{borderBottomStyle:'solid', borderBottomColor:'rgb(220,220,220)', borderBottomWidth:'1px'}}>
                <div className='col-3'>
                    <svg viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                        <mask id=":r3j:" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
                        <rect width="80" height="80" rx="160" fill="#FFFFFF"></rect>
                        </mask>
                        <g mask="url(#:r3j:)">
                        <rect width="80" height="80" fill="#ffb238"></rect>
                        <path 
                            filter="url(#prefix__filter0_f)" 
                            d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" 
                            fill="#0a0310" 
                            transform="translate(2 -2) rotate(18 40 40) scale(1.5)">
                        </path>
                        <path 
                            filter="url(#prefix__filter0_f)" 
                            d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" 
                            fill="#49007e" 
                            transform="translate(-7 7) rotate(-207 40 40) scale(1.5)" 
                            style={{ mixBlendMode: 'overlay' }}>
                        </path>
                        </g>
                        <defs>
                        <filter id="prefix__filter0_f" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"></feGaussianBlur>
                        </filter>
                        </defs>
                    </svg>
                </div>
                <div className='col-9'>
                    <span style={{fontSize:'14px'}}>نام و نام خانوادگی </span><br/>
                    <span style={{fontSize:'12px'}}>ادمین سیستم</span>
                </div>
            </div>
        </li>

        <a href='/profile' style={{textDecoration:'none', color:'rgb(120,120,120)'}}>
            <li className='dropdown-menu-header profileHeaderItem' style={{direction:'rtl', textAlign:'right', padding:'16px 8px'}}>
                <div className='container-fluid '>
                        <User />
                        <span style={{marginBottom:'-8px', marginRight:'8px'}}>مشاهده پروفایل</span>
                </div>
            </li>
        </a>

        <a>
            <li className='dropdown-menu-header profileHeaderItem' style={{direction:'rtl', textAlign:'right', padding:'16px 8px'}}>
                <div className='container-fluid '>
                        <Lock />
                        <span style={{marginBottom:'-8px', marginRight:'8px'}}>تغییر رمز عبور</span>
                </div>
            </li>
        </a>

        <a>
            <li 
                onClick={
                    () => {
                        Cookies.set('refresh', '')
                        Cookies.set('access', '') 
                        window.location.assign('/') 
                    }
                }
                className='dropdown-menu-header profileHeaderItem' style={{direction:'rtl', textAlign:'right', padding:'16px 8px'}}>
                <div className='container-fluid '>
                        <LogOut />
                        <span style={{marginBottom:'-8px', marginRight:'8px'}}>خروج از حساب کاربری</span>
                </div>
            </li>
        </a>

      </DropdownMenu>
    </Dropdown>
  )
}

export default DropDown
