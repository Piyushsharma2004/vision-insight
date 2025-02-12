import { NextResponse } from 'next/server';
import pool from '@/lib/db';
// api/students/room/route.ts
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const roomNumber = searchParams.get('roomNumber');
        const block = searchParams.get('block');

        if (!roomNumber || !block) {
            return NextResponse.json(
                { error: 'Room number and block are required' },
                { status: 400 }
            );
        }

        const query = `
            SELECT 
                hs.student_name,
                hs.father_name,
                hs.course,
                hs.registration_number,
                hs.student_mobile_number,
                hs.father_mobile_number,
                hs.mother_mobile_number,
                hs.address
            FROM HostelStudents hs
            WHERE hs.room_number = $1
            AND hs.hostel_name = $2
        `;

        const result = await pool.query(query, [roomNumber, block]);
        
        // Add cache control headers
        const response = NextResponse.json(
            result.rows.length ? result.rows[0] : { message: 'No student found for this room' },
            { status: result.rows.length ? 200 : 404 }
        );
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        
        return response;
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch student data' },
            { status: 500 }
        );
    }
}