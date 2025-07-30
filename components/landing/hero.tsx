"use client";

import type React from "react";

import Link from "next/link";
import TailwindCSS from "@/components/icons/tailwind-css";
import { motion } from "motion/react";

import {
  PlaneTakeoff,
  BarChart2,
  Video,
  AudioLines,
  Globe,
  Diamond,
  Sparkles,
  Code,
  Layers,
} from "lucide-react";
import { Btn14 } from "../brainrotui/button/btn-14";
import Btn03 from "../brainrotui/button/btn-03";
import Input09 from "../brainrotui/input/input-09";
import AIInput_04 from "../brainrotui/ai-input/ai-input-04";

import Card08 from "../brainrotui/card/card-08";
import { BrowseBlocksButton } from "../ui/browse-blocks";
import { BrowseComponentsButton } from "../ui/browse-button";
import Features from "./features";

import Card02 from "../brainrotui/card/card-02";

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
}



export function HeroSection() {
  return (
    <div className="mx-auto w-full max-w-7xl min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 py-12 md:py-16 lg:py-20">
      {/* Left side - Title and CTA */}
      <div className="w-full lg:w-[45%] flex flex-col items-start text-left space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-100">
            Built with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-gray-500 to-neutral-500 dark:from-blue-400 dark:via-gray-400 dark:to-neutral-400">
              precision
            </span>
            <br />
             to build with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 via-gray-500 to-blue-500 dark:from-neutral-400 dark:via-gray-400 dark:to-blue-400">
              ease
            </span>
            .
          </h1>
          <p className="mt-6 text-base md:text-xl text-zinc-700 dark:text-zinc-300 max-w-lg">
            A collection of{" "}
            <span className="font-semibold"> premium UI components</span>{" "}
            crafted with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-gray-500 dark:from-blue-400 dark:to-neutral-400">
              Tailwind CSS
            </span>{" "}
            and{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-gray-500 dark:from-blue-400 dark:to-neutral-400">
              shadcn/ui
            </span>{" "}
            for modern React and Next.js applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-start w-full"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-300 pb-3 text-start flex items-center gap-2">
            <TailwindCSS className="w-4 h-4" />
            <span className="flex items-center gap-1.5">
              Now updated for Tailwind CSS 4.0!
              <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </span>
            </span>
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3">
            <BrowseComponentsButton />
            <BrowseBlocksButton />
          </div>
        </motion.div>

        <Features />
      </div>

      {/* Right side - Components Layout */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between gap-6 lg:pl-8">
        {/* Top row: Card + Action Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center"
        >
          {/* Card component */}
          <div className="w-full flex flex-col items-center justify-center ">
            
            <Card08 href="/docs/components/card" />
          </div>

          {/* Action Search Bar */}
          <div className="w-full max-w-[600px] bg-transparent">
            
            {/* <ActionSearchBar
                            actions={allActions}
                            defaultOpen={true}
                        /> */}
            <Card02 />
          </div>
        </motion.div>

        {/* Middle row: AI Chat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <div className="w-full h-48 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <AIInput_04 />
          </div>
        </motion.div>

        {/* Bottom row: Buttons on left, Input on right */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left side - Buttons */}
          <div className="w-full">
            
            <div className="w-full h-48 rounded-xl  border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-3">
              <Link href="/docs/components/button">
                <Btn14 label="Bring me" className=" w-42 py-5" />
              </Link>
              <Link href="/docs/components/button">
                <Btn03 className=" w-42 py-5" />
              </Link>
            </div>
          </div>

          {/* Right side - Input */}
          <div className="w-full">
            
            <Link href="/docs/components/input">
              <Input09 />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}