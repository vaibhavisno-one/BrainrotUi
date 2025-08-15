"use client";

import { useState } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Flame } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fixed top-6 inset-x-0  z-50 flex justify-center ">
      <div className="max-w-5xl w-full px-4 ">
        
          


          {/* Center - Nav Menu (like Aceternity style) */}
          <div className="flex-1 flex justify-center ">
            <Menu setActive={setActive}>
              {/* Left - Brand */}
              <Link href="/" className="flex items-center gap-2 text-white font-semibold">
                <Flame className="w-5 h-5 text-green-500" />
                <span className="dark:text-white text-black">BrainrotUi</span>
              </Link>

              <MenuItem setActive={setActive} active={active} item="Components">
                <div className="flex flex-col space-y-4  text-sm ">
                  <HoveredLink href="/docs/components/background-paths">Background Paths</HoveredLink>
                  <HoveredLink href="/docs/components/action-search-bar">Action Search Bar</HoveredLink>
                  <HoveredLink href="/docs/components/cards">Cards</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Templates">
                <div className="grid grid-cols-2 gap-6 p-4 text-sm">
                  <ProductItem
                    title="AlphaQuery"
                    href="https://alpha-query.vercel.app/"
                    src="/AlphaQuery.png"
                    description="Your one stop solution for every problem"
                  />
                  <ProductItem
                    title="ProjGen"
                    href="https://www.npmjs.com/package/projgen-cli"
                    src="/Projgen.png"
                    description="The User friendly project organisation tool"
                  />
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Pricing">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/pricing">Hobby</HoveredLink>
                  <HoveredLink href="/individual">Individual</HoveredLink>
                  <HoveredLink href="/team">Team</HoveredLink>
                  <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                </div>
              </MenuItem>
              {/* Right - Theme Toggle */}
          <div className="ml-4">
            <ThemeToggle />
          </div>
            </Menu>
          </div>

          
        
      </div>
    </div>
  );
}
