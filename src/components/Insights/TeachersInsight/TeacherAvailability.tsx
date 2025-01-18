import React, { useState, useEffect } from 'react';
import { User, Clock, BookOpen, Award, Users, Filter, TrendingUp, Calendar, Search, BookMarked } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTeacherData } from './mockTeacherData';

interface UpcomingClass {
  time: string;
  room: string;
  subject: string;
}

interface Teacher {
  name: string;
  subject: string;
  course: string;
  status: 'In Class' | 'Available' ;
  currentLoad: number;
  maxLoad: number;
  nextClass: string;
  studentAttendance: number;
  totalStudents: number;
  teachingHours: number;
  rating: number;
  performance: string;
  upcomingClasses: UpcomingClass[];
}

interface PerformanceData {
  name: string;
  attendance: number;
  hours: number;
  rating: number;
}

const TeacherAvailability: React.FC = () => {
  const [filterOption, setFilterOption] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeacherData = async () => {
    try {
      // Simulating API fetch with mock data
      setTeachers(mockTeacherData.teachers);
      setPerformanceData(mockTeacherData.performanceData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchTeacherData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Get unique courses and subjects for filters
  const courses = [...new Set(teachers.map(t => t.course))];
  const subjects = [...new Set(teachers.map(t => t.subject))];

  const filterTeachers = (): Teacher[] => {
    if (!teachers) return [];
    
    let filtered = [...teachers];
    
    if (searchQuery) {
      filtered = filtered.filter(teacher => 
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (courseFilter !== 'all') {
      filtered = filtered.filter(t => t.course === courseFilter);
    }

    if (subjectFilter !== 'all') {
      filtered = filtered.filter(t => t.subject === subjectFilter);
    }

    switch (filterOption) {
      case 'highAttendance':
        return filtered.filter(t => t.studentAttendance >= 90);
      case 'lowAttendance':
        return filtered.filter(t => t.studentAttendance < 90);
      case 'available':
        return filtered.filter(t => t.status === 'Available');
      case 'inClass':
        return filtered.filter(t => t.status === 'In Class');
      case 'highRating':
        return filtered.filter(t => t.rating >= 4.5);
      default:
        return filtered;
    }
  };

  const getStatusColor = (status: Teacher['status']): string => {
    switch (status) {
      case 'In Class':
        return 'bg-green-500/20 text-green-500';
      case 'Available':
        return 'bg-blue-500/20 text-blue-500';
      default:
        return 'bg-yellow-500/20 text-yellow-500';
    }
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-blue-500';
    return 'text-yellow-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      {/* Header and Filters */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white pb-2">Teacher Availability</h2>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <select 
              className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-sm"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            <select 
              className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-sm"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <select 
              className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-sm"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All Teachers</option>
              <option value="highAttendance">High Attendance (≥90%)</option>
              <option value="lowAttendance">Low Attendance (＜90%)</option>
              <option value="available">Available Now</option>
              <option value="inClass">In Class</option>
              <option value="highRating">High Rating (≥4.5)</option>
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search teachers..."
                className="bg-gray-100 dark:bg-gray-700 rounded-lg pl-8 pr-3 py-1 text-sm min-w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-2 top-1.5 text-gray-500" />
            </div>
          </div>
        </div>

       
      </div>

      {/* Teacher Cards */}
      <div className="max-h-[75vh] overflow-y-auto pr-2">
        {filterTeachers().map((teacher, index) => (
          <div key={index} className="border mb-2 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
            {/* Teacher Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{teacher.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{teacher.subject}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">{teacher.course}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(teacher.status)}`}>
                {teacher.status}
              </span>
            </div>

            {/* Stats Grid */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[120px] bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Attendance</span>
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-lg font-semibold">{teacher.studentAttendance}%</div>
                <div className="text-xs text-gray-500">{teacher.totalStudents} students</div>
              </div>
              
              <div className="flex-1 min-w-[120px] bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Hours</span>
                  <Clock className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-lg font-semibold">{teacher.teachingHours}h</div>
                <div className="text-xs text-gray-500">This week</div>
              </div>

              <div className="flex-1 min-w-[120px] bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
                <div className={`text-lg font-semibold ${getRatingColor(teacher.rating)}`}>
                  {teacher.rating}/5.0
                </div>
                <div className="text-xs text-gray-500">{teacher.performance}</div>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="border-t dark:border-gray-700 pt-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Upcoming Classes</h4>
              <div className="space-y-2">
                {teacher.upcomingClasses.map((cls, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{cls.time} - {cls.subject}</span>
                    </div>
                    <span className="text-gray-500">Room {cls.room}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
       {/* Performance Overview */}
        {/* <div className="h-48 mt-5 mr-5 ">
          
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#22c55e" name="Attendance %" />
              <Bar dataKey="hours" fill="#3b82f6" name="Teaching Hours" />
              <Bar dataKey="rating" fill="#eab308" name="Rating" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
    </div>
  );
};

export default TeacherAvailability;