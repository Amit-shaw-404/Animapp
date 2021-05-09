import { GridListTile, GridListTileBar } from "@material-ui/core";

export default function Cards({ char_img, actor_img, char_name, actor_name }) {
  return (
    <div style={{ height: "100%" }}>
      <GridListTile
        style={{ height: "49%", paddingBottom: "1%", paddingRight: "2%" }}
      >
        <img src={char_img} alt={char_name} />
        <GridListTileBar title={char_name} />
      </GridListTile>
      <GridListTile
        style={{ height: "49%", paddingTop: "1%", paddingRight: "2%" }}
      >
        <img src={actor_img} alt={actor_name} />
        <GridListTileBar title={actor_name} />
      </GridListTile>
    </div>
  );
}
