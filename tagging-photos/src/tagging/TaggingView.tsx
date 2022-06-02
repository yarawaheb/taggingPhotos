import axios from 'axios'
import { useEffect, useState } from 'react'
import { ChromePicker, SketchPicker } from 'react-color'
import {BsFillTagsFill} from 'react-icons/bs'
import { isEmpty } from './taggingController'
import './taggingView.css'

export default function TaggingView() {
  let[addingTag,setAddingTag]=useState(false)
  let[colorOpen,setColorOpen]=useState(false)
  const [color, setColor] = useState("#aabbcc");

  let [allimageArray,setArray]=useState([{
    id:0,
    width:0,
    height:0,
    download_url:""
  }])
  useEffect(()=>{
    axios.get('https://picsum.photos/v2/list?page=2&limit=100')
      .then(response => {
        setArray(response.data)
        console.log(allimageArray);
             
    });
},[]);

  return (
    <div className='allPage'>

      <div className='left'>
        Unassigned
        <div className='topLeft'>
        {allimageArray.map((curr,i)=>{
            return <Card key={i} url={curr.download_url} id={curr.id}></Card>
        })}
        </div>
        <div className='bottomLeft'>tags matching</div>
      </div>

      <div className='right'>
        <div className='sideBar'>available tags
          {isEmpty()? <span className='noTags'>create your first tag</span>:""}
        </div>
        <div className='sideBarBottom'>
          {addingTag?<div>
            <input type="text" placeholder='Label'/>
            <button onClick={()=>{setColorOpen(!colorOpen)} }>Pick Color</button>
            { colorOpen ? <div><div/><ChromePicker /></div> : null }            
            <button>add</button>
          </div>:""}

          <button onClick={()=>{setAddingTag(!addingTag)}}>{!addingTag?"New tag":"cancel"}</button>
        </div> 
      </div>

    </div>
  )
}

const Card = (props: { url: string ,id:number}) => {
  return (<div className='cardLayer'>
      
      <img className='imageCard' src={props.url} alt="" />
      <ul className='cardButtom'>
        <span className='cardId'>{props.id}</span>
        <BsFillTagsFill/>
      </ul>
  </div>)
}