import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Rate({
  value,
  setValue,
}: {
  value: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Rating
      name="half-rating"
      value={value}
      onChange={(event, newValue) => {
        setValue && setValue(newValue as number);
      }}
      precision={0.5}
    />
  );
}
