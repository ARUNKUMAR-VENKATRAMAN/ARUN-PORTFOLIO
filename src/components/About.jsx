import React, { useState, useEffect, useRef } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="py-20 bg-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Get to know more about who I am and what I do
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-3xl font-bold text-gray-900 animate-fade-in">
              Get to know me!
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg hover:text-gray-900 transition-colors duration-300">
              I'm a <strong className="text-indigo-600">Full Stack Web Developer</strong> building the
              Front-end and Back-end of Websites and Web Applications that lead
              to the success of the overall product.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg hover:text-gray-900 transition-colors duration-300">
              I'm passionate about creating clean, efficient code and delivering
              exceptional user experiences. I love learning new technologies and
              staying up-to-date with industry trends.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg hover:text-gray-900 transition-colors duration-300">
              I'm open to <strong className="text-indigo-600">Job</strong> opportunities where I can
              contribute, learn and grow. If you have a good opportunity that
              matches my skills and experience, then don't hesitate to{' '}
              <strong className="text-indigo-600">contact</strong> me.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl mt-4 hover:scale-105 hover:-translate-y-1"
            >
              Contact Me
            </a>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-3xl font-bold text-gray-900">My Journey</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-600 pl-6 py-3 hover:border-indigo-800 transition-all duration-300 hover:translate-x-2 hover:shadow-md hover:bg-indigo-50 rounded-r-lg">
                <h4 className="font-bold text-gray-900 text-lg mb-1">Education</h4>
                <p className="text-gray-700 font-medium">
                  Master of Computer Applications
                </p>
                <p className="text-sm text-gray-500 mt-1">2023 - 2025</p>
              </div>
              <div className="border-l-4 border-indigo-600 pl-6 py-3 hover:border-indigo-800 transition-all duration-300 hover:translate-x-2 hover:shadow-md hover:bg-indigo-50 rounded-r-lg">
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  Professional Experience
                </h4>
                <p className="text-gray-700 font-medium">MERN Stack Developer Intern</p>
                <p className="text-sm text-gray-500 mt-1">2025 - Present</p>
              </div>
              <div className="border-l-4 border-indigo-600 pl-6 py-3 hover:border-indigo-800 transition-all duration-300 hover:translate-x-2 hover:shadow-md hover:bg-indigo-50 rounded-r-lg">
                <h4 className="font-bold text-gray-900 text-lg mb-1">Certifications</h4>
                <p className="text-gray-700 font-medium">
                  MERN Stack Development
                </p>
                <p className="text-sm text-gray-500 mt-1">2026</p>
                <p className="text-gray-700 font-medium mt-2">
                  Certified in Full-Stack Development Bootcamp
                </p>
                <p className="text-sm text-gray-500 mt-1">2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About