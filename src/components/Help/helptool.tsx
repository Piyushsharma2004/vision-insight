'use client'
import React, { useState } from 'react';
import { 
  Book, Users, BarChart2, Map, Zap, Phone, Mail, MessageCircle,
  ChevronDown, Search, AlertCircle, Video, FileText, Clock,
  BookOpen, Wrench, Award
} from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';

const HelpComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState(['team']); // Team section always expanded

  const supportTeam = [
    {
      name: "Piyush Sharma",
      role: "Technical & Development",
      contact: "9460994274",
      email: "piyushsharmanova@gmail.com",
      github: "https://github.com/piyushsharma2004",
      linkedin: "https://linkedin.com/in/piyushsharmanova",
      photoUrl: "/images/team/piyush.jpg"
    },
    {
      name: "Prakhar Sharma",
      role: "Technical & Development",
      contact: "9660401770",
      email: "pklegend048@gmail.com",
      github: "https://github.com/legend048",
      linkedin: "https://linkedin.com/in/prakhar-sharma-6024a728b",
      photoUrl: "/images/team/prakhar.png"
    }
  ];

  // Additional features
  const features = [
    {
      title: "Time Table Management",
      icon: Book,
      description: "View and manage class schedules, teacher assignments, and room allocations."
    },
    {
      title: "Live Student Count",
      icon: Users,
      description: "Real-time monitoring of student occupancy in each classroom."
    },
    {
      title: "Reports & Analytics",
      icon: BarChart2,
      description: "Generate detailed reports on classroom utilization and attendance patterns."
    },
    {
      title: "Map Insights",
      icon: Map,
      description: "Visual representation of classroom occupancy across campus buildings."
    },
    {
      title: "Electricity Monitoring",
      icon: Zap,
      description: "Track and optimize electricity usage in classrooms."
    },
    {
      title: "Video Tutorials",
      icon: Video,
      description: "Step-by-step video guides for all major features."
    },
    {
      title: "Documentation",
      icon: FileText,
      description: "Comprehensive system documentation and user guides."
    },
    {
      title: "Attendance Tracking",
      icon: Clock,
      description: "Monitor and manage student attendance records."
    }
  ];

  // New Resources section
  const resources = [
    {
      title: "User Guide",
      icon: BookOpen,
      link: "#",
      description: "Complete documentation for all features"
    },
    {
      title: "Troubleshooting Guide",
      icon: Wrench,
      link: "#",
      description: "Solutions to common technical issues"
    },
    {
      title: "Best Practices",
      icon: Award,
      link: "#",
      description: "Tips for optimal system usage"
    }
  ];

  const toggleSection = (section: string) => {
    if (section === 'team') return; // Prevent team section from collapsing
    setExpandedSection(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const filterContent = (content: string) => {
    return content.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 mb-4">
            Help & Support Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions, explore our features, and get in touch with our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                     focus:ring-2 focus:ring-red-500 focus:border-transparent
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Resources Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md 
                       border border-red-200 dark:border-red-800
                       hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <resource.icon className="w-6 h-6 text-red-600 dark:text-red-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {resource.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {resource.description}
              </p>
            </a>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.filter(item => 
              filterContent(item.title) || filterContent(item.description)
            ).map((feature, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-red-200 dark:border-red-800
                         hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <feature.icon className="w-5 h-5 text-red-600 dark:text-red-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Team Section */}
        <div className="bg-white text-center dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
             Development Team
          </h2>
          <div className='flex flex-row justify-center' >
          <div className="flex  m-4">
            {supportTeam.filter(item => 
              filterContent(item.name) || filterContent(item.role)
            ).map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
          </div>
        </div>

        {/* Live Chat Support */}
        <div className="fixed bottom-6 right-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-red-600 hover:bg-red-700 
                           dark:bg-red-700 dark:hover:bg-red-600
                           text-white transition-colors shadow-lg">
            <MessageCircle className="w-5 h-5" />
            <span>Live Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpComponent;