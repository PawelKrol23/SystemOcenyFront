import { useEffect } from "react";
import { useSOP } from "../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import UserPageLayout from "../../../Layout/UserPageLayout/UserPageRootLayout";
import { SideBar } from "../../../Components";
import UserContainer from "../../../Components/UserContainer/UserContainer";

export function UserMainPage() {
  const { logout, isLoggedIn, getUserSession } = useSOP();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const userSession = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userSession="));

    if (!userSession) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const userSession = getUserSession();

  return (
    <UserPageLayout>
      <div></div>
    </UserPageLayout>
  );
}
