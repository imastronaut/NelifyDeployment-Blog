import React,{useState} from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import ItemList from '../components/ItemList'

const Content = ({items,handleCheck, handleDelete}) => {
  

    
      
  return (
    <>
      {items.length?(
        <ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete}/>
      ):(
        <p style={{marginTop:"2rem"}}>Your List is empty</p>
      )}
    </>
  )
}

export default Content
