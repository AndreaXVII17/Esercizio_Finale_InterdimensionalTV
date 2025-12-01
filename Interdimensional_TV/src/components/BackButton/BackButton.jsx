import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import backArrow from "../../assets/back_arrow_icon.png";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <>
      <div className="backdrop-overlay" />

      <button
        type="button"
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label="Torna indietro"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <img
          src={backArrow}
          alt="Torna indietro"
          style={{
            width: "40px",
            height: "40px",
          }}
        />
      </button>
    </>
  );
}
