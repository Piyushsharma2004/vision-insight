import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        // Query to join hostel_rooms with HostelStudents, handling the different room number formats
        const query = `
            SELECT 
                hr.*,
                hs.student_name,
                hs.father_name,
                hs.course,
                hs.registration_number,
                hs.student_mobile_number,
                hs.father_mobile_number,
                hs.mother_mobile_number,
                hs.address
            FROM hostel_rooms hr
            LEFT JOIN HostelStudents hs 
                ON CONCAT(hr.room_number, '-', hr.section) = hs.room_number
            ORDER BY 
                CAST(hr.room_number AS INTEGER),
                hr.section;
        `;

        const result = await pool.query(query);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch room data' },
            { status: 500 }
        );
    }
}