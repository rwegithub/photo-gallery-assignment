export interface Photo {
    id:number;
    message:string;
    picture:string;
    pictureSmall:string;
    pictureMedium:string;
    pictureStored:string;
    timestamp:number;
    order?:number;
}