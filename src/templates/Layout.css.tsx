import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        //padding:'25px 15px 24px 90px',
      },
    toolbar: theme.mixins.toolbar,

}));

export default  useStyles;