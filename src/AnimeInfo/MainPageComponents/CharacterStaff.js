import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Review.css";

const useStyle = makeStyles({
  content: {
    width: "100%",
    background: "#fff"
  },
  main: {
    display: "flex"
  },
  left: {
    width: "50%",
    display: "flex"
  },
  right:{
    width:'50%',
    display:'flex',
    textAlign:'right'
  },
  info: {
    fontFamily: "lato",
    width: "75%",
    margin:'5% 2% 5% 2%'
  },
  img: {
    width: "25%"
  }
});
export default function CharacterStaff() {
  const classes = useStyle();
  const [char, setChar] = useState([]);
  const getId = (path) => {
    let i = 12,
      l = 11;
    while (path[i] !== "/") {
      i++;
    }
    return path.substring(l, i);
  };
  const history = useHistory();
  const path = history.location.pathname;
  const id=getId(path);
  useEffect(() => {
    const request = async () => {
      const s = await axios.get(
        `https://api.jikan.moe/v3/anime/${id}/characters_staff`
      );
      setChar(s.data.characters);
      // console.log(s.data.characters[0].voice_actors[0].image_url);
    };
    request();
  }, []);
  const handleSource = (VA) => {
    let str = VA.map((item, index) => (index === 0 ? item.image_url : null));
    return str[0];
  };
  return (
    <div className={classes.content}>
      <table>
        <tbody>
        {char.map((item) => (
          <tr key={item.name}>
            <td>
              <div className={classes.main}>
                <div className={classes.left}>
                  <div className={classes.img}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      width="100%"
                    ></img>
                  </div>
                  <div className={classes.info}>
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
                <div className={classes.right}>
                  <div className={classes.info}>
                    <h4>
                      {item.voice_actors.map((VA, index) =>
                        index === 0 ? VA.name : null
                      )}
                    </h4>
                    <p>
                      {item.voice_actors.map((VA, index) =>
                        index === 0 ? VA.language : null
                      )}
                    </p>
                  </div>
                  <div className={classes.img}>
                    <img
                      src={handleSource(item.voice_actors)}
                      alt={item.voice_actors.map((VA, index) =>
                        index === 0 ? VA.name : null
                      )}
                      width="100%"
                    ></img>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}
