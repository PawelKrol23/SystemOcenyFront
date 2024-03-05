import { LoginForm } from "../../Components/LoginForm/LoginForm";

export function LoginPage() {
  return (
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
  );
}