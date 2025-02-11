// app/api/students/route.ts
import { Student } from '@/types';
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query<Student>(`
      SELECT * FROM HostelStudents 
      ORDER BY hostel_name, room_number
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}