import { NextResponse } from 'next/server';
import pool from '@/lib/db';

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

        // Split the combined room number (e.g., "316-B") into base number and section
        const [baseRoomNumber, section] = roomNumber.split('-');

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

        if (result.rows.length === 0) {
            return NextResponse.json(
                { message: 'No student found for this room' },
                { status: 404 }
            );
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch student data' },
            { status: 500 }
        );
    }
}