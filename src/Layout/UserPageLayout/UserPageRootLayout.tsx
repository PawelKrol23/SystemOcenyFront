import { ReactNode} from 'react';
import { SideBar } from '../../Components';
import UserContainer from '../../Components/UserContainer/UserContainer';
import UserHeader from '../../Components/UserHeader/UserHeader';

interface UserPageLayoutProps {
  children: ReactNode;
}

export default function UserPageRootLayout({ children }: UserPageLayoutProps) {

  return (
    <div className="Container" style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    }}>
      <SideBar></SideBar>
      <UserContainer>
        <UserHeader></UserHeader>
        {children}
      </UserContainer>
    </div>
  );
}
