import { AdminSidebar } from "./AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f5f8f1] text-[#14213d] lg:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-5 py-8 lg:px-8">{children}</main>
    </div>
  );
}
