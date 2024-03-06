import PbLogo from "../../Assets/PbLogo.png";

export const LoginHeader = () => {
  return (
    <header style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
      padding: "1rem",
      backgroundColor: "#012404",
      margin: "0",
    }}>
      <img src={PbLogo} alt={"pb logo"} />
    </header>
  )
}
