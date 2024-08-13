import React from "react";
import { Input } from "@fluentui/react-components";

type SearchFilterProps = {
  onChange: (value: string) => void;
  value: string;
};

const SearchFilter: React.FC<SearchFilterProps> = ({ onChange, value }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        style={{ padding: "5px", margin: "25px 0px 25px 5px" }}
      ></Input>
    </div>
  );
};

export default SearchFilter;
