"use client";

import React, { useState } from "react";

// 🎯 CHANGE THIS CONTENT TO CUSTOMIZE YOUR CHROME OS BLOG
const CHROMEOS_BLOG_CONTENT = {
  windowTitle: "Code Blog - Chrome",
  author: "Chrome Developer",
  
  // Navigation items
  navItems: [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "blog", label: "Blog", icon: "📝" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "about", label: "About", icon: "🌐" },
  ],

  // Blog post content
  blogPost: {
    title: "Web Development with Chrome APIs",
    date: "December 8, 2024",
    content: [
      {
        type: 'text',
        data: "Learn how to build Chrome extensions and Progressive Web Apps. We'll start with a simple Chrome extension."
      },
      {
        type: 'code',
        data: `{
  "manifest_version": 3,
  "name": "My Chrome Extension",
  "version": "1.0",
  "description": "A simple Chrome extension",
  "permissions": ["activeTab", "storage"],
  "action": {
    "default_popup": "popup.html",
    "default_title": "My Extension"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }]
}`,
        language: 'json',
        filename: 'manifest.json'
      },
      {
        type: 'text',
        data: "This manifest file defines the structure and permissions for a Chrome extension."
      },
      {
        type: 'code',
        data: `// Content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "highlight") {
    const elements = document.querySelectorAll('p');
    elements.forEach(el => {
      el.style.backgroundColor = 'yellow';
    });
    sendResponse({status: "highlighted"});
  }
});

// Service worker
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {action: "highlight"});
});`,
        language: 'javascript',
        filename: 'content.js'
      }
    ]
  },

  // Home page content
  homeContent: {
    title: "Welcome to Chrome OS Code Blog",
    description: "Explore web development and Chrome platform features.",
    features: [
      "🌐 Web Technologies",
      "⚡ Chrome Extensions", 
      "📱 Progressive Web Apps",
      "☁️ Cloud Development"
    ]
  },

  // Projects content
  projects: [
    {
      title: "Chrome Extension",
      description: "Productivity extension with modern UI",
      tech: "JavaScript, Chrome APIs, HTML5"
    },
    {
      title: "Progressive Web App", 
      description: "Offline-capable web application",
      tech: "Service Workers, IndexedDB, Manifest"
    },
    {
      title: "Cloud IDE",
      description: "Browser-based development environment",
      tech: "WebAssembly, Monaco Editor, WebRTC"
    }
  ],

  // About content
  aboutContent: {
    title: "About Chrome OS Development",
    description: "This blog focuses on web development and Chrome platform technologies.",
    features: [
      "Chrome OS Material Design",
      "Browser-native interface", 
      "Syntax highlighting for web languages",
      "Chrome-specific tutorials",
      "Cloud-first development"
    ]
  }
};

export default function ChromeOSCodeBlog() {
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
      <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {block.filename && (
          <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 text-sm font-mono">{block.filename}</span>
              <span className="text-blue-600 text-xs uppercase font-medium">{block.language}</span>
            </div>
            <button
              onClick={() => copyToClipboard(block.data, blockId)}
              className="text-gray-600 hover:text-blue-600 text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors font-medium"
            >
              {copied === blockId ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line: string, lineIndex: number) => (
              <div key={lineIndex} className="flex">
                <span className="text-gray-400 select-none w-8 text-right mr-4 font-mono">
                  {lineIndex + 1}
                </span>
                <code className="text-gray-800 font-mono flex-1">
                  <span className={
                    line.includes('//') || line.includes('/*') ? 'text-green-600' :
                    line.includes('"') && (line.includes('manifest_version') || line.includes('name') || line.includes('version')) ? 'text-blue-600' :
                    line.includes('chrome.') || line.includes('document.') ? 'text-purple-600' :
                    line.includes('function') || line.includes('const') || line.includes('let') ? 'text-red-600' :
                    'text-gray-800'
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
          <div className="p-6 text-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{CHROMEOS_BLOG_CONTENT.homeContent.title}</h2>
            <p className="mb-6 text-lg">{CHROMEOS_BLOG_CONTENT.homeContent.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {CHROMEOS_BLOG_CONTENT.homeContent.features.map((feature, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "blog":
        return (
          <div className="bg-white text-gray-800 p-6 max-h-96 overflow-y-auto">
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{CHROMEOS_BLOG_CONTENT.blogPost.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By {CHROMEOS_BLOG_CONTENT.author}</span>
                <span>•</span>
                <span>{CHROMEOS_BLOG_CONTENT.blogPost.date}</span>
              </div>
            </div>

            <div className="space-y-6">
              {CHROMEOS_BLOG_CONTENT.blogPost.content.map((block, index) => (
                <div key={index}>
                  {block.type === 'text' ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{block.data}</p>
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
          <div className="p-6 text-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Projects</h2>
            <div className="space-y-4">
              {CHROMEOS_BLOG_CONTENT.projects.map((project, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="text-xs text-blue-600 font-medium">{project.tech}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="p-6 text-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{CHROMEOS_BLOG_CONTENT.aboutContent.title}</h2>
            <p className="mb-4 text-lg">{CHROMEOS_BLOG_CONTENT.aboutContent.description}</p>
            <p className="mb-2">Features include:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {CHROMEOS_BLOG_CONTENT.aboutContent.features.map((feature, index) => (
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
    <div className="min-h-screen   p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Chrome OS Window */}
        <div className="bg-white rounded-lg shadow-2xl shadow-gray-400 overflow-hidden border border-gray-200">
          {/* Chrome Title Bar */}
          <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200">
            {/* Chrome Tab */}
            <div className="flex items-center space-x-2">
              <div className="bg-white px-4 py-2 rounded-t-lg border-t border-l border-r border-gray-200 flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🌐</span>
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {CHROMEOS_BLOG_CONTENT.windowTitle}
                </span>
                <button className="text-gray-400 hover:text-gray-600 text-xs ml-2">×</button>
              </div>
              <button className="w-6 h-6 text-gray-400 hover:text-gray-600 flex items-center justify-center">+</button>
            </div>
            
            {/* Chrome Controls */}
            <div className="flex items-center space-x-2">
              <button className="w-6 h-6 text-gray-400 hover:text-gray-600 flex items-center justify-center">−</button>
              <button className="w-6 h-6 text-gray-400 hover:text-gray-600 flex items-center justify-center">□</button>
              <button className="w-6 h-6 text-gray-400 hover:text-gray-600 flex items-center justify-center">×</button>
            </div>
          </div>
          
          {/* Address Bar */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <div className="bg-white rounded-full px-4 py-2 border border-gray-300 flex items-center space-x-2">
              <span className="text-green-600 text-sm">🔒</span>
              <span className="text-gray-600 text-sm">https://codeblog.dev</span>
            </div>
          </div>
          
          {/* Navigation Bar */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex items-center px-4">
              {CHROMEOS_BLOG_CONTENT.navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === item.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {activeTab === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Window Content */}
          <div className="bg-white">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
