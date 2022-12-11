import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ContentHolder from "../../components/ContentHolder";
import NextPage from "../../components/NextPage";
import "../Review.css";

const useStyle = makeStyles({
  content: {
    width: "100%",
    background: "#fff"
  }
});
export default function Review() {
  const [review, setReview] = useState([]);
  let [page, setPage] = useState(1);
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
        `https://api.jikan.moe/v4/anime/${id}/reviews`,
        {
          params: {
            page
          }
        }
      );
      setReview(rev.data.data);
    };
    request();
  }, [page]);
  const handlePageChange = (x) => {
    setPage(x);
  };
  const classes = useStyle();

  let ref = useRef();
  let handleScroll=()=>{
    ref.current.scrollIntoView();
  }

  return (
    <div className={classes.content} ref={ref}>
      {review !== undefined
        ? review.map((item, index) => (
          <div key={index} className="container">
            <div className="details">
              <div className="mainInfo">
                <Avatar
                  src={item.user.images.jpg.image_url}
                  alt={item.user.username}
                  style={{
                    margin: "5px 10px",
                    width: "60px",
                    height: "60px"
                  }}
                />
                <div className="userInfo">
                  <h4 className="userName">{item.user.username}</h4>
                  <p style={{ fontSize: "14px" }}>
                    <span style={{ fontWeight: "700" }}>
                      {item.helpful_count}
                    </span>{" "}
                    people found this helpful
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Overall{" "}
                    <span style={{ fontWeight: "700" }}>
                      {item.score}
                    </span>
                    /10
                  </p>
                </div>
              </div>
            </div>
            <div className="content">
              <ContentHolder content={item.review.replace(/\\n/g, "")}></ContentHolder>
            </div>
          </div>
        ))
        : null}

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
