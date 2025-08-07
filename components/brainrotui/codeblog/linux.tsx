"use client";

import React, { useState } from "react";

// 🎯 CHANGE THIS CONTENT TO CUSTOMIZE YOUR LINUX BLOG
const LINUX_BLOG_CONTENT = {
  windowTitle: "Code Blog - Terminal",
  author: "Linux Developer",
  
  // Navigation items
  navItems: [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "blog", label: "Blog", icon: "📝" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "about", label: "About", icon: "🐧" },
  ],

  // Blog post content
  blogPost: {
    title: "Linux System Programming",
    date: "December 8, 2024",
    content: [
      {
        type: 'text',
        data: "Explore Linux system programming with C and shell scripting. Let's start with a simple system call example."
      },
      {
        type: 'code',
        data: `#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
    pid_t pid = getpid();
    printf("Process ID: %d\\n", pid);
    
    // Fork a child process
    pid_t child_pid = fork();
    
    if (child_pid == 0) {
        printf("Child process: %d\\n", getpid());
    } else {
        printf("Parent process: %d\\n", getpid());
    }
    
    return 0;
}`,
        language: 'c',
        filename: 'process.c'
      },
      {
        type: 'text',
        data: "This demonstrates process creation and system calls in Linux. The fork() system call creates a new process."
      },
      {
        type: 'code',
        data: `#!/bin/bash

# System monitoring script
echo "=== System Information ==="
echo "Hostname: $(hostname)"
echo "Uptime: $(uptime -p)"
echo "Memory Usage:"
free -h
echo "Disk Usage:"
df -h /`,
        language: 'bash',
        filename: 'sysinfo.sh'
      }
    ]
  },

  // Home page content
  homeContent: {
    title: "Welcome to Linux Code Blog",
    description: "Learn Linux system programming and open-source development.",
    features: [
      "🐧 Linux System Programming",
      "⚡ Shell Scripting", 
      "🔧 Open Source Tools",
      "📡 Network Programming"
    ]
  },

  // Projects content
  projects: [
    {
      title: "System Monitor",
      description: "Real-time system monitoring tool",
      tech: "C, ncurses, Linux APIs"
    },
    {
      title: "Shell Implementation", 
      description: "Custom shell with job control",
      tech: "C, POSIX, System Calls"
    },
    {
      title: "Network Server",
      description: "Multi-threaded TCP server",
      tech: "C, pthreads, sockets"
    }
  ],

  // About content
  aboutContent: {
    title: "About Linux Development",
    description: "This blog covers Linux system programming, shell scripting, and open-source development.",
    features: [
      "Ubuntu/GNOME styling",
      "Terminal-inspired interface", 
      "Syntax highlighting for C/Bash",
      "Linux-specific tutorials",
      "Open source focus"
    ]
  }
};

export default function LinuxCodeBlog() {
  const [activeTab, setActiveTab] = useState("blog");
  const [copied, setCopied] = useState("");

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const renderCodeBlock = (block: any, index: number) => {
    const lines = block.data.split('\n');
    const blockId = `code-${index}`;

    return (
      <div key={index} className="bg-black rounded border border-orange-500/30 overflow-hidden">
        {block.filename && (
          <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-orange-500/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-orange-300 text-sm font-mono">{block.filename}</span>
              <span className="text-orange-400 text-xs uppercase">{block.language}</span>
            </div>
            <button
              onClick={() => copyToClipboard(block.data, blockId)}
              className="text-gray-400 hover:text-orange-300 text-xs px-2 py-1 bg-orange-600 hover:bg-orange-500 rounded transition-colors"
            >
              {copied === blockId ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line: string, lineIndex: number) => (
              <div key={lineIndex} className="flex">
                <span className="text-gray-600 select-none w-8 text-right mr-4 font-mono">
                  {lineIndex + 1}
                </span>
                <code className="text-green-400 font-mono flex-1">
                  <span className={
                    line.includes('//') || line.includes('#') ? 'text-gray-500' :
                    line.includes('#include') || line.includes('#!/bin/bash') ? 'text-orange-400' :
                    line.includes('int') || line.includes('void') || line.includes('char') || line.includes('pid_t') ? 'text-cyan-400' :
                    line.includes('printf') || line.includes('echo') ? 'text-yellow-400' :
                    'text-green-400'
                  }>
                    {line || ' '}
                  </span>
                </code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-6 text-green-300">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">{LINUX_BLOG_CONTENT.homeContent.title}</h2>
            <p className="mb-6 text-lg">{LINUX_BLOG_CONTENT.homeContent.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {LINUX_BLOG_CONTENT.homeContent.features.map((feature, index) => (
                <div key={index} className="bg-orange-900/20 border border-orange-500/30 p-4 rounded">
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "blog":
        return (
          <div className="bg-black text-green-400 p-6 max-h-96 overflow-y-auto">
            <div className="mb-6 border-b border-orange-500/30 pb-4">
              <h1 className="text-2xl font-bold text-orange-400 mb-2">{LINUX_BLOG_CONTENT.blogPost.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By {LINUX_BLOG_CONTENT.author}</span>
                <span>•</span>
                <span>{LINUX_BLOG_CONTENT.blogPost.date}</span>
              </div>
            </div>

            <div className="space-y-6">
              {LINUX_BLOG_CONTENT.blogPost.content.map((block, index) => (
                <div key={index}>
                  {block.type === 'text' ? (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-green-300 leading-relaxed">{block.data}</p>
                    </div>
                  ) : (
                    renderCodeBlock(block, index)
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="p-6 text-green-300">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">Projects</h2>
            <div className="space-y-4">
              {LINUX_BLOG_CONTENT.projects.map((project, index) => (
                <div key={index} className="bg-orange-900/20 border border-orange-500/30 p-4 rounded hover:bg-orange-900/30 transition-colors">
                  <h3 className="font-semibold text-orange-400 mb-2">{project.title}</h3>
                  <p className="text-sm text-green-300 mb-2">{project.description}</p>
                  <div className="text-xs text-orange-300">{project.tech}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="p-6 text-green-300">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">{LINUX_BLOG_CONTENT.aboutContent.title}</h2>
            <p className="mb-4 text-lg">{LINUX_BLOG_CONTENT.aboutContent.description}</p>
            <p className="mb-2">Features include:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {LINUX_BLOG_CONTENT.aboutContent.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Linux Window (Ubuntu/GNOME style) */}
        <div className="bg-gray-800 border border-orange-500/30  rounded-lg shadow-2xl shadow-orange-500/30 overflow-hidden">
          {/* Linux Title Bar */}
          <div className="bg-orange-600 px-4 py-2 flex items-center justify-between">
            {/* Window Controls (Left side - Ubuntu style) */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer transition-colors"></div>
            </div>
            
            {/* Window Title */}
            <div className="text-white text-sm font-medium">
              {LINUX_BLOG_CONTENT.windowTitle}
            </div>
            
            {/* Right side spacer */}
            <div className="w-16"></div>
          </div>
          
          {/* Navigation Bar */}
          <div className="bg-gray-900 border-b border-orange-500/30">
            <div className="flex items-center px-4">
              {LINUX_BLOG_CONTENT.navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === item.id
                      ? "text-orange-400 bg-orange-900/30"
                      : "text-green-400 hover:text-orange-300 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {activeTab === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Window Content */}
          <div className="bg-black">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
