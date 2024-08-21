import React from "react";
import { cn } from "../../components/utils";
const SquareElem2 = ({
  booked = false,
  selected = false,
  row,
  column,
}: {
  booked?: boolean;
  selected?: boolean;
  row: number;
  column: number;
}) => {
  return (
    <div
      className={cn(
        "w-7 transition-all h-7 border border-black/50 dark:border-white rounded shadow-md cursor-pointer hover:bg-green-600",
        booked ? "bg-gray-200 shadow-inner border-0" : "",
        selected
          ? "bg-primary-500  dark:bg-white p-1 border-0 shadow-black/30 shadow-lg"
          : ""
      )}
    >
      {/* {`R${row} C${column}`}{" "} */}
    </div>
  );
};

export default SquareElem2;
