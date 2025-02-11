// types.ts
export interface Room {
    id: string;
    room_number: string;
    block: string;
    section: string;
    hostel_type: string;
    status: boolean;
  }
  
  export interface Student {
    student_name: string;
    registration_number: string;
    father_name: string;
    course: string;
    student_mobile_number: string;
    father_mobile_number: string;
    mother_mobile_number: string;
    address: string;
  }