import { useNavigate } from "react-router-dom";
import "./BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back">
      <span onClick={() => navigate(-1)}>← Indietro</span>
    </button>
  );
}
