import React, { useEffect, useState } from 'react'
import {BsFillTagsFill} from 'react-icons/bs'
import {MdOutlineCancel} from 'react-icons/md'
import { updateHeritageClause } from 'typescript';
import { matchingTags } from '../TaggingView';
import './card.css'
import TagBox from './TagBox';
export default function Card(props: { url: string ,id:number,allTags:{name:string,color:string}[]}) {
  let[matchingTag,setMatching]=useState(false)
  let[currTags,setCurrTags]=useState([{name:"",color:""}])
  let[firstTime,setFirstTime]=useState(true)

  function updateTags() {
    let temp=[]
    for (let i = 0; i < matchingTags.length-1; i++) {
      temp[i]=matchingTags[i+1].tagInfo;
    } 
    setCurrTags(temp);
   }
  
  return (
    <div className='cardLayer'>
        
        <img className='imageCard' src={props.url} alt="" />
        <ul className='cardButtom'>
          <span className='cardId'>{props.id}</span>
          <span className='matchingIcon' onClick={()=>{setMatching(!matchingTag);updateTags()}}><BsFillTagsFill/></span>
        </ul>
        {matchingTag?
          <div className='matchingWindow'>
            <span className='exit' onClick={()=>setMatching(!matchingTag)}><MdOutlineCancel/></span>
            {currTags.map((curr,i)=>{
              return <TagBox key={i} name={curr.name} color={curr.color} case={'matching'} imgUrl={props.url} imgId={props.id}/>
            })}
          </div>
          :null
        }
    </div>
  )
}



