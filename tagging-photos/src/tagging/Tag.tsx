import { Image } from "./Image";

export class Tag {
    name:string
    color:string
    photosArr:Array<Image>

    constructor(name:string,color:string) {
        this.name=name
        this.color=color
        this.photosArr=[]
    }

    //add photo to array

    //delete photo from array

    get getPhotoArr(){
        return this.photosArr
    }
}