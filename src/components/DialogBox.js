import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  GridListTile,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  dialog: (props) => {
    return {
      position: "absolute",
      width: "250px",
      top: props.current.getBoundingClientRect().top + "px",
      left: props.current.getBoundingClientRect().x - 150 + "px"
    };
  },
  dialogButton: {
    boxShadow: "2px 2px rgba(0,0,0,0.1), -2px -2px rgba(0,0,0,0.1)",
    margin: "5px",
    border: "0px solid #fff",
    borderRadius: "10px"
  },
  activeButton: {
    backgroundColor: "#E1EAE2",
    boxShadow: "1px 1px rgba(0,0,0,0.1), -1px -1px rgba(0,0,0,0.1)",
    margin: "5px",
    border: "0px solid #fff",
    borderRadius: "10px"
  }
}));
export default function DialogBox({
  list,
  openBox,
  setOpenBox,
  type,
  setType,
  pos
}) {
  const classes = useStyles(pos);
  return (
    <Dialog
      open={openBox}
      onClose={() => setOpenBox(false)}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle>Choose Type</DialogTitle>
      <Divider />
      <DialogContent>
        <GridListTile>
          {list.map((item) => (
            <Button
              onClick={() => {
                setOpenBox(false);
                setType(item.value);
              }}
              className={
                item.value === type
                  ? classes.activeButton
                  : classes.dialogButton
              }
            >
              <Typography key={item.label}>{item.label}</Typography>
            </Button>
          ))}
        </GridListTile>
      </DialogContent>
    </Dialog>
  );
}
