import { Photo } from "./Photo";
import { User } from "./User";

export interface UserPhoto {
    id:number;
    code:string;
    startDate:Date;
    endDate:Date;
    cover:string;
    is_shareable:string;
    author:User;
    entries:Array<Photo>
}