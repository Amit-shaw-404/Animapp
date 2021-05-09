import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
const useStyle = makeStyles({
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    fontSize: "2rem"
  }
});
export default function SearchList({ result, rank }) {
  const theme = useTheme();
  const col2 = useMediaQuery(theme.breakpoints.only("xs"));
  const col3 = useMediaQuery(theme.breakpoints.only("sm"));
  const col5 = useMediaQuery(theme.breakpoints.only("lg"));
  const classes = useStyle();
  return (
    <GridList
      cellHeight={350}
      cols={col2 ? 2 : col3 ? 3 : col5 ? 6 : 4}
    >
      {result.length > 0
        ? result.map((item) => (
            <GridListTile key={item.mal_id}>
              <img src={item.image_url} alt={item.title} />
              {rank ? (
                <GridListTileBar
                  title={
                    <Typography variant="h5">{`#${item.rank}`}</Typography>
                  }
                  titlePosition="top"
                  className={classes.titleBar}
                />
              ) : null}
              <GridListTileBar
                title={item.title}
                subtitle={`Rating: ${item.score}`}
                actionIcon={
                  <Link to={`/animeinfo/${item.mal_id}`}>
                    <IconButton>
                      <InfoIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </Link>
                }
              />
            </GridListTile>
          ))
        : ""}
    </GridList>
  );
}
