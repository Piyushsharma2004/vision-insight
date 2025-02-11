import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Room } from '@/types';

export async function GET() {
  try {
    const result = await pool.query<Room>('SELECT * FROM hostel_rooms ORDER BY block, room_number');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}