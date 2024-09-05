import { Calendar } from "@fluentui/react-calendar-compat";
import { useNavigate } from "react-router-dom";
import { ArrowCircleLeftFilled } from "@fluentui/react-icons";
const CalendarComponent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linearGradient(135deg, #e2e2e2, #ffffff)",
      }}
    >
      <div>
        <ArrowCircleLeftFilled
          style={{
            color: "#0F6CBD",
            marginBottom: "20px",
            fontSize: "48px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        ></ArrowCircleLeftFilled>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
          padding: "24px",
          maxWidth: "450px",
          width: "100%",
          border: "1px solid #dcdcdc",
        }}
      >
        <Calendar showGoToToday={false}></Calendar>
      </div>
    </div>
  );
};

export default CalendarComponent;
