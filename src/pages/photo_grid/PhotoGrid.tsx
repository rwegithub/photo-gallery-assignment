import React, { useEffect, useState } from "react";
import Gallery from "../../components/Gallery/Gallery";
import { AppInfoType } from "../../constants/AppConatants";
import { Photo } from "../../model/Photo";
import { PhotoService } from "../../services/PhotoService";
import translation from "../../i18n/i18.json";
import Backdrop from "../../components/BackDrop/Backdrop";

export default function PhotoGrid() {
  //contains photo data
  const [photoList, setPhotoList] = useState<Photo[]>([]);
  //display/hide loading
  const [isLoading, setIsLoading] = useState(false);
    //infor message related
    const [showInforMsg, setShowInforMsg] = React.useState(false);
    const [inforSeverity, setInforSeverity] = React.useState(AppInfoType.error);
    const [inforMsg, setInforMsg] = React.useState("");
    //infor message related

 //show infro message
 const showInforMessage = (message:string, severity:AppInfoType) => {
    setInforSeverity(severity);
    setInforMsg(message);
    setShowInforMsg(true);
  }

  //on page load - get saved best photo list
  useEffect(() => {
    setIsLoading(true);
    PhotoService.getSelectedPhotoes(
      function (savedPhotoList: Array<Photo>) {
        console.log(savedPhotoList);
        if (savedPhotoList && savedPhotoList.length > 0) {
          setPhotoList(savedPhotoList);
        }
        setIsLoading(false);
      },
      function (error: Error) {
        console.log(error);
        setIsLoading(false);
        showInforMessage(translation.photo_grid_photoes_retrive_err,  AppInfoType.error);
      }
    );
  }, [])

  const onSaveSelectedPotoes = (slecetedPhotList: Array<Photo>) => {
    //history.push(NavigationPaths.PhotoGrid);
  };
  
  return (
    <div>
      <Gallery
        photoList={photoList}
        setPhotoList={setPhotoList}
        onSaveSelectedPotoes={onSaveSelectedPotoes}
        isEditView={false}
      ></Gallery>
      <Backdrop open={isLoading}></Backdrop>
    </div>
  );
}
