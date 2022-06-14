import React, { FC } from 'react'

interface IProps {}

/**
* @author
* @function @Header
**/

export const Header:FC<IProps> = (props) => {
  return (
    <header className="px-6 py-4 mb-6 bg-gray-600 flex items-center justify-between sticky top-0 z-10">
        <div id="headerButtons" className="flex items-center">
            <button className="h-8 w-8 bg-gray-500 rounded-full text-white flex mr-4 opacity-50 cursor-not-allowed">
              <svg className="h-5 w-5 m-auto" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
                ></path>
              </svg>
            </button>
            <button className="h-8 w-8 bg-gray-500 rounded-full text-white flex">
              <svg className="h-5 w-5 m-auto" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"
                ></path>
              </svg>
            </button>
        </div>
        <div>
            <button className="user-button overflow-hidden relative text-xs text-white bg-gray-500 rounded-full p-px pr-3">
                <img src="http://i.pravatar.cc/300" className="w-7 h-7 inline-block rounded-full mr-2"/>
                <span className="user-profile">Профиль</span>
                <div className="logout-button flex items-center align-middle text-left bg-gray-500 opacity-100 absolute h-full top-0 bottom-0 w-full">
                    Выйти
                </div>
            </button>
        </div>
    </header>
   )
 }
