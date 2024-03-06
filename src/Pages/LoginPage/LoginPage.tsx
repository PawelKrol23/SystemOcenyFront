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
          height: "100vh",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
}
