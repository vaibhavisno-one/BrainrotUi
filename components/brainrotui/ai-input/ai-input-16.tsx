"use client";

import { useState, useRef, useCallback, type RefObject } from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, Wand2, Search, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";

const COMMANDS = [
    {
        id: "chat",
        label: "Chat",
        description: "Start a conversation",
        icon: MessageSquare,
        prefix: "/chat",
    },
    {
        id: "generate",
        label: "Generate",
        description: "Generate code or content",
        icon: Wand2,
        prefix: "/generate",
    },
    {
        id: "analyze",
        label: "Analyze",
        description: "Analyze code or text",
        icon: Search,
        prefix: "/analyze",
    },
];

export default function AIInput_16() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCommand, setActiveCommand] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");

    useClickOutside(containerRef as RefObject<HTMLElement>, () => {
        if (isOpen) setIsOpen(false);
    });

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!inputValue.trim() && !activeCommand) return;

                setInputValue("");
                setActiveCommand(null);
            }

            if (e.key === "Backspace" && inputValue === "" && activeCommand) {
                setActiveCommand(null);
            }
        },
        [activeCommand, inputValue]
    );

    const handleCommandSelect = (commandId: string) => {
        const command = COMMANDS.find((cmd) => cmd.id === commandId);
        if (command) {
            setInputValue("");
            setActiveCommand(commandId);
            setIsOpen(false);
            inputRef.current?.focus();
        }
    };

    const handleButtonClick = () => {
        if (!inputValue.trim() && !activeCommand) return;
        setInputValue("");
        setIsOpen(false);
        setActiveCommand(null);
    };

    return (
        <div className="w-full py-4 min-h-[244px]">
            <div className="relative" ref={containerRef}>
                <div className="relative rounded-lg bg-black/5 dark:bg-white/5">
                    <div className="flex items-center flex-wrap gap-2 px-3 h-auto min-h-[48px] py-2">
                        {activeCommand &&
                            (() => {
                                const activeCmd = COMMANDS.find(
                                    (cmd) => cmd.id === activeCommand
                                );
                                if (!activeCmd) return null;

                                return (
                                    <div className="flex items-center gap-2 text-sm bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md">
                                        <span className="flex items-center gap-1.5 shrink-0">
                                            <activeCmd.icon className="w-4 h-4 text-black/50 dark:text-white/50" />
                                            <span className="text-black/70 dark:text-white/70">
                                                {activeCmd.label}
                                            </span>
                                        </span>
                                    </div>
                                );
                            })()}
                        <div className="flex-1 flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => !activeCommand && setIsOpen(true)}
                                placeholder={
                                    activeCommand
                                        ? "Type your message..."
                                        : "Type / for commands..."
                                }
                                className="flex-1 bg-transparent border-none outline-hidden text-md text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60"
                            />
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                className={cn(
                                    "p-1.5 rounded-md transition-colors shrink-0",
                                    inputValue || activeCommand
                                        ? "bg-sky-500/15 text-sky-500"
                                        : "text-black/50 dark:text-white/50 hover:text-black/70 dark:hover:text-white/70"
                                )}
                            >
                                <SendHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && !activeCommand && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute w-full mt-2 rounded-lg bg-black/5 dark:bg-white/5 shadow-lg overflow-hidden"
                        >
                            <Command className="w-full">
                                <Command.List className="py-2">
                                    {COMMANDS.map((command) => (
                                        <Command.Item
                                            key={command.id}
                                            onSelect={() =>
                                                handleCommandSelect(command.id)
                                            }
                                            className="px-3 py-2.5 flex items-center gap-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer group"
                                        >
                                            <command.icon className="w-4 h-4 text-black/50 dark:text-white/50 group-hover:text-black/70 dark:group-hover:text-white/70" />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-black/70 dark:text-white/70">
                                                    {command.label}
                                                </span>
                                                <span className="text-xs text-black/50 dark:text-white/50">
                                                    {command.description}
                                                </span>
                                            </div>
                                            <span className="ml-auto text-xs text-black/30 dark:text-white/30">
                                                {command.prefix}
                                            </span>
                                        </Command.Item>
                                    ))}
                                </Command.List>
                            </Command>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
