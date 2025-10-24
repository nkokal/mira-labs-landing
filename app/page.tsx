'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Bubble, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  LineElement
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, LineElement);

// Typewriter animation component - COMPLETELY REWRITTEN
function TypewriterText() {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Transform GTM Data into Intelligence.  ";
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(typingInterval);
        // Start blinking cursor after typing completes
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Pre-render the complete text to ensure proper spacing
  const completeWords = fullText.split(' ');
  
  return (
    <div className="w-full text-center px-4">
      {displayText.split(' ').map((word, i, arr) => {
        const isIntelligenceWord = word.toLowerCase().includes('intelligence');
        const isLastWord = i === arr.length - 1;
        
        return (
          <span key={i}>
            <span className={isIntelligenceWord ? "italic" : ""} style={isIntelligenceWord ? { color: '#5B0A1E' } : {}}>
              {word}
            </span>
            {!isLastWord && <span> </span>}
          </span>
        );
      })}
      {isComplete && (
        <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
      )}
    </div>
  );
}

// Clean subtle background
function SubtleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `
               linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
             `,
             backgroundSize: '60px 60px'
           }}>
      </div>
    </div>
  );
}

function AnimatedPill() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "AI-powered insights",
    "Real-time analytics", 
    "Customer intelligence",
    "Product feedback"
  ];
  const colors = [
    "#E6FFD9", // light green
    "#152D30", // dark teal
    "#819F7D", // sage green
    "#5B0A1E"  // golden yellow
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [texts.length]);

  // Determine text color based on background
  const getTextColor = (bgColor: string) => {
    const lightBackgrounds = ["#E6FFD9"];
    return lightBackgrounds.includes(bgColor) ? "#152D30" : "#FFFFFF";
  };

  return (
    <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium shadow-lg transition-colors duration-500"
      style={{ 
        backgroundColor: colors[currentText],
        color: getTextColor(colors[currentText])
      }}>
      <span className="mr-2">✨</span>
      {texts[currentText]}
    </div>
  );
}

function AnimatedLineChart() {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev + 0.02;
        });
      }, 50);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const animatedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Integration Complexity',
        data: [12, 15, 18, 22, 25, 30].map((value, index) => 
          index <= Math.floor(animationProgress * 5) ? value : 0
        ),
        borderColor: '#E6FFD9',
        backgroundColor: 'rgba(230,255,217,0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#E6FFD9',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Slow Support',
        data: [8, 10, 12, 14, 13, 15].map((value, index) => 
          index <= Math.floor(animationProgress * 5) ? value : 0
        ),
        borderColor: '#152D30',
        backgroundColor: 'rgba(21,45,48,0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#152D30',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Missing SSO',
        data: [5, 7, 8, 10, 12, 14].map((value, index) => 
          index <= Math.floor(animationProgress * 5) ? value : 0
        ),
        borderColor: '#819F7D',
        backgroundColor: 'rgba(129,159,125,0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#819F7D',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="relative">
      <Line
        data={animatedData}
        options={{
          responsive: true,
          animation: {
            duration: 0,
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0,0,0,0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(255,255,255,0.2)',
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
                color: '#6b7280',
                font: {
                  size: 12,
                  weight: 500,
                },
              },
              grid: {
                color: 'rgba(0,0,0,0.05)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Mentions',
                color: '#6b7280',
                font: {
                  size: 12,
                  weight: 500,
                },
              },
              min: 0,
              grid: {
                color: 'rgba(0,0,0,0.05)',
              },
            },
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
        }}
        height={220}
      />
      {animationProgress < 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
        </div>
      )}
    </div>
  );
}

// Advanced animated logo grid with original SVG logos
function AnimatedLogoGrid() {
  const [visibleLogos, setVisibleLogos] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogos(prev => {
        if (prev >= 8) {
          return 0; // Reset to start the animation over
        }
        return prev + 1;
      });
    }, 800); // Animation timing
    
    return () => clearInterval(interval);
  }, []);

  const createLogoElement = (logoComponent: JSX.Element, index: number) => {
    const isVisible = index < visibleLogos;
    const isHovered = hoveredIndex === index;
    return (
      <div 
        key={index} 
        className={`flex-shrink-0 w-20 h-20 mx-3 transition-all duration-600 transform cursor-pointer ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-6'
        } ${isHovered ? 'scale-105 -translate-y-1' : ''}`}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          animationDelay: `${index * 150}ms`
        }}
      >
        <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {logoComponent}
          </div>
        </div>
      </div>
    );
  };

  const createRow = (logos: JSX.Element[], rowIndex: number) => {
    return (
      <div key={rowIndex} className="flex items-center justify-center mb-4 gap-2">
        {logos.map((logo, index) => createLogoElement(logo, rowIndex * 2 + index))}
      </div>
    );
  };

  // All original logos from logoBlocks function
  const allLogos = [
    // Salesforce
    <svg key="salesforce" width="32" height="32" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
      <title>Salesforce icon</title>
      <path d="M10.005 5.416c.75-.796 1.845-1.306 3.046-1.306 1.56 0 2.954.9 3.689 2.205.63-.3 1.35-.45 2.101-.45 2.849 0 5.159 2.34 5.159 5.22s-2.311 5.22-5.176 5.22c-.345 0-.689-.044-1.02-.104-.645 1.17-1.875 1.95-3.3 1.95-.6 0-1.155-.15-1.65-.375-.659 1.546-2.189 2.624-3.975 2.624-1.859 0-3.45-1.169-4.05-2.819-.27.061-.54.075-.825.075-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.649 4.65-4.649 1.53 0 2.85.704 3.72 1.8"/>
    </svg>,
    // Notion
    <svg key="notion" width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.25781 3.11684C3.67771 3.45796 3.83523 3.43193 4.62369 3.37933L12.0571 2.93299C12.2147 2.93299 12.0836 2.77571 12.0311 2.74957L10.7965 1.85711C10.56 1.67347 10.2448 1.46315 9.64083 1.51576L2.44308 2.04074C2.18059 2.06677 2.12815 2.19801 2.2327 2.30322L3.25781 3.11684ZM3.7041 4.84917V12.6704C3.7041 13.0907 3.91415 13.248 4.38693 13.222L12.5562 12.7493C13.0292 12.7233 13.0819 12.4341 13.0819 12.0927V4.32397C13.0819 3.98306 12.9508 3.79921 12.6612 3.82545L4.12422 4.32397C3.80918 4.35044 3.7041 4.50803 3.7041 4.84917ZM11.7688 5.26872C11.8212 5.50518 11.7688 5.74142 11.5319 5.76799L11.1383 5.84641V11.6205C10.7965 11.8042 10.4814 11.9092 10.2188 11.9092C9.79835 11.9092 9.69305 11.7779 9.37812 11.3844L6.80345 7.34249V11.2532L7.61816 11.437C7.61816 11.437 7.61816 11.9092 6.96086 11.9092L5.14879 12.0143C5.09615 11.9092 5.14879 11.647 5.33259 11.5944L5.80546 11.4634V6.29276L5.1489 6.24015C5.09625 6.00369 5.22739 5.66278 5.5954 5.63631L7.53935 5.50528L10.2188 9.5998V5.97765L9.53564 5.89924C9.4832 5.61018 9.69305 5.40028 9.95576 5.37425L11.7688 5.26872ZM1.83874 1.33212L9.32557 0.780787C10.245 0.701932 10.4815 0.754753 11.0594 1.17452L13.4492 2.85424C13.8436 3.14309 13.975 3.22173 13.975 3.53661V12.7493C13.975 13.3266 13.7647 13.6681 13.0293 13.7203L4.33492 14.2454C3.78291 14.2717 3.52019 14.193 3.23111 13.8253L1.47116 11.5419C1.1558 11.1216 1.02466 10.8071 1.02466 10.4392V2.25041C1.02466 1.77825 1.23504 1.38441 1.83874 1.33212Z"
        fill="#BDBDBD"
      />
    </svg>,
    // Slack
    <svg key="slack" width="32" height="32" viewBox="0 0 32 32" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
      <title>slack</title>
      <path d="M19.955 23.108c-1.74 0-3.151-1.411-3.151-3.151s1.411-3.151 3.151-3.151h7.889c1.74 0 3.151 1.411 3.151 3.151s-1.411 3.151-3.151 3.151v0zM19.955 24.693c1.739 0 3.149 1.41 3.149 3.149s-1.41 3.149-3.149 3.149c-1.738 0-3.148-1.408-3.149-3.146v-3.152zM23.108 12.044c0 1.74-1.411 3.151-3.151 3.151s-3.151-1.411-3.151-3.151v0-7.888c0-1.74 1.411-3.151 3.151-3.151s3.151 1.411 3.151 3.151v0zM24.693 12.044c0.001-1.738 1.41-3.147 3.148-3.147s3.148 1.41 3.148 3.149c0 1.738-1.408 3.147-3.145 3.149h-3.152zM12.044 8.893c1.736 0.005 3.142 1.413 3.142 3.15s-1.406 3.146-3.142 3.15h-7.888c-1.736-0.005-3.142-1.413-3.142-3.15s1.406-3.146 3.142-3.15h0zM12.044 7.305c-1.736-0.002-3.143-1.41-3.143-3.147 0-1.738 1.409-3.147 3.147-3.147s3.145 1.408 3.147 3.144v3.149zM8.893 19.955c0.005-1.736 1.413-3.142 3.15-3.142s3.146 1.406 3.15 3.142v7.889c-0.005 1.736-1.413 3.142-3.15 3.142s-3.146-1.406-3.15-3.142v-0zM7.305 19.955c-0.001 1.737-1.41 3.145-3.147 3.145s-3.147-1.409-3.147-3.147c0-1.738 1.408-3.146 3.145-3.147h3.149z"></path>
    </svg>,
    // Gong
    <svg key="gong" version="1.1" width="32" height="32" viewBox="0 0 55.4 60" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display:'block'}}>
      <g>
        <path fill="#BDBDBD" d="M54.1,25.7H37.8c-0.9,0-1.6,1-1.3,1.8l3.9,10.1c0.2,0.4-0.2,0.9-0.7,0.9l-5-0.3c-0.2,0-0.4,0.1-0.6,0.3
		L30.3,44c-0.2,0.3-0.6,0.4-1,0.2l-5.8-3.9c-0.2-0.2-0.5-0.2-0.8,0l-8,5.4c-0.5,0.4-1.2-0.1-1-0.7L16,37c0.1-0.3-0.1-0.7-0.4-0.8
		l-4.2-1.7c-0.4-0.2-0.6-0.7-0.3-1l3.7-4.6c0.2-0.2,0.2-0.6,0-0.8l-3.1-4.5c-0.3-0.4,0-1,0.5-1l4.9-0.4c0.4,0,0.6-0.3,0.6-0.7
		l-0.4-6.8c0-0.5,0.5-0.8,0.9-0.7l6,2.5c0.3,0.1,0.6,0,0.8-0.2l4.2-4.6c0.3-0.4,0.9-0.3,1.1,0.2l2.5,6.4c0.3,0.8,1.3,1.1,2,0.6
		l9.8-7.3c1.1-0.8,0.4-2.6-1-2.4L37.3,10c-0.3,0-0.6-0.1-0.7-0.4l-3.4-8.7c-0.4-0.9-1.5-1.1-2.2-0.4l-7.4,8
		c-0.2,0.2-0.5,0.3-0.8,0.2l-9.7-4.1c-0.9-0.4-1.8,0.2-1.9,1.2l-0.4,10c0,0.4-0.3,0.6-0.6,0.6l-8.9,0.6c-1,0.1-1.6,1.2-1,2.1
		l5.9,8.7c0.2,0.2,0.2,0.6,0,0.8l-6,6.9C-0.3,36,0,37.1,0.8,37.4l6.9,3c0.3,0.1,0.5,0.5,0.4,0.8L3.7,58.3c-0.3,1.2,1.1,2.1,2.1,1.4
		l16.5-11.8c0.2-0.2,0.5-0.2,0.8,0l7.5,5.3c0.6,0.4,1.5,0.3,1.9-0.4l4.7-7.2c0.1-0.2,0.4-0.3,0.6-0.3l11.2,1.4
		c0.9,0.1,1.8-0.6,1.5-1.5l-4.7-12.1c-0.1-0.3,0-0.7,0.4-0.9l8.5-4C55.9,27.6,55.5,25.7,54.1,25.7z"/>
      </g>
    </svg>,
    // HubSpot
    <svg key="hubspot" width="32" height="32" viewBox="0 0 32 32" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.219 10.573v-3.792c1.026-0.479 1.682-1.505 1.688-2.641v-0.089c-0.005-1.609-1.307-2.917-2.922-2.922h-0.089c-1.615 0.005-2.922 1.307-2.927 2.922v0.089c0.005 1.125 0.656 2.146 1.672 2.63l0.016 0.010v3.802c-1.448 0.219-2.818 0.823-3.958 1.745l0.016-0.010-10.438-8.13c0.943-3.521-3.651-5.776-5.859-2.875-2.214 2.896 1.167 6.729 4.318 4.896l-0.016 0.010 10.26 7.984c-0.906 1.365-1.391 2.964-1.385 4.599 0 1.786 0.568 3.448 1.531 4.807l-0.016-0.026-3.125 3.12c-0.25-0.078-0.51-0.12-0.771-0.125h-0.005c-2.411 0-3.625 2.922-1.917 4.63 1.708 1.703 4.63 0.495 4.63-1.917-0.005-0.271-0.052-0.542-0.135-0.797l0.005 0.021 3.089-3.089c2.042 1.557 4.688 2.089 7.172 1.438 2.479-0.656 4.526-2.411 5.536-4.771 1.016-2.359 0.885-5.052-0.354-7.302-1.234-2.25-3.443-3.802-5.974-4.208l-0.052-0.010zM22.932 23.078c-3.807-0.010-5.703-4.615-3.005-7.302 2.693-2.688 7.292-0.781 7.292 3.026v0.005c0 2.359-1.911 4.271-4.276 4.271z"/>
    </svg>,
    // Zoom
    <svg key="zoom" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="24" rx="6" stroke="#BDBDBD" strokeWidth="2" fill="none"/>
      <circle cx="16" cy="16" r="6" stroke="#BDBDBD" strokeWidth="2" fill="none"/>
      <polygon points="19,16 14,13 14,19" fill="#BDBDBD"/>
    </svg>,
    // Pipedrive
    <svg key="pipedrive" width="32" height="32" viewBox="0 0 304 304" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <path d="M59.6807,81.1772 C59.6807,101.5343 70.0078,123.4949 92.7336,123.4949 C109.5872,123.4949 126.6277,110.3374 126.6277,80.8785 C126.6277,55.0508 113.232,37.7119 93.2944,37.7119 C77.0483,37.7119 59.6807,49.1244 59.6807,81.1772 Z M101.3006,0 C142.0482,0 169.4469,32.2728 169.4469,80.3126 C169.4469,127.5978 140.584,160.60942 99.3224,160.60942 C79.6495,160.60942 67.0483,152.1836 60.4595,146.0843 C60.5063,147.5305 60.5374,149.1497 60.5374,150.8788 L60.5374,215 L18.32565,215 L18.32565,44.157 C18.32565,41.6732 17.53126,40.8873 15.07021,40.8873 L0.5531,40.8873 L0.5531,3.4741 L35.9736,3.4741 C52.282,3.4741 56.4564,11.7741 57.2508,18.1721 C63.8708,10.7524 77.5935,0 101.3006,0 Z" id="path-1"/>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(67.000000, 44.000000)">
          <mask id="mask-2" fill="white">
            <use href="#path-1"/>
          </mask>
          <use fill="#BDBDBD" xlinkHref="#path-1"/>
        </g>
      </g>
    </svg>,
    // Outreach.io
    <svg key="outreach" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="24" rx="6" stroke="#BDBDBD" strokeWidth="2" fill="none"/>
      <circle cx="16" cy="16" r="8" stroke="#BDBDBD" strokeWidth="2" fill="none"/>
    </svg>
  ];

  // Split logos into 4 rows of 2
  const rows = [
    allLogos.slice(0, 2),   // Row 1
    allLogos.slice(2, 4),   // Row 2  
    allLogos.slice(4, 6),   // Row 3
    allLogos.slice(6, 8)    // Row 4
  ];

  return (
    <div className="relative w-full py-8">
      <div className="flex flex-col items-center space-y-3">
        {rows.map((rowLogos, index) => 
          createRow(rowLogos, index)
        )}
      </div>
    </div>
  );
}

// Helper function to render all logo blocks
function logoBlocks() {
  return (
    <>
      {/* Salesforce */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
            <title>Salesforce icon</title>
            <path d="M10.005 5.416c.75-.796 1.845-1.306 3.046-1.306 1.56 0 2.954.9 3.689 2.205.63-.3 1.35-.45 2.101-.45 2.849 0 5.159 2.34 5.159 5.22s-2.311 5.22-5.176 5.22c-.345 0-.689-.044-1.02-.104-.645 1.17-1.875 1.95-3.3 1.95-.6 0-1.155-.15-1.65-.375-.659 1.546-2.189 2.624-3.975 2.624-1.859 0-3.45-1.169-4.05-2.819-.27.061-.54.075-.825.075-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.649 4.65-4.649 1.53 0 2.85.704 3.72 1.8"/>
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">Salesforce</span>
      </div>
      {/* Notion */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.25781 3.11684C3.67771 3.45796 3.83523 3.43193 4.62369 3.37933L12.0571 2.93299C12.2147 2.93299 12.0836 2.77571 12.0311 2.74957L10.7965 1.85711C10.56 1.67347 10.2448 1.46315 9.64083 1.51576L2.44308 2.04074C2.18059 2.06677 2.12815 2.19801 2.2327 2.30322L3.25781 3.11684ZM3.7041 4.84917V12.6704C3.7041 13.0907 3.91415 13.248 4.38693 13.222L12.5562 12.7493C13.0292 12.7233 13.0819 12.4341 13.0819 12.0927V4.32397C13.0819 3.98306 12.9508 3.79921 12.6612 3.82545L4.12422 4.32397C3.80918 4.35044 3.7041 4.50803 3.7041 4.84917ZM11.7688 5.26872C11.8212 5.50518 11.7688 5.74142 11.5319 5.76799L11.1383 5.84641V11.6205C10.7965 11.8042 10.4814 11.9092 10.2188 11.9092C9.79835 11.9092 9.69305 11.7779 9.37812 11.3844L6.80345 7.34249V11.2532L7.61816 11.437C7.61816 11.437 7.61816 11.9092 6.96086 11.9092L5.14879 12.0143C5.09615 11.9092 5.14879 11.647 5.33259 11.5944L5.80546 11.4634V6.29276L5.1489 6.24015C5.09625 6.00369 5.22739 5.66278 5.5954 5.63631L7.53935 5.50528L10.2188 9.5998V5.97765L9.53564 5.89924C9.4832 5.61018 9.69305 5.40028 9.95576 5.37425L11.7688 5.26872ZM1.83874 1.33212L9.32557 0.780787C10.245 0.701932 10.4815 0.754753 11.0594 1.17452L13.4492 2.85424C13.8436 3.14309 13.975 3.22173 13.975 3.53661V12.7493C13.975 13.3266 13.7647 13.6681 13.0293 13.7203L4.33492 14.2454C3.78291 14.2717 3.52019 14.193 3.23111 13.8253L1.47116 11.5419C1.1558 11.1216 1.02466 10.8071 1.02466 10.4392V2.25041C1.02466 1.77825 1.23504 1.38441 1.83874 1.33212Z"
              fill="#BDBDBD"
            />
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">Notion</span>
      </div>
      {/* Slack */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 13.5c0 1.4-1.1 2.5-2.5 2.5S2.5 14.9 2.5 13.5 3.6 11 5 11h2.5v2.5zM8.8 13.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V27c0 1.4-1.1 2.5-2.5 2.5S8.8 28.4 8.8 27V13.5z" fill="#E01E5A"/>
            <path d="M11.2 7.5c-1.4 0-2.5-1.1-2.5-2.5S9.8 2.5 11.2 2.5s2.5 1.1 2.5 2.5V7.5h-2.5zM11.2 8.8c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5H5c-1.4 0-2.5-1.1-2.5-2.5S3.6 8.8 5 8.8h6.2z" fill="#36C5F0"/>
            <path d="M18.8 11.2c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5h-2.5v-2.5zM17.5 11.2c0 1.4-1.1 2.5-2.5 2.5S12.5 12.6 12.5 11.2V5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v6.2z" fill="#2EB67D"/>
            <path d="M15 17.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5V17.5H15zM15 18.8c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5H21c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5H15z" fill="#ECB22E"/>
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">Slack</span>
      </div>
      {/* Gong */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg version="1.1" width="32" height="32" viewBox="0 0 55.4 60" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display:'block'}}>
            <g>
              <path fill="#BDBDBD" d="M54.1,25.7H37.8c-0.9,0-1.6,1-1.3,1.8l3.9,10.1c0.2,0.4-0.2,0.9-0.7,0.9l-5-0.3c-0.2,0-0.4,0.1-0.6,0.3
		L30.3,44c-0.2,0.3-0.6,0.4-1,0.2l-5.8-3.9c-0.2-0.2-0.5-0.2-0.8,0l-8,5.4c-0.5,0.4-1.2-0.1-1-0.7L16,37c0.1-0.3-0.1-0.7-0.4-0.8
		l-4.2-1.7c-0.4-0.2-0.6-0.7-0.3-1l3.7-4.6c0.2-0.2,0.2-0.6,0-0.8l-3.1-4.5c-0.3-0.4,0-1,0.5-1l4.9-0.4c0.4,0,0.6-0.3,0.6-0.7
		l-0.4-6.8c0-0.5,0.5-0.8,0.9-0.7l6,2.5c0.3,0.1,0.6,0,0.8-0.2l4.2-4.6c0.3-0.4,0.9-0.3,1.1,0.2l2.5,6.4c0.3,0.8,1.3,1.1,2,0.6
		l9.8-7.3c1.1-0.8,0.4-2.6-1-2.4L37.3,10c-0.3,0-0.6-0.1-0.7-0.4l-3.4-8.7c-0.4-0.9-1.5-1.1-2.2-0.4l-7.4,8
		c-0.2,0.2-0.5,0.3-0.8,0.2l-9.7-4.1c-0.9-0.4-1.8,0.2-1.9,1.2l-0.4,10c0,0.4-0.3,0.6-0.6,0.6l-8.9,0.6c-1,0.1-1.6,1.2-1,2.1
		l5.9,8.7c0.2,0.2,0.2,0.6,0,0.8l-6,6.9C-0.3,36,0,37.1,0.8,37.4l6.9,3c0.3,0.1,0.5,0.5,0.4,0.8L3.7,58.3c-0.3,1.2,1.1,2.1,2.1,1.4
		l16.5-11.8c0.2-0.2,0.5-0.2,0.8,0l7.5,5.3c0.6,0.4,1.5,0.3,1.9-0.4l4.7-7.2c0.1-0.2,0.4-0.3,0.6-0.3l11.2,1.4
		c0.9,0.1,1.8-0.6,1.5-1.5l-4.7-12.1c-0.1-0.3,0-0.7,0.4-0.9l8.5-4C55.9,27.6,55.5,25.7,54.1,25.7z"/>
            </g>
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">Gong</span>
      </div>
      {/* HubSpot */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.219 10.573v-3.792c1.026-0.479 1.682-1.505 1.688-2.641v-0.089c-0.005-1.609-1.307-2.917-2.922-2.922h-0.089c-1.615 0.005-2.922 1.307-2.927 2.922v0.089c0.005 1.125 0.656 2.146 1.672 2.63l0.016 0.010v3.802c-1.448 0.219-2.818 0.823-3.958 1.745l0.016-0.010-10.438-8.13c0.943-3.521-3.651-5.776-5.859-2.875-2.214 2.896 1.167 6.729 4.318 4.896l-0.016 0.010 10.26 7.984c-0.906 1.365-1.391 2.964-1.385 4.599 0 1.786 0.568 3.448 1.531 4.807l-0.016-0.026-3.125 3.12c-0.25-0.078-0.51-0.12-0.771-0.125h-0.005c-2.411 0-3.625 2.922-1.917 4.63 1.708 1.703 4.63 0.495 4.63-1.917-0.005-0.271-0.052-0.542-0.135-0.797l0.005 0.021 3.089-3.089c2.042 1.557 4.688 2.089 7.172 1.438 2.479-0.656 4.526-2.411 5.536-4.771 1.016-2.359 0.885-5.052-0.354-7.302-1.234-2.25-3.443-3.802-5.974-4.208l-0.052-0.010zM22.932 23.078c-3.807-0.010-5.703-4.615-3.005-7.302 2.693-2.688 7.292-0.781 7.292 3.026v0.005c0 2.359-1.911 4.271-4.276 4.271z"/>
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">HubSpot</span>
      </div>
      {/* Zoom */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="24" height="24" rx="6" stroke="#BDBDBD" stroke-width="2" fill="none"/>
            <circle cx="16" cy="16" r="6" stroke="#BDBDBD" stroke-width="2" fill="none"/>
            <polygon points="19,16 14,13 14,19" fill="#BDBDBD"/>
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">Zoom</span>
      </div>
      {/* Pipedrive */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 304 304" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
              <path d="M59.6807,81.1772 C59.6807,101.5343 70.0078,123.4949 92.7336,123.4949 C109.5872,123.4949 126.6277,110.3374 126.6277,80.8785 C126.6277,55.0508 113.232,37.7119 93.2944,37.7119 C77.0483,37.7119 59.6807,49.1244 59.6807,81.1772 Z M101.3006,0 C142.0482,0 169.4469,32.2728 169.4469,80.3126 C169.4469,127.5978 140.584,160.60942 99.3224,160.60942 C79.6495,160.60942 67.0483,152.1836 60.4595,146.0843 C60.5063,147.5305 60.5374,149.1497 60.5374,150.8788 L60.5374,215 L18.32565,215 L18.32565,44.157 C18.32565,41.6732 17.53126,40.8873 15.07021,40.8873 L0.5531,40.8873 L0.5531,3.4741 L35.9736,3.4741 C52.282,3.4741 56.4564,11.7741 57.2508,18.1721 C63.8708,10.7524 77.5935,0 101.3006,0 Z" id="path-1"/>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(67.000000, 44.000000)">
                <mask id="mask-2" fill="white">
                  <use href="#path-1"/>
                </mask>
                <use fill="#BDBDBD" xlinkHref="#path-1"/>
              </g>
            </g>
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">Pipedrive</span>
      </div>
      {/* Outreach.io */}
      <div className="flex flex-col items-center gap-2 min-w-[96px]">
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="24" height="24" rx="6" stroke="#BDBDBD" stroke-width="2" fill="none"/>
            <circle cx="16" cy="16" r="8" stroke="#BDBDBD" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <span className="text-sm text-gray-600 font-medium">Outreach.io</span>
      </div>
    </>
  );
}

export default function Page() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [logoRotation, setLogoRotation] = useState(0);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.Tally) {
            // @ts-ignore
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / maxScroll) * 100;

      // Rotate up to 180 degrees based on scroll percentage
      const rotation = Math.min((scrollPercentage / 100) * 180, 180);
      setLogoRotation(rotation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] relative">
      {/* CSS-based grain overlay for additional texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.9' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        mixBlendMode: 'multiply'
      }}></div>
      <style jsx global>{`
        /* Clean animations remain for any future use */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }

        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 { transition-delay: 0.1s; }
        .scroll-delay-2 { transition-delay: 0.2s; }
        .scroll-delay-3 { transition-delay: 0.3s; }

        /* Seamless infinite carousel animations with fade edges */
        @keyframes scrollRightToLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .carousel-row {
          position: relative;
          overflow: hidden;
          display: flex;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .carousel-track-right {
          display: flex;
          gap: 12px;
          animation: scrollRightToLeft 30s linear infinite;
          will-change: transform;
        }

        .carousel-track-right:hover {
          animation-play-state: paused;
        }

        .carousel-track-left {
          display: flex;
          gap: 12px;
          animation: scrollLeftToRight 30s linear infinite;
          will-change: transform;
        }

        .carousel-track-left:hover {
          animation-play-state: paused;
        }

        .carousel-pill {
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .carousel-pill:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .chat-bubble {
          position: relative;
          background: #F3F4F6;
          border-radius: 2rem 2rem 2rem 0.5rem;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.25rem;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
          text-align: left;
        }
        .chat-bubble:before {
          content: '';
          position: absolute;
          left: -18px;
          top: 18px;
          width: 20px;
          height: 20px;
          background: #F3F4F6;
          border-bottom-right-radius: 1.5rem;
          transform: rotate(-35deg);
          z-index: 0;
        }
      `}</style>

      {/* Navigation */}
      <header className="py-3 sm:py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <svg width="120" height="40" viewBox="0 0 240 70" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300 sm:w-[180px] sm:h-[52px]">
              <g transform="translate(25,35)">
                <circle cx="0" cy="-12" r="3" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <circle cx="0" cy="12" r="3" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <circle cx="-12" cy="0" r="3" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <circle cx="12" cy="0" r="3" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="-2" y="-2" width="4" height="4" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="-6" y="-6" width="2" height="2" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="4" y="-6" width="2" height="2" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="-6" y="4" width="2" height="2" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="4" y="4" width="2" height="2" fill="black" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
              </g>
              <text x="60" y="43" font-family="Arial, sans-serif" font-size="28" fill="black" font-weight="500" className="group-hover:fill-[#819F7D] transition-colors duration-300">Mira</text>
            </svg>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4">
            <Button
              size="sm"
              className="bg-transparent hover:bg-gray-100 text-[#152D30] font-medium rounded-full px-4 sm:px-6 py-2 border border-[#152D30]"
              onClick={() => {
                window.open('https://mira-production-e77e.up.railway.app/login', '_blank');
              }}
            >
              Login
            </Button>
            <Button
              size="sm"
              className="bg-[#152D30] hover:bg-[#1C3B3F] text-white font-medium rounded-full px-4 sm:px-6 py-2"
              onClick={() => {
                window.open('https://calendar.notion.so/meet/nkokal/0hq33q41', '_blank');
              }}
            >
              Contact
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[85vh] sm:min-h-[90vh] flex items-center px-4 sm:px-8 py-12 sm:py-0 relative overflow-hidden bg-white">
          <SubtleBackground />
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <AnimatedPill />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-gray-900 leading-[1.1] sm:leading-[0.9] font-playfair-display px-2">
                  <TypewriterText />
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-normal max-w-3xl mx-auto px-4">
                  Mira learns across your sales stack by combining LLMs and domain-specific machine learning. Give your Rev Ops and Product teams the insights they need to grow revenue.
                </p>
                {/* Modern CTA Section */}
                <div className="w-full max-w-[640px] mx-auto px-4 sm:px-6">
                  {/* Email Input + Button */}
                  <form
                    action="https://formspree.io/f/xldnavne"
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                      const originalButtonText = submitButton.textContent;

                      // Disable button during submission
                      submitButton.disabled = true;
                      submitButton.textContent = 'Submitting...';

                      // Submit to Formspree
                      fetch('https://formspree.io/f/xldnavne', {
                        method: 'POST',
                        body: formData,
                        headers: {
                          'Accept': 'application/json'
                        }
                      }).then(response => {
                        if (response.ok) {
                          // Success - show submitted message
                          submitButton.textContent = 'Submitted!';
                          submitButton.style.backgroundColor = '#E6FFD8';
                          submitButton.style.color = '#0F172A';
                          submitButton.className = 'w-full sm:w-auto h-[52px] px-7 text-[15px] font-medium rounded-full transition-all duration-200 shadow-sm whitespace-nowrap';
                          form.reset();
                          // Reset button after 3 seconds
                          setTimeout(() => {
                            submitButton.disabled = false;
                            submitButton.textContent = originalButtonText || 'Get in touch';
                            submitButton.className = 'w-full sm:w-auto h-[52px] px-7 text-[15px] font-medium text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-full transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap';
                          }, 3000);
                        } else {
                          // Handle error
                          submitButton.disabled = false;
                          submitButton.textContent = originalButtonText || 'Get in touch';
                          alert('There was a problem submitting your email. Please try again.');
                        }
                      }).catch(error => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText || 'Get in touch';
                        alert('There was a problem submitting your email. Please try again.');
                      });
                    }}
                    className="flex flex-col sm:flex-row gap-3 items-center justify-center"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="w-full sm:flex-1 h-[52px] px-5 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-white border border-[#E2E8F0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#0F172A]/10 focus:border-[#0F172A] hover:border-gray-300 transition-all duration-200 shadow-sm"
                      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto h-[52px] px-7 text-[15px] font-medium text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-full transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                    >
                      Get in touch
                    </button>
                  </form>
                </div>

                {/* Feature Highlights - Full Width */}
                <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12" style={{ marginTop: '80px', marginBottom: '60px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

                    {/* Feature 1: 100% Automated */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-[#5E1626] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ strokeWidth: 2 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h3 className="text-[0.95rem] font-semibold text-[#0F172A]">100% Automated</h3>
                      </div>
                      <p className="text-[0.875rem] text-[#475569]" style={{ lineHeight: '1.6' }}>
                        Mira continuously analyzes customer conversations to detect emerging themes, pain points, and feature requests — no tagging or manual synthesis required.
                      </p>
                    </div>

                    {/* Feature 2: Powered by NLP */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-[#5E1626] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ strokeWidth: 2 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <h3 className="text-[0.95rem] font-semibold text-[#0F172A]">Powered by NLP</h3>
                      </div>
                      <p className="text-[0.875rem] text-[#475569]" style={{ lineHeight: '1.6' }}>
                        Our models understand nuance and context, surfacing what customers actually mean across thousands of hours of calls and messages.
                      </p>
                    </div>

                    {/* Feature 3: Secure and Private */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-[#5E1626] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ strokeWidth: 2 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h3 className="text-[0.95rem] font-semibold text-[#0F172A]">Secure and Private</h3>
                      </div>
                      <p className="text-[0.875rem] text-[#475569]" style={{ lineHeight: '1.6' }}>
                        Your data stays yours. Mira connects through secure APIs, never trains on your transcripts, and meets enterprise-grade privacy standards.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-8 px-4 sm:px-8 bg-white relative" id="demo">
          <SubtleBackground />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: '#E6FFD9' }}>
                <span className="text-sm font-semibold" style={{ color: '#152D30' }}>PLATFORM</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6 text-gray-900 tracking-tight font-playfair-display">See Mira in Action</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Think of Mira as a universal interface for all your GTM apps and tooling.</p>
            </div>
          </div>
        </section>


        {/* Interactive Feature Sections */}
        
        {/* Section 1 - Real-Time GTM Intelligence */}
        <section className="py-16 px-8 bg-white relative" id="features">
          <SubtleBackground />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Dashboard LEFT */}
              <div className="order-2 lg:order-1 overflow-x-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Dashboard Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">GTM Intelligence Dashboard</h3>
                      <div className="flex items-center gap-3">
                        <input 
                          type="text" 
                          placeholder="Search insights..." 
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Transform your sales calls into actionable insights</p>
                  </div>
                  
                  <div className="flex">
                    {/* Sidebar */}
                    <div className="w-70 bg-gray-900 p-4" style={{backgroundColor: '#152D30', width: '280px'}}>
                      {/* Logo */}
                      <div className="flex items-center gap-3 mb-8">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <circle cx="16" cy="4" r="2" fill="#E6FFD9" />
                            <circle cx="16" cy="28" r="2" fill="#E6FFD9" />
                            <circle cx="4" cy="16" r="2" fill="#E6FFD9" />
                            <circle cx="28" cy="16" r="2" fill="#E6FFD9" />
                            <rect x="15" y="15" width="2" height="2" fill="#E6FFD9" />
                            <rect x="11" y="11" width="1" height="1" fill="#E6FFD9" />
                            <rect x="20" y="11" width="1" height="1" fill="#E6FFD9" />
                            <rect x="11" y="20" width="1" height="1" fill="#E6FFD9" />
                            <rect x="20" y="20" width="1" height="1" fill="#E6FFD9" />
                          </g>
                        </svg>
                        <span className="text-white font-semibold">Mira Labs</span>
                      </div>
                      
                      {/* Navigation */}
                      <nav className="space-y-2 mb-8">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white bg-opacity-10 text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                          <span className="text-sm font-medium">Overview</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium">Insights</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm font-medium">Settings</span>
                        </div>
                      </nav>
                      
                      {/* Data Status */}
                      <div className="mt-auto">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Data Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-xs text-gray-300">Gong</span>
                            <span className="text-xs text-gray-400 ml-auto">2m ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-xs text-gray-300">SFDC</span>
                            <span className="text-xs text-gray-400 ml-auto">5m ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-xs text-gray-300">Chorus</span>
                            <span className="text-xs text-gray-400 ml-auto">1h ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-6">
                      {/* Top Insights */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Insights This Week</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Insight Card 1 */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{backgroundColor: '#5B0A1E', color: 'white'}}>Pain Point</span>
                              </div>
                              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                            </div>
                            <h5 className="font-semibold text-gray-900 mb-2">Integration Complexity</h5>
                            <p className="text-sm text-gray-600 mb-3">Customers citing API setup and technical onboarding as major friction points</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                              <span>23 mentions</span>
                              <span>$450K affected</span>
                            </div>
                          </div>
                          
                          {/* Insight Card 2 */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-white" style={{backgroundColor: '#152D30'}}>Feature Request</span>
                              </div>
                              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                            </div>
                            <h5 className="font-semibold text-gray-900 mb-2">Advanced Filtering</h5>
                            <p className="text-sm text-gray-600 mb-3">Enterprise customers requesting granular data filtering and custom view capabilities</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                              <span>31 mentions</span>
                              <span>$1.2M opportunity</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Deal Risk Alerts Table */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Deal Risk Alerts</h4>
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-4 py-3 text-sm text-gray-900">Aviato</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$420,000</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{backgroundColor: '#E6FFD9', color: '#152D30'}}>Competitor</span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Persistent</span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm text-gray-900">Hooli</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$185,000</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{backgroundColor: '#5B0A1E', color: 'white'}}>Budget</span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">New Risk</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text RIGHT */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full" style={{backgroundColor: '#152D30'}}>
                  <span className="text-sm font-semibold text-white">OVERVIEW</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-normal text-gray-900 leading-tight font-playfair-display">
                  Real-Time GTM Intelligence
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get instant clarity on pipeline health, deal risks, and emerging customer trends. Our central dashboard surfaces the most critical signals from your sales calls without digging through scattered notes or transcripts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Actionable Intelligence */}
        <section className="py-16 px-8 bg-white relative">
          <SubtleBackground />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text LEFT */}
              <div className="order-1 lg:order-1 space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full" style={{backgroundColor: '#E6FFD9', color: '#152D30'}}>
                  <span className="text-sm font-semibold">INTELLIGENCE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 leading-tight font-playfair-display">
                  Actionable Intelligence
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Transform customer feedback into immediate action items for Product, Sales, and RevOps teams. Each insight comes with recommended next steps and assigns ownership for follow-up.
                </p>
              </div>
              
              {/* Dashboard RIGHT with Modal */}
              <div className="order-2 lg:order-2 relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Dashboard Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">GTM Intelligence Dashboard</h3>
                      <div className="flex items-center gap-3">
                        <input 
                          type="text" 
                          placeholder="Search insights..." 
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Transform your sales calls into actionable insights</p>
                  </div>
                  
                  <div className="flex">
                    {/* Sidebar */}
                    <div className="w-70 bg-gray-900 p-4" style={{backgroundColor: '#152D30', width: '280px'}}>
                      {/* Logo */}
                      <div className="flex items-center gap-3 mb-8">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <circle cx="16" cy="4" r="2" fill="#E6FFD9" />
                            <circle cx="16" cy="28" r="2" fill="#E6FFD9" />
                            <circle cx="4" cy="16" r="2" fill="#E6FFD9" />
                            <circle cx="28" cy="16" r="2" fill="#E6FFD9" />
                            <rect x="15" y="15" width="2" height="2" fill="#E6FFD9" />
                            <rect x="11" y="11" width="1" height="1" fill="#E6FFD9" />
                            <rect x="20" y="11" width="1" height="1" fill="#E6FFD9" />
                            <rect x="11" y="20" width="1" height="1" fill="#E6FFD9" />
                            <rect x="20" y="20" width="1" height="1" fill="#E6FFD9" />
                          </g>
                        </svg>
                        <span className="text-white font-semibold">Mira Labs</span>
                      </div>
                      
                      {/* Navigation */}
                      <nav className="space-y-2 mb-8">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white bg-opacity-10 text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                          <span className="text-sm font-medium">Overview</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium">Insights</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm font-medium">Settings</span>
                        </div>
                      </nav>
                      
                      {/* Data Status */}
                      <div className="mt-auto">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Data Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-xs text-gray-300">Gong</span>
                            <span className="text-xs text-gray-400 ml-auto">2m ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-xs text-gray-300">SFDC</span>
                            <span className="text-xs text-gray-400 ml-auto">5m ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-xs text-gray-300">Chorus</span>
                            <span className="text-xs text-gray-400 ml-auto">1h ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-6">
                      {/* Top Insights */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Insights This Week</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Clickable Insight Card */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer relative group">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{backgroundColor: '#152D30', color: 'white'}}>Feature Request</span>
                              </div>
                              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                            </div>
                            <h5 className="font-semibold text-gray-900 mb-2">Advanced Filtering</h5>
                            <p className="text-sm text-gray-600 mb-3">Enterprise customers requesting granular data filtering and custom view capabilities</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                              <span>31 mentions</span>
                              <span>$1.2M opportunity</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Modal Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900">Advanced Filtering</h3>
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{backgroundColor: '#152D30', color: 'white'}}>Feature Request</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Modal Content */}
                    <div className="p-6">
                      {/* Top Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">31</div>
                          <div className="text-sm text-gray-500">Mentions across all calls</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">$1.2M</div>
                          <div className="text-sm text-gray-500">Pipeline Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">↗</div>
                          <div className="text-sm text-gray-500">Increasing</div>
                        </div>
                      </div>
                      
                      {/* Insight Details */}
                      <div className="mb-6">
                        <p className="text-gray-700 mb-4">Enterprise customers requesting granular data filtering and custom view capabilities</p>
                      </div>
                      
                      {/* Top Call Excerpts */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Call Excerpts</h4>
                        <div className="space-y-4">
                          {/* Call Excerpt 1 */}
                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-gray-900">Hooli - Discovery Call</h5>
                              <button className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                1:32
                              </button>
                            </div>
                            <p className="text-gray-600 italic mb-3">&ldquo;The integration process is really complex for our team. We&apos;ve spent weeks trying to get this working with our existing systems. We need something more straightforward that doesn&apos;t require our engineering team to be involved in every step.&rdquo;</p>
                            <div className="text-sm text-gray-500">
                              Rep: Sarah Chen | Stage: Discovery | Deal Size: $185K
                            </div>
                          </div>
                          
                          {/* Call Excerpt 2 */}
                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-gray-900">Aviato - Enterprise Demo</h5>
                              <button className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                2:45
                              </button>
                            </div>
                            <p className="text-gray-600 italic mb-3">&ldquo;We&apos;ve been looking for advanced filtering capabilities that match our workflow. Our current solution doesn&apos;t give us the granular control we need for our enterprise-level reporting requirements.&rdquo;</p>
                            <div className="text-sm text-gray-500">
                              Rep: Mike Rodriguez | Stage: Proposal | Deal Size: $420K
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section - Two Even Horizontal Rows */}
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white relative" id="integrations">
          <div className="max-w-[1200px] mx-auto">
            {/* Main container with white background */}
            <div className="rounded-3xl py-12 px-8 sm:px-12 bg-white border border-gray-300 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                {/* Left Column - Text Content */}
                <div className="text-center lg:text-left space-y-5 lg:w-[40%]">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 leading-tight font-playfair-display">
                    Works with your tools
                  </h2>
                  <p
                    className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-md mx-auto lg:mx-0"
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                  >
                    Integrate diverse data sources to enrich Mira&apos;s knowledge and capabilities.
                  </p>
                </div>

                {/* Right Column - Two Horizontal Rows of Integration Pills */}
                <div className="flex flex-col gap-5 lg:w-[60%]">
                  {/* Row 1: Scrolling Left to Right */}
                  <div className="carousel-row">
                    <div className="carousel-track-right">
                      {/* Gong */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Burst Violet.webp" alt="Gong" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Gong</span>
                      </div>

                      {/* Salesforce */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#00A1E0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.005 5.416c.75-.796 1.845-1.306 3.046-1.306 1.56 0 2.954.9 3.689 2.205.63-.3 1.35-.45 2.101-.45 2.849 0 5.159 2.34 5.159 5.22s-2.311 5.22-5.176 5.22c-.345 0-.689-.044-1.02-.104-.645 1.17-1.875 1.95-3.3 1.95-.6 0-1.155-.15-1.65-.375-.659 1.546-2.189 2.624-3.975 2.624-1.859 0-3.45-1.169-4.05-2.819-.27.061-.54.075-.825.075-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.649 4.65-4.649 1.53 0 2.85.704 3.72 1.8"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Salesforce</span>
                      </div>

                      {/* HubSpot */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 32 32" fill="#FF7A59" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24.219 10.573v-3.792c1.026-0.479 1.682-1.505 1.688-2.641v-0.089c-0.005-1.609-1.307-2.917-2.922-2.922h-0.089c-1.615 0.005-2.922 1.307-2.927 2.922v0.089c0.005 1.125 0.656 2.146 1.672 2.63l0.016 0.010v3.802c-1.448 0.219-2.818 0.823-3.958 1.745l0.016-0.010-10.438-8.13c0.943-3.521-3.651-5.776-5.859-2.875-2.214 2.896 1.167 6.729 4.318 4.896l-0.016 0.010 10.26 7.984c-0.906 1.365-1.391 2.964-1.385 4.599 0 1.786 0.568 3.448 1.531 4.807l-0.016-0.026-3.125 3.12c-0.25-0.078-0.51-0.12-0.771-0.125h-0.005c-2.411 0-3.625 2.922-1.917 4.63 1.708 1.703 4.63 0.495 4.63-1.917-0.005-0.271-0.052-0.542-0.135-0.797l0.005 0.021 3.089-3.089c2.042 1.557 4.688 2.089 7.172 1.438 2.479-0.656 4.526-2.411 5.536-4.771 1.016-2.359 0.885-5.052-0.354-7.302-1.234-2.25-3.443-3.802-5.974-4.208l-0.052-0.010zM22.932 23.078c-3.807-0.010-5.703-4.615-3.005-7.302 2.693-2.688 7.292-0.781 7.292 3.026v0.005c0 2.359-1.911 4.271-4.276 4.271z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">HubSpot</span>
                      </div>

                      {/* Notion */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.25781 3.11684C3.67771 3.45796 3.83523 3.43193 4.62369 3.37933L12.0571 2.93299C12.2147 2.93299 12.0836 2.77571 12.0311 2.74957L10.7965 1.85711C10.56 1.67347 10.2448 1.46315 9.64083 1.51576L2.44308 2.04074C2.18059 2.06677 2.12815 2.19801 2.2327 2.30322L3.25781 3.11684ZM3.7041 4.84917V12.6704C3.7041 13.0907 3.91415 13.248 4.38693 13.222L12.5562 12.7493C13.0292 12.7233 13.0819 12.4341 13.0819 12.0927V4.32397C13.0819 3.98306 12.9508 3.79921 12.6612 3.82545L4.12422 4.32397C3.80918 4.35044 3.7041 4.50803 3.7041 4.84917ZM11.7688 5.26872C11.8212 5.50518 11.7688 5.74142 11.5319 5.76799L11.1383 5.84641V11.6205C10.7965 11.8042 10.4814 11.9092 10.2188 11.9092C9.79835 11.9092 9.69305 11.7779 9.37812 11.3844L6.80345 7.34249V11.2532L7.61816 11.437C7.61816 11.437 7.61816 11.9092 6.96086 11.9092L5.14879 12.0143C5.09615 11.9092 5.14879 11.647 5.33259 11.5944L5.80546 11.4634V6.29276L5.1489 6.24015C5.09625 6.00369 5.22739 5.66278 5.5954 5.63631L7.53935 5.50528L10.2188 9.5998V5.97765L9.53564 5.89924C9.4832 5.61018 9.69305 5.40028 9.95576 5.37425L11.7688 5.26872ZM1.83874 1.33212L9.32557 0.780787C10.245 0.701932 10.4815 0.754753 11.0594 1.17452L13.4492 2.85424C13.8436 3.14309 13.975 3.22173 13.975 3.53661V12.7493C13.975 13.3266 13.7647 13.6681 13.0293 13.7203L4.33492 14.2454C3.78291 14.2717 3.52019 14.193 3.23111 13.8253L1.47116 11.5419C1.1558 11.1216 1.02466 10.8071 1.02466 10.4392V2.25041C1.02466 1.77825 1.23504 1.38441 1.83874 1.33212Z" fill="#000000"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Notion</span>
                      </div>

                      {/* Slack */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"/>
                          <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"/>
                          <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D"/>
                          <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Slack</span>
                      </div>

                      {/* Shopify */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/shopify.svg" alt="Shopify" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Shopify</span>
                      </div>

                      {/* Zendesk */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/zendesk.svg" alt="Zendesk" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Zendesk</span>
                      </div>

                      {/* Monday.com */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Monday.com_idsCxCzY6N_0.svg" alt="Monday.com" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Monday.com</span>
                      </div>

                      {/* Duplicate set for seamless loop */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Burst Violet.webp" alt="Gong" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Gong</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#00A1E0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.005 5.416c.75-.796 1.845-1.306 3.046-1.306 1.56 0 2.954.9 3.689 2.205.63-.3 1.35-.45 2.101-.45 2.849 0 5.159 2.34 5.159 5.22s-2.311 5.22-5.176 5.22c-.345 0-.689-.044-1.02-.104-.645 1.17-1.875 1.95-3.3 1.95-.6 0-1.155-.15-1.65-.375-.659 1.546-2.189 2.624-3.975 2.624-1.859 0-3.45-1.169-4.05-2.819-.27.061-.54.075-.825.075-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.649 4.65-4.649 1.53 0 2.85.704 3.72 1.8"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Salesforce</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 32 32" fill="#FF7A59" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24.219 10.573v-3.792c1.026-0.479 1.682-1.505 1.688-2.641v-0.089c-0.005-1.609-1.307-2.917-2.922-2.922h-0.089c-1.615 0.005-2.922 1.307-2.927 2.922v0.089c0.005 1.125 0.656 2.146 1.672 2.63l0.016 0.010v3.802c-1.448 0.219-2.818 0.823-3.958 1.745l0.016-0.010-10.438-8.13c0.943-3.521-3.651-5.776-5.859-2.875-2.214 2.896 1.167 6.729 4.318 4.896l-0.016 0.010 10.26 7.984c-0.906 1.365-1.391 2.964-1.385 4.599 0 1.786 0.568 3.448 1.531 4.807l-0.016-0.026-3.125 3.12c-0.25-0.078-0.51-0.12-0.771-0.125h-0.005c-2.411 0-3.625 2.922-1.917 4.63 1.708 1.703 4.63 0.495 4.63-1.917-0.005-0.271-0.052-0.542-0.135-0.797l0.005 0.021 3.089-3.089c2.042 1.557 4.688 2.089 7.172 1.438 2.479-0.656 4.526-2.411 5.536-4.771 1.016-2.359 0.885-5.052-0.354-7.302-1.234-2.25-3.443-3.802-5.974-4.208l-0.052-0.010zM22.932 23.078c-3.807-0.010-5.703-4.615-3.005-7.302 2.693-2.688 7.292-0.781 7.292 3.026v0.005c0 2.359-1.911 4.271-4.276 4.271z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">HubSpot</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.25781 3.11684C3.67771 3.45796 3.83523 3.43193 4.62369 3.37933L12.0571 2.93299C12.2147 2.93299 12.0836 2.77571 12.0311 2.74957L10.7965 1.85711C10.56 1.67347 10.2448 1.46315 9.64083 1.51576L2.44308 2.04074C2.18059 2.06677 2.12815 2.19801 2.2327 2.30322L3.25781 3.11684ZM3.7041 4.84917V12.6704C3.7041 13.0907 3.91415 13.248 4.38693 13.222L12.5562 12.7493C13.0292 12.7233 13.0819 12.4341 13.0819 12.0927V4.32397C13.0819 3.98306 12.9508 3.79921 12.6612 3.82545L4.12422 4.32397C3.80918 4.35044 3.7041 4.50803 3.7041 4.84917ZM11.7688 5.26872C11.8212 5.50518 11.7688 5.74142 11.5319 5.76799L11.1383 5.84641V11.6205C10.7965 11.8042 10.4814 11.9092 10.2188 11.9092C9.79835 11.9092 9.69305 11.7779 9.37812 11.3844L6.80345 7.34249V11.2532L7.61816 11.437C7.61816 11.437 7.61816 11.9092 6.96086 11.9092L5.14879 12.0143C5.09615 11.9092 5.14879 11.647 5.33259 11.5944L5.80546 11.4634V6.29276L5.1489 6.24015C5.09625 6.00369 5.22739 5.66278 5.5954 5.63631L7.53935 5.50528L10.2188 9.5998V5.97765L9.53564 5.89924C9.4832 5.61018 9.69305 5.40028 9.95576 5.37425L11.7688 5.26872ZM1.83874 1.33212L9.32557 0.780787C10.245 0.701932 10.4815 0.754753 11.0594 1.17452L13.4492 2.85424C13.8436 3.14309 13.975 3.22173 13.975 3.53661V12.7493C13.975 13.3266 13.7647 13.6681 13.0293 13.7203L4.33492 14.2454C3.78291 14.2717 3.52019 14.193 3.23111 13.8253L1.47116 11.5419C1.1558 11.1216 1.02466 10.8071 1.02466 10.4392V2.25041C1.02466 1.77825 1.23504 1.38441 1.83874 1.33212Z" fill="#000000"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Notion</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"/>
                          <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"/>
                          <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D"/>
                          <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Slack</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/shopify.svg" alt="Shopify" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Shopify</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/zendesk.svg" alt="Zendesk" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Zendesk</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Monday.com_idsCxCzY6N_0.svg" alt="Monday.com" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Monday.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Scrolling Right to Left - New Logos */}
                  <div className="carousel-row">
                    <div className="carousel-track-left">
                      {/* Pipedrive */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Pipedrive_Monogram_Green background.svg" alt="Pipedrive" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Pipedrive</span>
                      </div>

                      {/* Cognism */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Cognism-Symbol-POS-RGB.svg" alt="Cognism" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Cognism</span>
                      </div>

                      {/* Clay */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/clay.webp" alt="Clay" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Clay</span>
                      </div>

                      {/* Apollo.io */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Apollo.io_idY1K1QZB-_1.svg" alt="Apollo.io" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Apollo.io</span>
                      </div>

                      {/* ZoomInfo */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/zoominfo.svg" alt="ZoomInfo" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">ZoomInfo</span>
                      </div>

                      {/* Google */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Google</span>
                      </div>

                      {/* LinkedIn */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">LinkedIn</span>
                      </div>

                      {/* OpenAI */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08L8.704 5.46a.795.795 0 00-.393.681l-.004 6.727zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5v-3z" fill="#10A37F"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">OpenAI</span>
                      </div>

                      {/* Duplicate set for seamless loop */}
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Pipedrive_Monogram_Green background.svg" alt="Pipedrive" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Pipedrive</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Cognism-Symbol-POS-RGB.svg" alt="Cognism" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Cognism</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/clay.webp" alt="Clay" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Clay</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/Apollo.io_idY1K1QZB-_1.svg" alt="Apollo.io" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">Apollo.io</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <img src="/logos/zoominfo.svg" alt="ZoomInfo" height="20" className="w-auto h-5" />
                        <span className="text-sm font-medium text-[#1E293B]">ZoomInfo</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">Google</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">LinkedIn</span>
                      </div>
                      <div className="carousel-pill group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08L8.704 5.46a.795.795 0 00-.393.681l-.004 6.727zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5v-3z" fill="#10A37F"/>
                        </svg>
                        <span className="text-sm font-medium text-[#1E293B]">OpenAI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-white py-8 sm:py-12" style={{ backgroundColor: '#1C3B3F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="group cursor-pointer">
            <svg
              width="120"
              height="120"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-500 ease-out sm:w-[200px] sm:h-[200px]"
              style={{ transform: `rotate(${logoRotation}deg)` }}
            >
              <g>
                <circle cx="16" cy="4" r="2" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <circle cx="16" cy="28" r="2" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <circle cx="4" cy="16" r="2" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <circle cx="28" cy="16" r="2" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="15" y="15" width="2" height="2" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="11" y="11" width="1" height="1" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="20" y="11" width="1" height="1" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="11" y="20" width="1" height="1" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
                <rect x="20" y="20" width="1" height="1" fill="white" className="group-hover:fill-[#819F7D] transition-colors duration-300" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 text-sm sm:text-base">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="https://calendar.notion.so/meet/nkokal/0hq33q41" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</Link>
              <Link href="https://www.linkedin.com/company/miragtm/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
            <div className="text-center sm:text-right text-xs sm:text-sm">
              © 2025 Mira Labs. Designed in Toronto, Canada 💚
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}