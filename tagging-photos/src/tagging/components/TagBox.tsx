import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import './tagBox.css'
import { matchingTags, signedPhotos } from '../TaggingView'

export default function TagBox(props: { name: string ,color:string ,case:string,imgUrl:string,imgId:number}) {
  let[imgArray,setImgArr]=useState([{imgId:0,imgUrl:""}])

  useEffect(()=>{
    for (let i = 0; i < matchingTags.length; i++) {
      if (matchingTags[i].tagInfo.name===props.name) {
        setImgArr(matchingTags[i].imgArr);
      }
    }
  },[]);
  function matchToTag(): void {    
    setImgArr([...imgArray,{imgId:props.imgId,imgUrl:props.imgUrl}])
    
    for (let i = 0; i < matchingTags.length; i++) {
      if (matchingTags[i].tagInfo.name===props.name) {
        matchingTags[i].imgArr.push({imgId:props.imgId,imgUrl:props.imgUrl})
      }
    }
    console.log(matchingTags);
    signedPhotos.push(props.imgId);
  }

  return props.case==='matching'?(
    <div className='matching' onClick={()=>matchToTag()}>
      <div className='tag' style={{
          backgroundColor: props.color,
        }}>
          <span>{props.name}</span>
          <div className='matchingGallery'>
          {imgArray.map((curr,i)=>{
            return(<div key={i}>
             {i!=0?<img className='imgInTag' src={curr.imgUrl} alt="" />:null}
           </div>)
         })}</div>
      </div>
    </div>
  ):(
    <div className='available'>
      <div className='tag' style={{
          backgroundColor: props.color,
        }}>
          <span>{props.name}</span>
          <FiEdit/>
          <AiOutlineDelete/>
      </div>
    </div>
  )
}




