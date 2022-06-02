import { Tag } from "./Tag";

let tagsArray=[];

export function newTag(name:string,color:string){
    tagsArray.push(new Tag(name,color))
}

export function isEmpty(){
    return tagsArray.length===0
}