// app/api/rooms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Room } from '@/types';

export const dynamic = 'force-dynamic';  // This is crucial - forces dynamic rendering
export const revalidate = 0;  // Disable revalidation cache

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query<Room>('SELECT * FROM hostel_rooms ORDER BY block, room_number');
    
    
    const response = NextResponse.json(result.rows);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
    
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}