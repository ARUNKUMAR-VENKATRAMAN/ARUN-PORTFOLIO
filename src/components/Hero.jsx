import React from 'react'

const Hero = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = 'ARUNKUMAR V_MERN.pdf'
    link.download = 'ARUN.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-100px) rotate(-10deg); }
          100% { opacity: 1; transform: translateX(0) rotate(0); }
        }
        
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(100px) rotate(10deg); }
          100% { opacity: 1; transform: translateX(0) rotate(0); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes typewriter {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes blink {
          50% { border-color: transparent; }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-left {
          animation: slide-in-left 1s ease-out;
        }
        
        .animate-fade-in-right {
          animation: slide-in-right 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .animate-typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid;
          animation: typewriter 2s steps(40) 1s 1 normal both,
                     blink 0.75s step-end infinite;
          width: 0;
        }
        
        .animate-scale-in {
          animation: scale-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .hover-lift:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .profile-img-wrapper {
          position: relative;
          transition: all 0.5s ease;
        }
        
        .profile-img {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
        }
        
        .profile-img:hover {
          transform: scale(1.08) rotate(3deg);
        }
        
        .button-glow {
          position: relative;
          overflow: hidden;
        }
        
        .button-glow::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .button-glow:hover::after {
          opacity: 1;
        }
        
        .text-gradient-animate {
          background: linear-gradient(45deg, #4f46e5, #9333ea, #4f46e5);
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-indigo-50 pt-20 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated grid lines */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Profile Picture */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <div className="relative animate-fade-in-left">
                {/* Profile Image Container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-120 lg:h-120 profile-img-wrapper animate-float">
                  <img
                    src="Profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500 shadow-xl profile-img relative z-10"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="text-center md:text-left order-1 md:order-2">
              <div className="animate-fade-in-right">
                <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6 animate-scale-in">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    Welcome to my portfolio
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 lg:mb-8">
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Hi, I'm{' '}
                  </span>
                  <span className="inline-block text-gradient-animate animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    ARUNKUMAR
                  </span>
                </h1>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 lg:mb-12 leading-relaxed">
                    A skilled{' '}
                    <span className="relative inline-block">
                      <span className="relative z-10 font-semibold text-indigo-600">Full Stack Developer</span>
                      <span className="absolute bottom-0 left-0 w-full h-3 bg-indigo-200 opacity-30 z-0 transform -rotate-1"></span>
                    </span>{' '}
                    building scalable, high-performance web applications with modern technologies and clean, maintainable code.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 lg:gap-6 md:justify-start justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  <a
                    href="#contact"
                    className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl button-glow hover-lift"
                  >
                    Contact Me
                  </a>
                  
                  <button
                    onClick={handleDownloadResume}
                    className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl flex items-center gap-2 button-glow hover-lift"
                  >
                    <svg
                      className="w-4 h-4 animate-bounce-slow"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero