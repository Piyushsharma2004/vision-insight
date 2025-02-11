// types/index.ts
export interface Room {
    id: number;
    room_number: string;
    section: string;
    block: string;
    hostel_type: string;
    status: boolean;
  }
  
  export interface Student {
    student_id: number;
    hostel_name: string;
    hostel_type: 'AC' | 'Non-AC';
    room_number: string;
    student_name: string;
    father_name: string;
    course: string;
    registration_number: string;
    student_mobile_number: string;
    father_mobile_number: string;
    mother_mobile_number: string;
    address: string;
  }
  
  export interface User {
    id: number;
    emp_id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    username: string;
    department: string;
  }