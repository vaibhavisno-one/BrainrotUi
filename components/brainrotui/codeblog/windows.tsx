"use client";

import React, { useState } from "react";

// 🎯 CHANGE THIS CONTENT TO CUSTOMIZE YOUR WINDOWS BLOG
const WINDOWS_CONTENT = {
  windowTitle: "Code Blog - Visual Studio Code",
  author: "Windows Developer",
  
  navItems: [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "blog", label: "Blog", icon: "📝" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "about", label: "About", icon: "👨‍💻" },
  ],

  blogPost: {
    title: "Windows Development Best Practices",
    date: "December 8, 2024",
    content: [
      {
        type: 'text',
        data: "Learn how to build efficient Windows applications using modern development practices and tools."
      },
      {
        type: 'code',
        data: `using System;
using System.Windows.Forms;

namespace WindowsApp
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            SetupEventHandlers();
        }

        private void SetupEventHandlers()
        {
            this.Load += MainForm_Load;
            this.FormClosing += MainForm_FormClosing;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            MessageBox.Show("Welcome to Windows Development!");
        }
    }
}`,
        language: 'csharp',
        filename: 'MainForm.cs'
      }
    ]
  },

  homeContent: {
    title: "Welcome to Windows Code Blog",
    description: "Explore Windows development tutorials and best practices.",
    features: [
      "🪟 Windows Forms & WPF",
      "⚡ .NET Framework", 
      "🔧 Visual Studio Tools",
      "📦 NuGet Packages"
    ]
  },

  projects: [
    {
      title: "Windows Desktop App",
      description: "Modern WPF application with MVVM pattern",
      tech: "C#, WPF, MVVM"
    },
    {
      title: "Windows Service",
      description: "Background service for system monitoring",
      tech: ".NET Core, Windows Services"
    }
  ],

  aboutContent: {
    title: "About Windows Development",
    description: "This blog focuses on Windows application development using Microsoft technologies.",
    features: [
      "Windows 11 style interface",
      "Visual Studio Code theme",
      "Fluent Design principles",
      "Modern Windows development"
    ]
  }
};

export default function WindowsCodeBlog() {
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
      <div key={index} className="bg-gray-900 rounded border border-gray-700 overflow-hidden">
        {block.filename && (
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-gray-300 text-sm font-mono">{block.filename}</span>
              <span className="text-gray-500 text-xs uppercase">{block.language}</span>
            </div>
            <button
              onClick={() => copyToClipboard(block.data, blockId)}
              className="text-gray-400 hover:text-white text-xs px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
            >
              {copied === blockId ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line: string, lineIndex: number) => (
              <div key={lineIndex} className="flex">
                <span className="text-gray-500 select-none w-8 text-right mr-4 font-mono">
                  {lineIndex + 1}
                </span>
                <code className="text-gray-100 font-mono flex-1">
                  <span className={
                    line.includes('//') || line.includes('/*') ? 'text-green-400' :
                    line.includes('using') || line.includes('namespace') || line.includes('class') || line.includes('public') || line.includes('private') ? 'text-blue-400' :
                    line.includes('string') || line.includes('int') || line.includes('void') || line.includes('bool') ? 'text-cyan-400' :
                    'text-gray-100'
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
          <div className="p-6 text-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-white">{WINDOWS_CONTENT.homeContent.title}</h2>
            <p className="mb-6 text-lg">{WINDOWS_CONTENT.homeContent.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {WINDOWS_CONTENT.homeContent.features.map((feature, index) => (
                <div key={index} className="bg-gray-700 border border-gray-600 p-4 rounded hover:bg-gray-600 transition-colors">
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "blog":
        return (
          <div className="bg-gray-800 text-gray-100 p-6 max-h-96 overflow-y-auto">
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h1 className="text-2xl font-bold text-white mb-2">{WINDOWS_CONTENT.blogPost.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>By {WINDOWS_CONTENT.author}</span>
                <span>•</span>
                <span>{WINDOWS_CONTENT.blogPost.date}</span>
              </div>
            </div>

            <div className="space-y-6">
              {WINDOWS_CONTENT.blogPost.content.map((block, index) => (
                <div key={index}>
                  {block.type === 'text' ? (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed">{block.data}</p>
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
          <div className="p-6 text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-white">Projects</h2>
            <div className="space-y-4">
              {WINDOWS_CONTENT.projects.map((project, index) => (
                <div key={index} className="bg-gray-700 border border-gray-600 p-4 rounded hover:bg-gray-600 transition-colors">
                  <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{project.description}</p>
                  <div className="text-xs text-blue-400">{project.tech}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="p-6 text-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-white">{WINDOWS_CONTENT.aboutContent.title}</h2>
            <p className="mb-4 text-lg">{WINDOWS_CONTENT.aboutContent.description}</p>
            <p className="mb-2">Features include:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {WINDOWS_CONTENT.aboutContent.features.map((feature, index) => (
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
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Windows Window */}
        <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl shadow-gray-800 overflow-hidden">
          {/* Windows Title Bar */}
          <div className="bg-gray-700 px-4 py-2 flex items-center justify-between border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">📝</span>
              </div>
              <span className="text-gray-200 text-sm font-medium">{WINDOWS_CONTENT.windowTitle}</span>
            </div>
            
            {/* Windows Controls */}
            <div className="flex items-center space-x-1">
              <button className="w-8 h-6 bg-gray-600 hover:bg-gray-500 text-white text-xs flex items-center justify-center transition-colors">
                −
              </button>
              <button className="w-8 h-6 bg-gray-600 hover:bg-gray-500 text-white text-xs flex items-center justify-center transition-colors">
                □
              </button>
              <button className="w-8 h-6 bg-red-600 hover:bg-red-500 text-white text-xs flex items-center justify-center transition-colors">
                ×
              </button>
            </div>
          </div>
          
          {/* Navigation Bar */}
          <div className="bg-gray-750 border-b border-gray-600">
            <div className="flex items-center">
              {WINDOWS_CONTENT.navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-3 text-sm font-medium transition-colors border-r border-gray-600 ${
                    activeTab === item.id
                      ? "text-white bg-blue-600"
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Window Content */}
          <div className="bg-gray-800">
            {renderContent()}
          </div>
        </div>
        
        
      </div>
    </div>
  );
}
