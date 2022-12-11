import {
  FormControlLabel,
  IconButton,
  InputBase,
  makeStyles,
  Paper
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TypeList from "../ListFiles/TypeList.json";
import SearchList from "./SearchList.js";
import DialogBox from "./DialogBox";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    padding: "2px 4px",
    width: "50%"
  },
  container: {
    backgroundColor: "#D3D3D3",
    height: "60px",
    display: "flex",
    alignItems: "center",
    width: "100%"
  }
});
const SearchPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [finalTerm, setFinalTerm] = useState(term);
  const [result, setResult] = useState([]);
  const [type, setType] = useState("all");
  const [clicked, setClicked] = useState(false);
  const typeRef = useRef(null);
  const handleOpen = () => {
    if (!clicked) setClicked(true);
    setOpen(true);
  };
  useEffect(() => {
    const requestSearch = async () => {
      const List = await axios.get(
        `https://api.jikan.moe/v4/anime`,
        {
          params:
          {
            q: finalTerm,
            type,
            page: 1
          }
        }
      );
      setResult(List.data.data);
    };
    if (finalTerm !== "") requestSearch();
  }, [finalTerm, type]);
  return (
    <div>
      <div className={classes.container}>
        <Paper
          component="form"
          className={classes.root}
          onSubmit={(event) => {
            event.preventDefault();
            setFinalTerm(term);
          }}
        >
          <InputBase
            placeholder="Search anime"
            style={{ width: "90%" }}
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          ></InputBase>
          <IconButton
            onClick={() => {
              setFinalTerm(term);
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            label="type"
            control={
              <IconButton
                ref={typeRef}
                onClick={handleOpen}
                style={{ padding: "5px" }}
              >
                <PlayArrowIcon />
              </IconButton>
            }
          />
        </div>
        {clicked ? (
          <DialogBox
            list={TypeList}
            openBox={open}
            setOpenBox={setOpen}
            type={type}
            setType={setType}
            pos={typeRef}
          />
        ) : null}
      </div>
      <div style={{ margin: "5px" }}>
        <SearchList
          result={result}
          rank={false}
        />
      </div>
    </div>
  );
};
export default SearchPage;
