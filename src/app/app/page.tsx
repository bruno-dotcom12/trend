import { redirect } from "next/navigation";

// /app entra direto no painel.
export default function AppIndex() {
  redirect("/app/dashboard");
}
