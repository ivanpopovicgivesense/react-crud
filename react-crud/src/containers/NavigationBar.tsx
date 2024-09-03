import React, { useState } from "react";
import { Text, makeStyles } from "@fluentui/react-components";
import {
  HomeRegular,
  CalendarRegular,
  SignOutRegular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  sidebar: {
    width: "200px",
    height: "100%",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  },
  item: {
    cursor: "pointer",
    padding: "10px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#e1e1e1",
    },
  },
  activeItem: {
    backgroundColor: "#d1eaff",
    "&:hover": {
      backgroundColor: "#b0d4ff",
    },
  },
  logout: {
    marginTop: "auto",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#e1e1e1",
    },
  },
  separator: {
    height: "1px",
    backgroundColor: "#dcdcdc",
    margin: "10px 0",
  },
});

const sidebarItems = [
  { key: "home", icon: <HomeRegular />, text: "Dashboard" },
  {
    key: "calendar",
    icon: <CalendarRegular />,
    text: "Calendar",
  },
];

const NavigationBar = () => {
  const [activeItem, setActiveItem] = useState<string>("home");
  const classes = useStyles();
  const navigate = useNavigate();

  const handleItemClick = (key: string) => {
    setActiveItem(key);
    if (key === "calendar") navigate("/calendar");
  };

  return (
    <div className={classes.sidebar}>
      {sidebarItems.map((item) => (
        <div
          key={item.key}
          className={`${classes.item} ${
            activeItem === item.key ? classes.activeItem : ""
          }`}
          onClick={() => handleItemClick(item.key)}
        >
          {item.icon}
          <Text>{item.text}</Text>
        </div>
      ))}
      <div className={classes.separator} />
      <div className={classes.logout} onClick={() => navigate("logout")}>
        <SignOutRegular />
        <Text>Log Out</Text>
      </div>
    </div>
  );
};

export default NavigationBar;
