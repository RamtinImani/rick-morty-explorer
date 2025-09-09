import { LoaderIcon } from "react-hot-toast";

export default function Loader() {
  return (
    <div
      style={{
        color: "var(--primary-600)",
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        margin: "1rem auto",
      }}
    >
      <p className="loader">Loading</p>
      <LoaderIcon style={{ width: "2rem", height: "2rem" }} />
    </div>
  );
}
