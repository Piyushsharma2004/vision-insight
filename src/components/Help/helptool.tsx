'use client'
import React, { useState } from 'react';
import { 
  Book, 
  Users, 
  BarChart2, 
  Map, 
  Zap, 
  Phone, 
  Mail, 
  MessageCircle,
  ChevronDown,
  Search,
  AlertCircle
} from 'lucide-react';

const HelpComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const commonErrors = [
    {
      error: "Data Not Loading",
      solution: "Check your internet connection or refresh the page. If the issue persists, clear browser cache."
    },
    {
      error: "Export Failed",
      solution: "Ensure you've selected valid date ranges and classrooms. Try exporting smaller date ranges if dealing with large datasets."
    },
    {
      error: "Live Count Not Updating",
      solution: "The system updates every 5 minutes. If counts aren't changing, check sensor connectivity."
    },
    {
      error: "Invalid Time Table Entry",
      solution: "Ensure all required fields are filled and time slots don't overlap."
    }
  ];

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
      description: "Track and optimize electricity usage in classrooms (Beta feature)."
    }
  ];

  const supportTeam = [
    {
      name: "Piyush Sharma",
      role: "Lead Developer",
      contact: "9460994274",
      email: "piyushsharmanova@gmail.com"
    },
    {
      name: "Prakhar Sharma",
      role: "Technical Support",
      contact: "9660401770",
      email: "prakharsharma@gmail.com"
    },
   
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const filterContent = (content: string) => {
    return content.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 mb-4">
            Help Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find answers to common questions and learn more about our features
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

        {/* Common Errors Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-red-200 dark:border-red-800">
          <div 
            className="p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection('errors')}
          >
            <div className="text-red-600 dark:text-red-500 flex items-center gap-2 text-lg font-semibold">
              <AlertCircle className="w-5 h-5" />
              Common Issues & Solutions
            </div>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                expandedSection === 'errors' ? 'transform rotate-180' : ''
              }`}
            />
          </div>
          {expandedSection === 'errors' && (
            <div className="p-4 border-t border-red-200 dark:border-red-800 space-y-4">
              {commonErrors.filter(item => 
                filterContent(item.error) || filterContent(item.solution)
              ).map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-600 dark:text-red-500 mb-2">
                    {item.error}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-red-200 dark:border-red-800">
          <div 
            className="p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection('features')}
          >
            <div className="text-red-600 dark:text-red-500 text-lg font-semibold">
              Features Overview
            </div>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                expandedSection === 'features' ? 'transform rotate-180' : ''
              }`}
            />
          </div>
          {expandedSection === 'features' && (
            <div className="p-4 border-t border-red-200 dark:border-red-800">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.filter(item => 
                  filterContent(item.title) || filterContent(item.description)
                ).map((feature, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-red-200 dark:border-red-800
                             bg-white dark:bg-gray-800"
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
          )}
        </div>

        {/* Support Team Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-red-200 dark:border-red-800">
          <div 
            className="p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection('team')}
          >
            <div className="text-red-600 dark:text-red-500 text-lg font-semibold">
              Support Team
            </div>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                expandedSection === 'team' ? 'transform rotate-180' : ''
              }`}
            />
          </div>
          {expandedSection === 'team' && (
            <div className="p-4 border-t border-red-200 dark:border-red-800">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportTeam.filter(item => 
                  filterContent(item.name) || filterContent(item.role)
                ).map((member, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-red-200 dark:border-red-800
                             bg-white dark:bg-gray-800"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {member.role}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-red-600 dark:text-red-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {member.contact}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-red-600 dark:text-red-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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