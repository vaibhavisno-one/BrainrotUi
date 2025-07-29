"use client";

import { Plus, Mic, File, Camera, X, ArrowRight } from "lucide-react";
import { useState, useRef, type RefObject } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { useFileInput } from "@/hooks/use-file-input";
import { useClickOutside } from "@/hooks/use-click-outside";

interface FileDisplayProps {
    fileName: string;
    onClear: () => void;
}

const FileDisplay = ({ fileName, onClear }: FileDisplayProps) => (
    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 w-fit px-3 py-1 rounded-lg group">
        <File className="w-4 h-4 dark:text-white" />
        <span className="text-sm dark:text-white">{fileName}</span>
        <button
            type="button"
            onClick={onClear}
            className="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
            <X className="w-3 h-3 dark:text-white" />
        </button>
    </div>
);

export default function AIInput_09() {
    const [inputValue, setInputValue] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 56,
        maxHeight: 200,
    });
    const { fileName, fileInputRef, handleFileSelect, clearFile } =
        useFileInput({ accept: "image/*", maxSize: 5 });

    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef as RefObject<HTMLElement>, () => {
        if (isMenuOpen) setIsMenuOpen(false);
    });

    const handleFileUpload = () => {
        fileInputRef.current?.click();
        setIsMenuOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setInputValue("");
            adjustHeight(true);
        }
    };

    return (
        <div className="w-full py-4">
            <div className="relative max-w-xl w-full mx-auto flex flex-col gap-2">
                {fileName && (
                    <FileDisplay fileName={fileName} onClear={clearFile} />
                )}

                <div className="relative">
                    <div
                        ref={menuRef}
                        className="absolute left-3 top-1/2 -translate-y-1/2 action-menu-container"
                    >
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-3xl bg-black/5 dark:bg-white/5 py-2 px-2 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                        >
                            <Plus className="w-4 h-4 dark:text-white" />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg py-1 min-w-[140px] z-50 border border-black/10 dark:border-white/10">
                                <button
                                    type="button"
                                    className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 text-sm dark:text-white"
                                    onClick={handleFileUpload}
                                >
                                    <File className="w-3.5 h-3.5 dark:text-white" />
                                    <span>Upload File</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 text-sm dark:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Mic className="w-3.5 h-3.5 dark:text-white" />
                                    <span>Voice Input</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 text-sm dark:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Camera className="w-3.5 h-3.5 dark:text-white" />
                                    <span>Take Photo</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />

                    <Textarea
                        id="input-09"
                        placeholder="Ask me anything!"
                        className={cn(
                            "max-w-xl bg-black/5 dark:bg-white/5 w-full rounded-3xl pl-14 pr-10 py-4 placeholder:text-black/70 dark:placeholder:text-white/70 border-none ring-black/30 dark:ring-white/30 text-black dark:text-white resize-none text-wrap",
                            "min-h-[56px]"
                        )}
                        ref={textareaRef}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            adjustHeight();
                        }}
                    />

                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1"
                        type="button"
                    >
                        <ArrowRight
                            className={cn(
                                "w-4 h-4 transition-opacity dark:text-white",
                                inputValue ? "opacity-100" : "opacity-30"
                            )}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
