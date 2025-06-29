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

function AnimatedPill() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "AI-powered insights",
    "Real-time analytics", 
    "Customer intelligence",
    "Product feedback"
  ];
  const colors = [
    "#EDB97A", // peach
    "#FF6F6F", // coral
    "#5C1814", // deep burgundy
    "#D97B3E"  // orange
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="inline-flex items-center px-6 py-3 text-white rounded-full text-sm font-medium shadow-lg transition-colors duration-500"
      style={{ backgroundColor: colors[currentText] }}>
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
        borderColor: '#EDB97A',
        backgroundColor: 'rgba(237,185,122,0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#EDB97A',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Slow Support',
        data: [8, 10, 12, 14, 13, 15].map((value, index) => 
          index <= Math.floor(animationProgress * 5) ? value : 0
        ),
        borderColor: '#FF6F6F',
        backgroundColor: 'rgba(255,111,111,0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FF6F6F',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Missing SSO',
        data: [5, 7, 8, 10, 12, 14].map((value, index) => 
          index <= Math.floor(animationProgress * 5) ? value : 0
        ),
        borderColor: '#5C1814',
        backgroundColor: 'rgba(92,24,20,0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#5C1814',
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

// Carousel for integrations
function IntegrationsCarousel() {
  return (
    <div className="overflow-hidden w-full py-2">
      <div className="carousel-track flex items-center gap-12 animate-carousel">
        {logoBlocks()}
        {logoBlocks()}
      </div>
      <style jsx>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel 18s linear infinite;
          width: max-content;
        }
        .logo-grey svg, .logo-grey svg * {
          color: #BDBDBD;
          fill: currentColor !important;
          stroke: currentColor !important;
        }
      `}</style>
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
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
            <title>slack</title>
            <path d="M19.955 23.108c-1.74 0-3.151-1.411-3.151-3.151s1.411-3.151 3.151-3.151h7.889c1.74 0 3.151 1.411 3.151 3.151s-1.411 3.151-3.151 3.151v0zM19.955 24.693c1.739 0 3.149 1.41 3.149 3.149s-1.41 3.149-3.149 3.149c-1.738 0-3.148-1.408-3.149-3.146v-3.152zM23.108 12.044c0 1.74-1.411 3.151-3.151 3.151s-3.151-1.411-3.151-3.151v0-7.888c0-1.74 1.411-3.151 3.151-3.151s3.151 1.411 3.151 3.151v0zM24.693 12.044c0.001-1.738 1.41-3.147 3.148-3.147s3.148 1.41 3.148 3.149c0 1.738-1.408 3.147-3.145 3.149h-3.152zM12.044 8.893c1.736 0.005 3.142 1.413 3.142 3.15s-1.406 3.146-3.142 3.15h-7.888c-1.736-0.005-3.142-1.413-3.142-3.15s1.406-3.146 3.142-3.15h0zM12.044 7.305c-1.736-0.002-3.143-1.41-3.143-3.147 0-1.738 1.409-3.147 3.147-3.147s3.145 1.408 3.147 3.144v3.149zM8.893 19.955c0.005-1.736 1.413-3.142 3.15-3.142s3.146 1.406 3.15 3.142v7.889c-0.005 1.736-1.413 3.142-3.15 3.142s-3.146-1.406-3.15-3.142v-0zM7.305 19.955c-0.001 1.737-1.41 3.145-3.147 3.145s-3.147-1.409-3.147-3.147c0-1.738 1.408-3.146 3.145-3.147h3.149z"></path>
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

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F3] text-gray-900 font-inter">
      <style jsx global>{`
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
      <header className="py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 group">
            <svg width="180" height="52" viewBox="0 0 240 70" xmlns="http://www.w3.org/2000/svg" style={{display:'block', height:'60px', width:'auto'}}>
              <g transform="translate(25,35)">
                <circle cx="0" cy="-12" r="3" fill="black" />
                <circle cx="0" cy="12" r="3" fill="black" />
                <circle cx="-12" cy="0" r="3" fill="black" />
                <circle cx="12" cy="0" r="3" fill="black" />
                <rect x="-2" y="-2" width="4" height="4" fill="black" />
                <rect x="-6" y="-6" width="2" height="2" fill="black" />
                <rect x="4" y="-6" width="2" height="2" fill="black" />
                <rect x="-6" y="4" width="2" height="2" fill="black" />
                <rect x="4" y="4" width="2" height="2" fill="black" />
              </g>
              <text x="60" y="43" font-family="Arial, sans-serif" font-size="28" fill="black" font-weight="500">Mira</text>
            </svg>
          </Link>
          <nav className="flex items-center gap-6">
            <Button 
              size="sm"
              onClick={() => {
                document.getElementById('early-access-form')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                });
              }}
              className="bg-[#B3D1F7] hover:bg-[#90B8E6] text-black font-medium"
            >
              Get Early Access
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 px-4 sm:px-8 relative overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10 rounded-3xl bg-white shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 border border-gray-100" style={{
            boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease'
          }}>
            <div className="mb-6 sm:mb-8 flex items-center justify-center">
              <AnimatedPill />
            </div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8 tracking-tight fade-in delay-1 font-noto text-gray-900 leading-tight`}>
              transform sales calls into<br className="hidden sm:block" /><em className="italic">product intelligence</em>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 fade-in delay-2 max-w-2xl mx-auto leading-relaxed font-normal px-4">
              Give your PMM and Product teams the insights they need to build faster.
            </p>
            <form
              id="early-access-form"
              action="https://formspree.io/f/xldnavne"
              method="POST"
              className="flex flex-col sm:flex-row w-full max-w-md mx-auto gap-3 sm:gap-0"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-[#B3D1F7] hover:bg-[#90B8E6] text-black px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-semibold"
              >
                Get Early Access
              </button>
            </form>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-12 sm:py-24 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto scroll-animation">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-noto text-gray-900 tracking-tight`}>See Mira in Action</h2>
              <div className="flex justify-center mb-4 relative group">
                <button
                  className="px-4 sm:px-6 py-2 rounded-xl border border-gray-200 bg-white text-base sm:text-lg font-bold text-gray-900 transition-all duration-150 hover:bg-gray-100 hover:border-gray-300 focus:outline-none"
                  style={{boxShadow:'0 1px 4px 0 rgba(0,0,0,0.02)'}}
                >
                  Now in <span className="underline">Beta</span>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 -top-20 w-64 sm:w-80 bg-black text-white text-sm sm:text-base rounded-xl px-4 sm:px-6 py-4 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200 z-20" style={{whiteSpace:'pre-line'}}>
                  Mira is still in early development. Be one of the first to try it out and provide feedback!
                </div>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 font-normal">Transform your sales data into actionable insights</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-4 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  {/* Insights Panel */}
                  <div className="w-full lg:w-1/2 lg:border-r border-gray-200">
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 font-noto">Top Customer Pain Points</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full mr-3" style={{background:'#EDB97A'}}></span>
                          <span className="text-gray-700 font-medium flex-1">Integration complexity</span>
                          <span className="text-sm text-blue-600 font-semibold">23 mentions</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full mr-3" style={{background:'#FF6F6F'}}></span>
                          <span className="text-gray-700 font-medium flex-1">Pricing concerns</span>
                          <span className="text-sm text-blue-600 font-semibold">18 mentions</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full mr-3" style={{background:'#5C1814'}}></span>
                          <span className="text-gray-700 font-medium flex-1">Feature gaps</span>
                          <span className="text-sm text-blue-600 font-semibold">15 mentions</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full mr-3" style={{background:'#D97B3E'}}></span>
                          <span className="text-gray-700 font-medium flex-1">Onboarding time</span>
                          <span className="text-sm text-blue-600 font-semibold">12 mentions</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 font-noto">Recent Feature Requests</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-gray-700 font-medium">&ldquo;We need better reporting capabilities&rdquo;</p>
                          <p className="text-sm text-gray-500 mt-2 font-normal">- Enterprise Customer, 2 days ago</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-gray-700 font-medium">&ldquo;API integration with our existing tools&rdquo;</p>
                          <p className="text-sm text-gray-500 mt-2 font-normal">- Mid-market prospect, 1 week ago</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-gray-700 font-medium">&ldquo;Mobile app for on-the-go access&rdquo;</p>
                          <p className="text-sm text-gray-500 mt-2 font-normal">- SMB Customer, 3 days ago</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-gray-700 font-medium">&ldquo;Customizable dashboard widgets&rdquo;</p>
                          <p className="text-sm text-gray-500 mt-2 font-normal">- Enterprise Customer, 5 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Dashboard */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 font-noto">Win/Loss Analysis</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">68%</div>
                          <div className="text-xs text-gray-600 font-medium">Win Rate</div>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">32%</div>
                          <div className="text-xs text-gray-600 font-medium">Loss Rate</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 font-noto">Top Objections</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded-full" style={{background:'#EDB97A'}}></div>
                          <span className="text-gray-700 flex-1 font-medium">Budget constraints</span>
                          <span className="text-sm text-gray-500 font-semibold">45%</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded-full" style={{background:'#FF6F6F'}}></div>
                          <span className="text-gray-700 flex-1 font-medium">Timeline concerns</span>
                          <span className="text-sm text-gray-500 font-semibold">32%</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded-full" style={{background:'#5C1814'}}></div>
                          <span className="text-gray-700 flex-1 font-medium">Feature limitations</span>
                          <span className="text-sm text-gray-500 font-semibold">28%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-16">
                      <h4 className="text-lg font-semibold mb-4 text-gray-900">Emerging Pain Points Over Time</h4>
                      <AnimatedLineChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-display font-bold mb-6 font-noto text-gray-900 tracking-tight`}>How It Works</h2>
              <p className="text-body-xl text-gray-600 font-normal">Connect your existing tools and let AI do the heavy lifting</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center scroll-animation scroll-delay-1">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 font-noto text-gray-900">1. Connect</h3>
                <p className="text-gray-600 font-normal leading-relaxed">Integrate with Gong, Salesforce, HubSpot, and Zoom in minutes</p>
              </div>

              <div className="text-center scroll-animation scroll-delay-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                    <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/>
                    <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 font-noto text-gray-900">2. Analyze</h3>
                <p className="text-gray-600 font-normal leading-relaxed">AI processes calls, notes, and CRM data to extract insights</p>
              </div>

              <div className="text-center scroll-animation scroll-delay-3">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                    <path d="M3 3v18h18"/>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 font-noto text-gray-900">3. Surface</h3>
                <p className="text-gray-600 font-normal leading-relaxed">Get structured reports on pain points, objections, and trends</p>
              </div>

              <div className="text-center scroll-animation scroll-delay-4">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 font-noto text-gray-900">4. Act</h3>
                <p className="text-gray-600 font-normal leading-relaxed">Use insights to inform product decisions and sales strategies</p>
              </div>
            </div>

            {/* Integration Icons */}
            <div className="text-center scroll-animation">
              <h3 className="text-xl font-semibold mb-8 font-noto text-gray-900">Integrations</h3>
              <IntegrationsCarousel />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-display font-bold mb-6 font-noto text-gray-900 tracking-tight`}>AI-Powered GTM Intelligence</h2>
              <p className="text-body-xl text-gray-600 font-normal">Transform scattered sales data into actionable product insights.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors scroll-animation scroll-delay-1 group shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                    <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/>
                    <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors font-noto text-gray-900`}>Customer Intelligence</h3>
                <p className="text-gray-600 leading-relaxed font-normal">
                  Auto-analyze Gong calls to extract pain points, objections, feature requests, and voice-of-customer snippets that drive product decisions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors scroll-animation scroll-delay-2 group shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18"/>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors font-noto text-gray-900`}>Win/Loss Insights</h3>
                <p className="text-gray-600 leading-relaxed font-normal">
                  Perform automated win/loss analysis across recent deals using CRM + Gong data to understand why you&apos;re winning or losing.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors scroll-animation scroll-delay-3 group shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors font-noto text-gray-900`}>ICP Discovery</h3>
                <p className="text-gray-600 leading-relaxed font-normal">
                  Identify high-fit accounts by clustering past deals based on themes in customer language and outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full flex justify-center items-center py-6 bg-white border-t border-gray-100 mt-12">
        <div className="flex flex-row items-center gap-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="16" cy="4" r="2" fill="black" />
              <circle cx="16" cy="28" r="2" fill="black" />
              <circle cx="4" cy="16" r="2" fill="black" />
              <circle cx="28" cy="16" r="2" fill="black" />
              <rect x="15" y="15" width="2" height="2" fill="black" />
              <rect x="11" y="11" width="1" height="1" fill="black" />
              <rect x="20" y="11" width="1" height="1" fill="black" />
              <rect x="11" y="20" width="1" height="1" fill="black" />
              <rect x="20" y="20" width="1" height="1" fill="black" />
            </g>
          </svg>
          <span className="text-xl font-semibold text-gray-900">Mira</span>
          <span className="text-gray-500 text-base">© 2025 Mira Labs. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}