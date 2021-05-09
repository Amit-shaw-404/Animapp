import { IconButton } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import { useState } from "react";

export default function NextPage({ current, total, handlePageChange }) {
  const handleNext = () => {
    if (current !== total) {
      handlePageChange(current + 1);
    }
  };
  const handlePrev = () => {
    if (current !== 1) {
      handlePageChange(current - 1);
    }
  };
  return (
    <div>
      <IconButton
        onClick={() => {
          handlePrev();
        }}
      >
        <NavigateNextIcon style={{ transform: "rotate(180deg)" }} />
      </IconButton>
      <IconButton
        onClick={() => {
          handleNext();
        }}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}
