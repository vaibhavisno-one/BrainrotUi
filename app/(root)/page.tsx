
import { Loader01 } from "@/components/brainrotui/loader/loader-01";
import { Loader02 } from "@/components/brainrotui/loader/loader-02";
import { Loader04 } from "@/components/brainrotui/loader/loader-04";
import { Loader05 } from "@/components/brainrotui/loader/loader-05";
import { Loader06 } from "@/components/brainrotui/loader/loader-06";
import { Loader03 } from "@/components/brainrotui/loader/loader-3";
import EventToast from "@/components/event-toast";
// import { ComponentShowcaseCard } from "@/components/landing/component-showcase-card";
import { HeroSection } from "@/components/landing/hero";
// import { InteractivePreview } from "@/components/landing/interactive-preview";
// import { BuildInterfacesCard } from "@/components/landing/interfaceCards";

// import { TechnologyBadges } from "@/components/landing/technology-badges";

export default function Home() {
    return (
        <main className="bg-white dark:bg-black/5 overflow-x-hidden ">
            <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-6 lg:px-4 gap-4 sm:gap-12">
                <HeroSection />
            </div>

            {/* <ComponentShowcaseCard
            className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:py-20"
            />
            <InteractivePreview/>
            <BuildInterfacesCard
            className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:py-20"
            /> */}
          
            {/* <TechnologyBadges/> */}
            <EventToast />

            <div className="flex  justify-center gap-10  ">
                <Loader01/>
                <Loader02/>
                <Loader03/>
                <Loader04/>
                <Loader05/>
                <Loader06/>
                
            </div>
        </main>
    );
}