//hostel student data
'use client';
import { useState, useEffect } from 'react';
import { Student } from '@/types';
import { Search, UserPlus, Filter, Phone, User, Book, MapPin } from 'lucide-react';

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hostelFilter, setHostelFilter] = useState<'all' | 'AC' | 'Non-AC'>('all');
  

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registration_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHostel = hostelFilter === 'all' || student.hostel_type === hostelFilter;
    return matchesSearch && matchesHostel;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-2xl font-bold">Hostel Students</div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full md:w-64"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setHostelFilter('all')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  hostelFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                <Filter className="h-4 w-4" />
                All
              </button>
              <button
                onClick={() => setHostelFilter('AC')}
                className={`px-4 py-2 rounded-lg ${
                  hostelFilter === 'AC' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                AC
              </button>
              <button
                onClick={() => setHostelFilter('Non-AC')}
                className={`px-4 py-2 rounded-lg ${
                  hostelFilter === 'Non-AC' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                Non-AC
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course & Registration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Information
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.student_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.student_name}</div>
                        <div className="text-sm text-gray-500">Father: {student.father_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Room {student.room_number}</div>
                    <div className="text-sm text-gray-500">
                      {student.hostel_name} ({student.hostel_type})
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900">{student.course}</div>
                        <div className="text-sm text-gray-500">{student.registration_number}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        {student.student_mobile_number}
                      </div>
                      <div className="text-sm text-gray-500">
                        Father: {student.father_mobile_number}
                      </div>
                      <div className="text-sm text-gray-500">
                        Mother: {student.mother_mobile_number}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                        {student.address}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;