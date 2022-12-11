import { Divider, Drawer, List, ListItem, makeStyles } from "@material-ui/core";
import GenreList from "../ListFiles/GenreList.json";

const useStyles = makeStyles({
  listTypo: {
    cursor: "pointer",
    margin: "0 10px"
  },
  activeTypo: {
    cursor: "pointer",
    margin: "0 10px",
    background: "#e3dfde"
  }
});
export default function ListDrawer({ open, setOpen, selected, setSelected }) {
  const isActive = (value) => {
    let active = selected.find((item) => item === value);
    if (active === undefined) return false;
    return true;
  };
  const setActive = (value) => {
    const arr = selected;
    arr.push(value);
    setSelected(arr);
  };
  const deActive = (value) => {
    setSelected(selected.filter((item) => item.value !== value));
  };
  const classes = useStyles();
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      variant="temporary"
      anchor="right"
    >
      <h2>Genre</h2>
      {GenreList.map((item) => (
        <div
          className={
            isActive(item.value) ? classes.activeTypo : classes.listTypo
          }
          onClick={() => {
            isActive(item.value) ? deActive(item.value) : setActive(item.value);
          }}
        >
          <Divider />
          <List>
            <ListItem>
              <h4>{item.label}</h4>
            </ListItem>
          </List>
        </div>
      ))}
    </Drawer>
  );
}
