import {
  Badge,
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Photo } from "../../model/Photo";
import useStyles from "./Gallery.css";
import translation from "../../i18n/i18.json";
import { AppInfoType, UtilConstants } from "../../constants/AppConatants";
import InfoDisplay from "../InfoDisplay/InfoDisplay";
import Backdrop from "../BackDrop/Backdrop";
import { PhotoService } from "../../services/PhotoService";

//Galllery Props
interface GalleryProps {
  photoList: Array<Photo>;
  setPhotoList: any;
  onSaveSelectedPotoes: any;
  isEditView: boolean;
}

export default function Gallery(props: GalleryProps) {
  const classes = useStyles();
  //diplay photoes lsist
  const { photoList, setPhotoList, onSaveSelectedPotoes, isEditView } = props;
  //user selected photoes lsist
  const [bestPhotoes, setBestPhotoes] = useState<Photo[]>([]);

  //infor message related
  const [showInforMsg, setShowInforMsg] = React.useState(false);
  const [inforSeverity, setInforSeverity] = React.useState(AppInfoType.error);
  const [inforMsg, setInforMsg] = React.useState("");
  //infor message related

  //display/hide loading
  const [isLoading, setIsLoading] = useState(false);
  //count on loaded images to show after loading all
  const [loadedPhotoesCount, setLoadedPhotoesCount] = useState(0);

  //show infro message
  const showInforMessage = (message: string, severity: AppInfoType) => {
    setInforSeverity(severity);
    setInforMsg(message);
    setShowInforMsg(true);
  };

  //upadte selected best photo collecetion
  //add, remove and reseting the order of the best photo collection
  const updateBestPhotoCollection = (slectedPhoto: Photo) => {
    let newPhotoSelection: Array<Photo> = [];
    let newPhotoList: Array<Photo> = [];
    let removedItems: Array<Photo> = [];
    //checking photo is already in the best collection
    let photoIndex = bestPhotoes.findIndex((item: Photo, index: number) => {
      return item && slectedPhoto.id === item.id;
    });
    //if already there, remove from the best selection
    if (photoIndex !== -1) {
      removedItems = bestPhotoes.slice(photoIndex, photoIndex + 1);
      bestPhotoes.splice(photoIndex, 1);
    }
    //add the photo to collection
    else {
      bestPhotoes.splice(bestPhotoes.length, 0, slectedPhoto);
    }

    //update the order of the new best collection
    newPhotoSelection = bestPhotoes.map((photo: Photo, index: number) => {
      return { ...photo, order: index + 1 };
    });

    //update the photo list with new order values
    newPhotoList = photoList.map((listPhoto: Photo, index: number) => {
      //if delected scenarioo - Remove the order from de-selcted photo
      if (
        removedItems &&
        removedItems[0] &&
        removedItems[0].id === listPhoto.id
      ) {
        return { ...listPhoto, order: 0 };
      }
      //reset the order
      let slectedPhoto = newPhotoSelection.find(
        (selectedPhoto: Photo, i: number) => {
          if (selectedPhoto.id === listPhoto.id) {
            return { ...listPhoto, order: selectedPhoto.order };
          }
        }
      );
      return slectedPhoto ? slectedPhoto! : listPhoto;
    });
    //update the slected photoes stae
    setBestPhotoes(newPhotoSelection);
    //update the gallery state
    setPhotoList(newPhotoList);
  };
  //this event will fire when click on a photo
  const handlePhotoClick = (slectedPhoto: Photo) => {
    //if max number of photoes selected already, show a message
    if (
      !slectedPhoto.order &&
      bestPhotoes &&
      bestPhotoes.length === UtilConstants.PhotoGrid_Max
    ) {
      showInforMessage(
        translation.gallery_select_max_phts_msg,
        AppInfoType.warning
      );
    } else {
      updateBestPhotoCollection(slectedPhoto);
    }
  };

  const handlePhotoOnload = (loadedPhoto: Photo) => {
    setLoadedPhotoesCount(loadedPhotoesCount + 1);
  };

  useEffect(() => {
    //when displayimg all uploaded photoes, need to show loading
    if(isEditView){
      if (photoList.length > loadedPhotoesCount) {
        setIsLoading(true);
      }
      if (photoList.length == loadedPhotoesCount) {
        setIsLoading(false);
      }
    }

  }, [loadedPhotoesCount]);

  //this is will fire when user confirm gererate best photo grid
  const handleConfirmSelection = (e: any) => {
    //save seleted photoes
    setIsLoading(true);
    PhotoService.saveSelectedPhotoes(
      bestPhotoes,
      function (updatedPhotoList: Array<Photo>) {
        setIsLoading(false);
        //call parent after saving
        if (updatedPhotoList && updatedPhotoList.length > 0) {
          onSaveSelectedPotoes(updatedPhotoList);
        }
      },
      function (error: Error) {
        setIsLoading(false);
        showInforMessage(
          translation.gallery_save_failed_msg,
          AppInfoType.error
        );
      }
    );
  };

  return (
    <div>
      {isEditView && (
        <Grid
          container
          direction="row"
          justify="space-between"
          spacing={3}
          alignItems="center"
          color="primary"
        >
          <Grid item>
            <Typography>{translation.gallery_instruction_txt}</Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={
                bestPhotoes.length == 0 ||
                bestPhotoes.length > UtilConstants.PhotoGrid_Max
              }
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleConfirmSelection(e);
              }}
            >
              {translation.gallery_create_album_btntxt}
            </Button>
          </Grid>
        </Grid>
      )}
      <GridList cellHeight={280} cols={3}>
        {photoList.map((photo) => (
          <GridListTile key={photo.id}>
            <img
              src={photo.picture}
              onClick={(e) => handlePhotoClick(photo)}
              onLoad={(e) => handlePhotoOnload(photo)}
            />
            {isEditView && (
              <GridListTileBar
                className={classes.photo_glry_titleBar}
                actionIcon={
                  <IconButton>
                    <Badge badgeContent={photo.order} color="primary"></Badge>
                  </IconButton>
                }
              />
            )}
          </GridListTile>
        ))}
      </GridList>
      <Backdrop open={isLoading}></Backdrop>
      <InfoDisplay
        open={showInforMsg}
        setOpen={setShowInforMsg}
        severity={inforSeverity}
        infoMessage={inforMsg}
      ></InfoDisplay>
    </div>
  );
}
