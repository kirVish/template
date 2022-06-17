import React, { FC } from 'react'

/**
* @author
* @function @EmptySearch
**/

export const EmptySearch:FC = () => {
  return (
    <div className="empty-search min-h-60 text-2xl flex h-full items-center text-center justify-center text-white">
        <div>
            Ничего не найдено
            <br/>
            <span className="text-base text-gray-100">Попробуйте изменить условия поиска</span>
        </div>
    </div>
   )
 }
