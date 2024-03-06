import { colors } from "../../Theme/variables";
import TempLogo from "../../Assets/TempLogo.png";
import TempUser from "../../Assets/TempUser.png";
import { useSOP } from "../../Context/ContextProvider"; 
import { SideBarMenu } from "..";

export const SideBar = () => {
  const { getUserSession } = useSOP();
  const userSession = getUserSession(); 

  return (
    <div className="SideBar" style={{
      width: "25vw",
      height: "100vh",
      alignSelf: "start",
      background: colors.secondary,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <img src={TempLogo} alt="Temporary Logo" style={{marginLeft: "-40px"}}/>
      {userSession && (
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            color: "white",
            fontFamily: "inherit",
            alignItems: "center",
        }}>
            <img src={TempUser} alt="Temporary User" style={{width: "65px", height: "65px", marginRight: "20px"}}/>
            <div>
                <p style={{color: "#878787", marginBottom: "-10px", fontSize: "1.2rem"}}>Witaj,</p>
                <p style={{fontWeight:"bolder"}}>{userSession.pracownik.imie} {userSession.pracownik.nazwisko}</p>
            </div>
        </div>
      )}
      <SideBarMenu></SideBarMenu>
    </div>
  );
};
