import React from "react";
import { Select, Label } from "@fluentui/react-components";
import "./App.css";

type Data = {
  id: string;
  Name: string;
  Surname: string;
  UserType: string;
  CreatedDate: string;
  City: string;
  Address: string;
};

type FilterByUserTypeProps = {
  data: Data[];
  selectedUserType: string;
  onChange: (value: string) => void;
};

const FilterByUserType: React.FC<FilterByUserTypeProps> = ({
  data,
  selectedUserType,
  onChange,
}) => {
  const userTypes = Array.from(new Set(data.map((item) => item.UserType)));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Label>Filter by User Type</Label>
      <Select
        onChange={(e) => onChange(e.target.value)}
        value={selectedUserType}
      >
        <option value="">All</option>
        {userTypes.map((userType) => (
          <option key={userType} value={userType}>
            {userType}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default FilterByUserType;
