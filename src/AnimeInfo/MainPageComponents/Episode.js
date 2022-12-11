import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import NextPage from "../../components/NextPage";
import "./Table.css";

export default function Episdoe({ total }) {
  const [ep, setEp] = useState([]);
  const [page, setPage] = useState(1);
  const getId = (path) => {
    let i = 12,
      l = 11;
    while (path[i] !== "/") {
      i++;
    }
    return path.substring(l, i);
  };
  let ref = useRef();
  const history = useHistory();
  const path = history.location.pathname;
  const id = getId(path);
  useEffect(() => {
    const request = async () => {
      const epi = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/episodes`,{
          params:{
            page
          }
        }
      );
      setEp(epi.data.data);
    };
    request();
  }, [page]);
  const handlePageChange = (x) => {
    setPage(x);
  };

  let getDate=(formated_Date)=>{
      const date = new Date(formated_Date);
      return `${date.getDate()}/${date.getMonth() +1 }/${date.getYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  let handleScroll=()=>{
    ref.current.scrollIntoView();
  }
  return (
    <div ref = {ref}>
      <table>
        <tbody>
        {ep.map((item) => (
          <tr key={item.episode_id}>
            <td style={{ textAlign: "center" }}>{item.episode_id}</td>
            <td>
              <div>
                <h3>{item.title}</h3>
              </div>
              <p>
                Aired-{getDate(item.aired)} {item.filler ? "Filler" : null}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      <div style={{ display: "flex", justifyContent:'center' }}>
          <NextPage
            current={page}
            total={Math.ceil(total / 100)}
            handlePageChange={handlePageChange}
            handleScroll={handleScroll}
          />
      </div>
    </div>
  );
}
