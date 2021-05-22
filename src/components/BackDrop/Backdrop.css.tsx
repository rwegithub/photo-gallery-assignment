import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  backDrop: {
    zIndex: theme.zIndex.drawer + 100000,
  },
}));

export default useStyles;
