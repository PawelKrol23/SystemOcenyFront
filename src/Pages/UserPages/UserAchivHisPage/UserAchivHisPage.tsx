import { AddButton, UserAchivHisTable } from "../../../Components";
import UserPageLayout from "../../../Layout/UserPageLayout/UserPageRootLayout";
import { colors } from "../../../Theme/variables";

export function UserAchivHisPage() {

  return (
    <UserPageLayout>
      <div className="UserAchivHisTable" style={{
        margin: "40px 0",
        color: colors.secondary,
      }}>
        <p style={{
          fontWeight: "bold",
          fontSize: "2rem",
          marginLeft: "20px",
          
        }}>Osiągnięcia</p>
        <p style={{
          marginLeft: "50px",          
        }}>Historia Osiągnięć</p>
      </div>
      <UserAchivHisTable></UserAchivHisTable>
      <AddButton/>
    </UserPageLayout>
  );
}
