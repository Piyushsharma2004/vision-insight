// app/api/rooms/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Room } from '@/types';

export async function GET() {
  try {
    const result = await pool.query<Room>('SELECT * FROM hostel_rooms ORDER BY block, room_number');
    
    // Add cache control headers
    const response = NextResponse.json(result.rows);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}