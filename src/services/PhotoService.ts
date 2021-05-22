import { Photo } from "../model/Photo";
import { UserPhoto } from "../model/UserPhoto";
import { AxiosConfig, AmazonConfig } from "./config/AxioConfig";

const getAllUserPhotoes = async (
  successCallback: (photoData: UserPhoto) => void,
  errorCallback: (error: Error) => void
) => {
  try {
    const resp = await AmazonConfig.get(
      "/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json"
    );
    successCallback(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
    errorCallback(err);
  }
};

const getSelectedPhotoes = async (
  successCallback: (savedPhotoList: Array<Photo>) => void,
  errorCallback: (error: Error) => void
) => {
  try {
    const resp = await AxiosConfig.get("/getSelectedPhotoes");
    successCallback(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
    errorCallback(err);
  }
};

const saveSelectedPhotoes = async (
  selectedPhotoList: Array<Photo>,
  successCallback: (updatedPhotoList: Array<Photo>) => void,
  errorCallback: (error: Error) => void
) => {
  try {
    const resp = await AxiosConfig.post(
      "/updateSelectedPhotoes",
      selectedPhotoList
    );
    successCallback(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
    errorCallback(err);
  }
};

export const PhotoService = {
  getAllUserPhotoes,
  saveSelectedPhotoes,
  getSelectedPhotoes,
};
