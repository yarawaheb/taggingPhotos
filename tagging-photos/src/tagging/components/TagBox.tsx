import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import './tagBox.css'
import { matchingTags, signedPhotos } from '../TaggingView'
import { BiHelpCircle } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'
import Card from './Card'

export default function TagBox(props: { name: string ,color:string ,case:string,imgUrl:string,imgId:number}) {
  let[imgArray,setImgArr]=useState([{imgId:0,imgUrl:""}])
  let[isEditing,setIsEditing]=useState(false)
  let[isdeleting,setIsDeleting]=useState(false)
  let[theNewTag,setTag]=useState({name:props.name,color:props.color})
  let[filter,setFilter]=useState(false)

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

  function editTag() {
    for (let i = 0; i < matchingTags.length; i++) {
      if(matchingTags[i].tagInfo.name===props.name){
        matchingTags[i].tagInfo=theNewTag;
      }
    }
    console.log(matchingTags);
    
  }

  function deleteTag(){
    for (let i = 0; i < matchingTags.length; i++) {
      if(matchingTags[i].tagInfo.name===props.name){
        let temp=matchingTags[i];
        matchingTags[i]=matchingTags[matchingTags.length-1];
        matchingTags[matchingTags.length-1]=temp;
        matchingTags.pop();
      }
    }
    console.log(matchingTags);
    
    setIsDeleting(true)
  }

  function deleteImgFromTag(curr: { imgId: number; imgUrl: string }): void {
    for (let k = 0; k < imgArray.length; k++) {
      if (imgArray[k]===curr) {
        let temp1=imgArray[k];
        imgArray[k]=imgArray[imgArray.length-1];
        imgArray[imgArray.length-1]=curr;
        imgArray.pop();
      }
    }
    console.log(imgArray);
    setImgArr(imgArray);
    setImgArr(imgArray);
    for (let i = 0; i < matchingTags.length; i++) {
      if(matchingTags[i].tagInfo.name===props.name){
        for (let j = 0; j < matchingTags[i].imgArr.length; j++) {
          if (matchingTags[i].imgArr[j]===curr) {
            let temp=matchingTags[i].imgArr[j];
            matchingTags[i].imgArr[j]=matchingTags[i].imgArr[matchingTags[i].imgArr.length-1];
            matchingTags[i].imgArr[matchingTags[i].imgArr.length-1]=curr;
            matchingTags[i].imgArr.pop();
          }
        }
      }
    } 
    alert('image with id:' +curr.imgId+' deleted from tag: '+props.name)
  }

  return props.case==='matching'?(
    <div className='matching' onClick={()=>matchToTag()}>
      <div className='tag' style={{
          backgroundColor: theNewTag.color,
        }}>
          <span>{theNewTag.name}</span>
          <div className='matchingGallery'>
          {imgArray.map((curr,i)=>{
            return(<div key={i}>
             {i!=0?<img className='imgInTag' src={curr.imgUrl} alt="" />:null}
           </div>)
         })}</div>
      </div>
    </div>
  ):!isdeleting?(
    <div className='available'>
      <div className='tag' style={{
          backgroundColor: theNewTag.color,
        }}>
          <span className='tagName' onClick={()=>{setFilter(!filter)}}>{theNewTag.name}</span>
          <div className='editDeleteIcon'>
            <span onClick={()=>{setIsEditing(!isEditing)}}><FiEdit/></span>
            <span onClick={()=>deleteTag()}><AiOutlineDelete/></span>
          </div>
          {isEditing?<div><div className='editTag'>
            <input type="text" defaultValue={theNewTag.name} onBlur={(e)=>{setTag({...theNewTag,name:e.target.value})}}/>
            <div className='colorPicker'>
              <input type="text" defaultValue={theNewTag.color} onBlur={(e)=>{setTag({...theNewTag,color:e.target.value})}}/>
              <a href="https://www.w3schools.com/colors/colors_picker.asp?colorhex=ff0000" target="_blank"><BiHelpCircle/></a>
            </div>
            <button onClick={()=>{editTag();setIsEditing(!isEditing)}}>save</button>
            <button onClick={()=>setIsEditing(!isEditing)}>cancel</button>
          </div></div>:null}
      </div>
      {filter?<div className='filtered'>
        <div className='topFiltered'><span>{props.name}</span><span className='exit' onClick={()=>setFilter(!filter)}><MdOutlineCancel/></span></div>
        <div className='imagesInFilter'>{imgArray.map((curr,i)=>{
          return <div className='imgAfterFilter'><img src={curr.imgUrl} alt="" /><span className='deleteImgIcon' onClick={()=>{deleteImgFromTag(curr);setFilter(!filter)}}><AiOutlineDelete /></span></div>
        })}</div>
      </div>:null}
    </div>
  ):null
}










