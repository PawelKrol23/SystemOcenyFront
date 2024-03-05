import { ReactNode } from 'react';

interface UserPageLayoutProps {
  children: ReactNode;
}

export default function UserContainer({ children }: UserPageLayoutProps) {
 return (
  <div className="UserContainer" style={{
    display: "flex",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    flexDirection: "column",
  }}>
    {children}
  </div>
 );
}
