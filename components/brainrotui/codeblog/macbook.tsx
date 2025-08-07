"use client";

import React, { useState } from "react";

// 🎯 CHANGE THIS CONTENT TO CUSTOMIZE YOUR BLOG
const BLOG_CONTENT = {
  windowTitle: "Code Blog - MacBook Pro",
  author: "John Developer",
  
  // Navigation items
  navItems: [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "blog", label: "Blog", icon: "📝" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "about", label: "About", icon: "👨‍💻" },
  ],

  // Blog post content
  blogPost: {
    title: "Building Modern React Components",
    date: "December 8, 2024",
    content: [
      {
        type: 'text',
        data: "In this post, we'll explore how to build modern React components using TypeScript and best practices. Let's start with a simple functional component."
      },
      {
        type: 'code',
        data: `import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <button
      className={\`btn btn-\${variant} \${isPressed ? 'pressed' : ''}\`}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
}`,
        language: 'typescript',
        filename: 'Button.tsx'
      },
      {
        type: 'text',
        data: "This component demonstrates several important concepts: TypeScript interfaces for props, default parameters, state management with hooks, and conditional styling."
      },
      {
        type: 'code',
        data: `// Usage example
import { Button } from './Button';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <Button onClick={handleClick} variant="primary">
        Click me!
      </Button>
    </div>
  );
}`,
        language: 'typescript',
        filename: 'App.tsx'
      }
    ]
  },

  // Home page content
  homeContent: {
    title: "Welcome to Code Blog",
    description: "Select a tab to explore different sections of the blog.",
    features: [
      "🚀 Modern React Components",
      "💻 TypeScript Integration", 
      "🎨 Beautiful UI Design",
      "📱 Responsive Layout"
    ]
  },

  // Projects content
  projects: [
    {
      title: "MacBook UI Components",
      description: "React components that replicate macOS interface",
      tech: "React, TypeScript, Tailwind"
    },
    {
      title: "Code Syntax Highlighter", 
      description: "Custom syntax highlighting for code blocks",
      tech: "JavaScript, CSS, Prism.js"
    },
    {
      title: "Blog Management System",
      description: "Full-stack blog with admin panel",
      tech: "Next.js, MongoDB, Auth0"
    }
  ],

  // About content
  aboutContent: {
    title: "About This Blog",
    description: "This is a MacBook-style code blog interface built with React and Tailwind CSS.",
    features: [
      "Authentic macOS window design",
      "Interactive navigation tabs", 
      "Syntax-highlighted code blocks",
      "Copy-to-clipboard functionality",
      "Responsive design"
    ]
  }
};

// 🔧 COMPONENT CODE (You don't need to modify below this line)
export default function MacBookCodeBlog() {
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
      <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
        {block.filename && (
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-300 text-sm font-mono">{block.filename}</span>
              <span className="text-gray-500 text-xs uppercase">{block.language}</span>
            </div>
            <button
              onClick={() => copyToClipboard(block.data, blockId)}
              className="text-gray-400 hover:text-gray-200 text-xs px-2 py-1 rounded transition-colors"
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
                    line.includes('//') ? 'text-gray-500' :
                    line.includes('function') || line.includes('const') || line.includes('let') || line.includes('import') || line.includes('export') ? 'text-blue-400' :
                    line.includes('return') ? 'text-pink-400' :
                    line.includes('interface') || line.includes('type') ? 'text-yellow-400' :
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
          <div className="p-6 text-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-white">{BLOG_CONTENT.homeContent.title}</h2>
            <p className="mb-6 text-lg">{BLOG_CONTENT.homeContent.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {BLOG_CONTENT.homeContent.features.map((feature, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "blog":
        return (
          <div className="bg-gray-900 text-gray-100 p-6 max-h-96 overflow-y-auto">
            <div className="mb-6 border-b border-gray-700 pb-4">
              <h1 className="text-2xl font-bold text-white mb-2">{BLOG_CONTENT.blogPost.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>By {BLOG_CONTENT.author}</span>
                <span>•</span>
                <span>{BLOG_CONTENT.blogPost.date}</span>
              </div>
            </div>

            <div className="space-y-6">
              {BLOG_CONTENT.blogPost.content.map((block, index) => (
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
          <div className="p-6 text-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-white">Projects</h2>
            <div className="space-y-4">
              {BLOG_CONTENT.projects.map((project, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors">
                  <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                  <div className="text-xs text-blue-400">{project.tech}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="p-6 text-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-white">{BLOG_CONTENT.aboutContent.title}</h2>
            <p className="mb-4 text-lg">{BLOG_CONTENT.aboutContent.description}</p>
            <p className="mb-2">Features include:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {BLOG_CONTENT.aboutContent.features.map((feature, index) => (
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
        {/* MacBook Window */}
        <div className="bg-gray-800 shadow-2xl  shadow-gray-950 rounded-lg  overflow-hidden">
          {/* Window Header */}
          <div className="bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-600">
            {/* Traffic Light Buttons */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer transition-colors"></div>
            </div>
            
            {/* Window Title */}
            <div className="text-gray-300 text-sm font-medium">
              {BLOG_CONTENT.windowTitle}
            </div>
            
            {/* Right side spacer */}
            <div className="w-16"></div>
          </div>
          
          {/* Navigation Bar */}
          <div className="bg-gray-800 border-b border-gray-700">
            <div className="flex items-center px-4">
              {BLOG_CONTENT.navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === item.id
                      ? "text-white bg-gray-700"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-750"
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
          <div className="bg-gray-900">
            {renderContent()}
          </div>
        </div>
        
        {/* MacBook Base */}
        <div className="mt-2 mx-auto w-32 h-2 bg-gray-300 rounded-full shadow-inner"></div>
      </div>
    </div>
  );
}
