import React, { useEffect, useState } from "react";
import { UserPhoto } from "../../model/UserPhoto";
import { PhotoService } from "../../services/PhotoService";
import useStyles from "./PhotoSelection.css";
import { Button, GridList, GridListTile } from "@material-ui/core";
import Gallery from "../../components/Gallery/Gallery";
import { Photo } from "../../model/Photo";
import translation from "../../i18n/i18.json";
import { useHistory } from "react-router-dom";
import { AppInfoType, NavigationPaths } from "../../constants/AppConatants";
import Backdrop from "../../components/BackDrop/Backdrop";

export default function PhotoSelection() {
  const classes = useStyles();
  const history = useHistory();
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
  const showInforMessage = (message: string, severity: AppInfoType) => {
    setInforSeverity(severity);
    setInforMsg(message);
    setShowInforMsg(true);
  };

  //on page load - get all photoes of user with user detail
  useEffect(() => {
    setIsLoading(true);
    PhotoService.getAllUserPhotoes(
      function (photoData: UserPhoto) {
        console.log(photoData);
        if (photoData.entries && photoData.entries.length > 0) {
          setPhotoList(photoData.entries);
        }
        setIsLoading(false);
      },
      function (error: Error) {
        console.log(error);
        setIsLoading(false);
        showInforMessage(
          translation.photo_selection_photoes_retrive_err,
          AppInfoType.error
        );
      }
    );
  }, []);

  //this is fire, once the photo slection updated sucessfully
  //navagate to photo
  const onSaveSelectedPotoes = (slecetedPhotList: Array<Photo>) => {
    history.push(NavigationPaths.PhotoGrid);
  };

  return (
    <div>
      <Gallery
        photoList={photoList}
        setPhotoList={setPhotoList}
        onSaveSelectedPotoes={onSaveSelectedPotoes}
        isEditView={true}
      ></Gallery>
      <Backdrop open={isLoading}></Backdrop>
    </div>
  );
}
