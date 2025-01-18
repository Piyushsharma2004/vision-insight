export const mockTeacherData = {
  teachers: [
    {
      name: "Amit Sharma",
      subject: "Computer Science",
      course: "Science Stream",
      status: "In Class",
      currentLoad: 4,
      maxLoad: 6,
      nextClass: "10:30 AM",
      studentAttendance: 95,
      totalStudents: 120,
      teachingHours: 28,
      rating: 4.8,
      performance: "Excellent",
      upcomingClasses: [
        { time: "10:30 AM", room: "VIB-VIB-201", subject: "DSA" },
        { time: "1:15 PM", room: "VIB-201", subject: "Flat" },
        { time: "3:00 PM", room: "VIB-204", subject: "COD" }
      ]
    },
    {
      name: "Ravi Kumar",
      subject: "Physics",
      course: "Science Stream",
      status: "Available",
      currentLoad: 3,
      maxLoad: 5,
      nextClass: "11:45 AM",
      studentAttendance: 92,
      totalStudents: 85,
      teachingHours: 24,
      rating: 4.6,
      performance: "Very Good",
      upcomingClasses: [
        { time: "11:45 AM", room: "VIB-301", subject: "Physics 101" },
        { time: "2:00 PM", room: "VIB-Lab 3", subject: "Advanced Physics" }
      ]
    },
    {
      name: "Neha Gupta",
      subject: "English Literature",
      course: "Arts Stream",
      status: "In Meeting",
      currentLoad: 5,
      maxLoad: 6,
      nextClass: "1:00 PM",
      studentAttendance: 88,
      totalStudents: 150,
      teachingHours: 32,
      rating: 4.9,
      performance: "Outstanding",
      upcomingClasses: [
        { time: "1:00 PM", room: "VIB-105", subject: "World Literature" },
        { time: "2:45 PM", room: "VIB-107", subject: "Creative Writing" }
      ]
    },
    {
      name: "Arjun Verma",
      subject: "Computer Science",
      course: "Technology Stream",
      status: "Available",
      currentLoad: 4,
      maxLoad: 6,
      nextClass: "2:15 PM",
      studentAttendance: 89,
      totalStudents: 95,
      teachingHours: 26,
      rating: 4.7,
      performance: "Very Good",
      upcomingClasses: [
        { time: "2:15 PM", room: "VIB-Lab 1", subject: "Programming" },
        { time: "4:00 PM", room: "VIB-Lab 1", subject: "Web Development" }
      ]
    },
    {
      name: "Pooja Reddy",
      subject: "Chemistry",
      course: "Science Stream",
      status: "In Class",
      currentLoad: 5,
      maxLoad: 6,
      nextClass: "11:00 AM",
      studentAttendance: 93,
      totalStudents: 110,
      teachingHours: 30,
      rating: 4.5,
      performance: "Excellent",
      upcomingClasses: [
        { time: "11:00 AM", room: "VIB-Lab 2", subject: "Organic Chemistry" },
        { time: "2:30 PM", room: "VIB-Lab 2", subject: "Advanced Chemistry" }
      ]
    },
    {
      name: "Suresh Iyer",
      subject: "Biology",
      course: "Medical Stream",
      status: "In Class",
      currentLoad: 6,
      maxLoad: 6,
      nextClass: "10:00 AM",
      studentAttendance: 91,
      totalStudents: 102,
      teachingHours: 29,
      rating: 4.6,
      performance: "Very Good",
      upcomingClasses: [
        { time: "10:00 AM", room: "VIB-104", subject: "Botany" },
        { time: "1:30 PM", room: "VIB-Lab 1", subject: "Human Anatomy" }
      ]
    },
    {
      name: "Priya Menon",
      subject: "History",
      course: "Arts Stream",
      status: "Available",
      currentLoad: 4,
      maxLoad: 5,
      nextClass: "11:30 AM",
      studentAttendance: 85,
      totalStudents: 95,
      teachingHours: 23,
      rating: 4.4,
      performance: "Good",
      upcomingClasses: [
        { time: "11:30 AM", room: "VIB-202", subject: "Ancient History" },
        { time: "3:00 PM", room: "VIB-204", subject: "World Wars" }
      ]
    },
    {
      name: "Rajesh Singh",
      subject: "Economics",
      course: "Commerce Stream",
      status: "In Class",
      currentLoad: 5,
      maxLoad: 6,
      nextClass: "9:45 AM",
      studentAttendance: 90,
      totalStudents: 105,
      teachingHours: 28,
      rating: 4.7,
      performance: "Excellent",
      upcomingClasses: [
        { time: "9:45 AM", room: "VIB-303", subject: "Microeconomics" },
        { time: "1:00 PM", room: "VIB-305", subject: "Macroeconomics" }
      ]
    },
    {
      name: "Anjali Deshmukh",
      subject: "Political Science",
      course: "Arts Stream",
      status: "Available",
      currentLoad: 4,
      maxLoad: 5,
      nextClass: "10:45 AM",
      studentAttendance: 87,
      totalStudents: 98,
      teachingHours: 24,
      rating: 4.5,
      performance: "Very Good",
      upcomingClasses: [
        { time: "10:45 AM", room: "VIB-106", subject: "Indian Constitution" },
        { time: "2:00 PM", room: "VIB-108", subject: "World Politics" }
      ]
    },
    {
      name: "Kiran Patel",
      subject: "Statistics",
      course: "Commerce Stream",
      status: "In Meeting",
      currentLoad: 3,
      maxLoad: 5,
      nextClass: "12:15 PM",
      studentAttendance: 88,
      totalStudents: 120,
      teachingHours: 22,
      rating: 4.6,
      performance: "Very Good",
      upcomingClasses: [
        { time: "12:15 PM", room: "VIB-307", subject: "Probability" },
        { time: "3:45 PM", room: "VIB-309", subject: "Data Analysis" }
      ]
    }
  ],
  performanceData: [
    { name: "Amit S.", attendance: 95, hours: 28, rating: 4.8 },
    { name: "Ravi K.", attendance: 92, hours: 24, rating: 4.6 },
    { name: "Neha G.", attendance: 88, hours: 32, rating: 4.9 },
    { name: "Arjun V.", attendance: 89, hours: 26, rating: 4.7 },
    { name: "Pooja R.", attendance: 93, hours: 30, rating: 4.5 },
    { name: "Suresh I.", attendance: 91, hours: 29, rating: 4.6 },
    { name: "Priya M.", attendance: 85, hours: 23, rating: 4.4 },
    { name: "Rajesh S.", attendance: 90, hours: 28, rating: 4.7 },
    { name: "Anjali D.", attendance: 87, hours: 24, rating: 4.5 },
    { name: "Kiran P.", attendance: 88, hours: 22, rating: 4.6 }
  ]
};
