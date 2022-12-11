import { useEffect, useState, useRef } from "react";
import axios from "axios";
import SearchList from "./SearchList.js";
import DialogBox from "./DialogBox.js";
import {
  FormControlLabel,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TopTypes from "../ListFiles/TopTypes";
import NextPage from "./NextPage";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    height: "60px",
    width: "100%"
  }
});

export default function TopList() {
  const [result, setResult] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const typeRef = useRef(null);
  const handleOpen = () => {
    if (!clicked) setClicked(true);
    setOpen(true);
  };
  useEffect(() => {
    const request = async () => {
      var List;
      if (type !== "")
        List = await axios.get(
          `https://api.jikan.moe/v4/top/anime`,
          {
            params:
            {
              page,
              type
            }
          }
        );
      else List = await axios.get(`https://api.jikan.moe/v4/top/anime`, {params: {page:page}});
      setResult(List.data.data);
    };
    request();
  }, [type, page]);
  const handlePageChange = (x) => {
    setPage(x);
  };
  let ref = useRef();
  let handleScroll=()=>{
    ref.current.scrollIntoView();
  }
  const classes = useStyles();
  return (
    <div ref={ref}>
      <div className={classes.container}>
        <Typography variant="h6" style={{ margin: "10%" }}>
          Top Anime List
        </Typography>
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
            list={TopTypes}
            openBox={open}
            setOpenBox={setOpen}
            type={type}
            setType={setType}
            pos={typeRef}
          />
        ) : null}
      </div>
      <div style={{ margin: "5px" }}>
        <SearchList result={result} rank={true} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NextPage
          current={page}
          total={100}
          handlePageChange={handlePageChange}
          handleScroll={handleScroll}
        />
      </div>
    </div>
  );
}
