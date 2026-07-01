import { AdminSidebar } from "./AdminSidebar";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-[#f5f8f1] text-[#14213d] lg:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-5 py-8 lg:px-8">{children}</main>
    </div>
  );
}
