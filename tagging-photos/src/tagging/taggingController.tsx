import { Tag } from "./Tag";

let tagsArray:Array<Tag>;

export function newTag(name:string,color:string){
    tagsArray.push(new Tag(name,color))
}