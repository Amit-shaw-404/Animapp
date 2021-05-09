import axios from "axios";
import { useEffect, useState } from "react";
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
  const history = useHistory();
  const path = history.location.pathname;
  const id = getId(path);
  useEffect(() => {
    const request = async () => {
      const epi = await axios.get(
        `https://api.jikan.moe/v3/anime/${id}/episodes/${page}`
      );
      setEp(epi.data.episodes);
    };
    request();
  }, [page]);
  const handlePageChange = (x) => {
    setPage(x);
  };
  return (
    <div>
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
                Aired-{item.aired} {item.filler ? "Filler" : null}
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
          />
      </div>
    </div>
  );
}
