import { LoginForm } from "../../Components/";
import { LoginHeader } from "../../Components/LoginHeader/LoginHeader.tsx";

export function LoginPage() {
  return (
    <>
      <LoginHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 100px)",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
}
