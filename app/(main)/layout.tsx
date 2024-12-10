import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthProvider } from "@/provider/AuthContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
