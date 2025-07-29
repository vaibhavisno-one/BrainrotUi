import { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/layout/footer";

export const metadata:Metadata = {
    title:{
        template : "brainrotUI",
        default:"brainrotUi"
    }
}


export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="relative w-full pt-0 md:pt-0 bg-white dark:bg-black">
                {children}
            </main>
            <Footer />
        </>
    );
}