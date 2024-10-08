import { FaBan } from "react-icons/fa6";

export default function GreyBan() {
    return (
      <span className="me-1 position-relative">
        <FaBan style={{ top: "2px" }}
          className="text-success me-1 position-absolute fs-5" />
        <FaBan className="text-white me-1 fs-6" />
      </span>
  );}
  