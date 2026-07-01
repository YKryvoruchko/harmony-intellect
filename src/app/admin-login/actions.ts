"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  deleteAdminSession,
  verifyAdminCredentials,
} from "@/lib/adminAuth";

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const rememberMe = formData.get("rememberMe") === "on";

  if (!verifyAdminCredentials(username, password)) {
    redirect("/admin-login?error=1");
  }

  await createAdminSession(rememberMe);
  redirect("/admin");
}

export async function logoutAdmin() {
  await deleteAdminSession();
  redirect("/admin-login");
}
