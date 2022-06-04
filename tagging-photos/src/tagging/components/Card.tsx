import React, { useState } from 'react'
import {BsFillTagsFill} from 'react-icons/bs'
import {MdOutlineCancel} from 'react-icons/md'
import './card.css'
import TagBox from './TagBox';
export default function Card(props: { url: string ,id:number,allTags:{name:string,color:string}[]}) {
  let[matchingTag,setMatching]=useState(false)

  return (
    <div className='cardLayer'>
        
        <img className='imageCard' src={props.url} alt="" />
        <ul className='cardButtom'>
          <span className='cardId'>{props.id}</span>
          <span className='matchingIcon' onClick={()=>setMatching(!matchingTag)}><BsFillTagsFill/></span>
        </ul>
        {matchingTag?
          <div className='matchingWindow'>
            <span className='exit' onClick={()=>setMatching(!matchingTag)}><MdOutlineCancel/></span>
            {props.allTags.map((curr,i)=>{
              return <TagBox name={curr.name} color={curr.color} case={'matching'} imgUrl={props.url} imgId={props.id}/>
            })}
          </div>
          :null
        }
    </div>
  )
}

