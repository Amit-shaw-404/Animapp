import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Review.css";

const useStyle = makeStyles({
  content: {
    width: "100%",
    background: "#fff"
  }
});
export default function Review() {
  const [review, setReview] = useState([]);
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
  const id = getId(path);
  useEffect(() => {
    const request = async () => {
      const rev = await axios.get(
        `https://api.jikan.moe/v3/anime/${id}/reviews`
      );
      setReview(rev.data.reviews);
    };
    request();
  }, []);
  const classes = useStyle();
  return (
    <div className={classes.content}>
      {review !== undefined
        ? review.map((item, index) => (
            <div key={index} className="container">
              <div className="details">
                <div className="mainInfo">
                  <Avatar
                    src={item.reviewer.image_url}
                    alt={item.reviewer.username}
                    style={{
                      margin: "5px 10px",
                      width: "60px",
                      height: "60px"
                    }}
                  />
                  <div className="userInfo">
                    <h4 className="userName">{item.reviewer.username}</h4>
                    <p style={{ fontSize: "14px" }}>
                      <span style={{ fontWeight: "700" }}>
                        {item.helpful_count}
                      </span>{" "}
                      people found this helpful
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Overall{" "}
                      <span style={{ fontWeight: "700" }}>
                        {item.reviewer.scores.overall}
                      </span>
                      /10
                    </p>
                  </div>
                </div>
              </div>
              <div className="content">
                <p>{item.content.replace(/\\n/g,"")}</p>{" "}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
