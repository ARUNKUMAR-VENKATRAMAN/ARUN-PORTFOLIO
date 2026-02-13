import React from 'react'

const Projects = () => {
  const projects = [
    {
      title: 'SAREEORA E-Commerce',
      description:
        'A full-stack e-commerce application with user and admin authentication, product management, and shopping cart integration.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      liveLink: 'https://sareeora.netlify.app',
      githubLink: 'https://github.com/mern-labs/Ecommerce',
      image: 'sareeora.png',
    },
    {
      title: 'TODO APP',
      description:
        'Contact management app with real-time add, edit, and delete functionality, featuring a responsive UI and secure database integration.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      liveLink: 'https://varuntodoapp.netlify.app/',
      githubLink: 'https://github.com/ARUNKUMAR-VENKATRAMAN/TODO-APP',
      image: 'TODO.png',
    },
    {
      title: 'The Brand MENZO E-Commerce',
      description:
        "A full-stack men's collection e-commerce application with user and admin authentication, product management, and shopping cart integration.",
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      liveLink: 'https://thebrandmenzo.netlify.app/',
      githubLink: 'https://github.com/MERN-ARATTAI/FRESH_DEV',
      image: 'menzo.png',
    },
    {
      title: 'SQE Static Website',
      description:
        'A responsive landing page built with React.js and Tailwind CSS, featuring a modern UI and smooth performance.',
      technologies: ['React.js', 'Tailwind CSS'],
      liveLink: 'https://arunkumar-venkatraman.github.io/SQE-Design/',
      githubLink: 'https://github.com/ARUNKUMAR-VENKATRAMAN/SQE-Design',
      image: 'sqe.png',
    },
    {
      title: 'Personal Portfolio',
      description:
        'A responsive portfolio website built with React.js, Tailwind CSS, and backend technologies, featuring a modern UI and optimized performance.',
      technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      liveLink: '#',
      githubLink: 'https://github.com/ARUNKUMAR-VENKATRAMAN/ARUN-PORTFOLIO',
      image: 'portfolio.png',
    },
    {
      title: 'Netflix Clone',
      description:
        'A responsive Netflix clone UI with a clean, modern layout, smooth browsing experience, and visually engaging design.',
      technologies: ['HTML', 'CSS'],
      liveLink: 'https://warm-pie-9c684f.netlify.app/',
      githubLink: 'https://github.com/ARUNKUMAR-VENKATRAMAN/Netflix-clone',
      image: 'netflix.png',
    },
  ]

  return (
    <section id="projects" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Animations */}
        <div className="text-center mb-16 animate-fadeInDown">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-pulse-slow">
            Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fadeInUp animate-delay-200">
            Here are some of my recent projects that showcase my skills
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl border border-gray-300 flex flex-col h-full animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-600">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full transition-all duration-300 hover:scale-110 hover:bg-indigo-600 hover:text-white cursor-default"
                      style={{ animationDelay: `${index * 100 + techIndex * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom keyframes to your tailwind.config.js file */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        
        .animate-delay-200 {
          animation-delay: 200ms;
        }
        
        .animate-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </section>
  )
}

export default Projects