import {
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./Backdrop.css";

interface BackDropProps {
  open: boolean;
}
export default function BackDrop(props: BackDropProps) {
  const classes = useStyles();
  const { open } = props;
  return (
    <div>
      <Backdrop className={classes.backDrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
