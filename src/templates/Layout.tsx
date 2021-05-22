import {
  AppBar,
  Button,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Layout.css";
import translation from "../i18n/i18.json";
import { useHistory } from "react-router-dom";
import { NavigationPaths } from "../constants/AppConatants";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Layout(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = [
    translation.header_toolbar_edit_btn_text,
    translation.header_toolbar_goalbum_btn_text,
  ];
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event:any) => {
      if(event.currentTarget.value == 0){
        history.push(NavigationPaths.PhotoSeletion);
      }
      else {
        history.push(NavigationPaths.PhotoGrid);
      }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="flex-end"
            spacing={2}
            alignItems="center"
            color="primary"
          >
            <Grid item>
                    <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option}  onClick={handleMenuItemClick}>
            {option}
          </MenuItem>
        ))}
      </Menu>
              {/* {!isEditVisible && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => handleEditClick(e)}
                >
                  {translation.header_toolbar_edit_btn_text}
                </Button>
              )}
              {isEditVisible && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => handleGoToAlbumClick(e)}
                >
                  {translation.header_toolbar_goalbum_btn_text}
                </Button>
              )} */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </div>
      {/* <div>
                <div/>
                {props.children}   
            </div>    */}
    </div>
  );
}
