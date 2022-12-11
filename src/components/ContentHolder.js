import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import "../AnimeInfo/Review.css"

const useStyle = makeStyles({
    content: {
      width: "100%",
      background: "#fff"
    }
  });

export default function ContentHolder({content}){
    let [showAll, setShowAll] = useState(false);
    return (
        <div style={{width:'100%'}}>
            <div className={`content ${!showAll? "text":""}`}>
                {content}
            </div>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                {!showAll && 
                <p style={{cursor:'pointer'}} onClick={()=>setShowAll(true)}>Show More...</p>}
                {showAll && 
                <p style={{cursor:'pointer'}} onClick={()=>setShowAll(false)}>Show Less...</p>}
            </div>
        </div>
    )
}