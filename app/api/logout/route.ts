import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const store = await cookies();
  store.getAll().forEach(({ name }) => {
    store.delete(name);
  });
  return NextResponse.json({ cleared: true });
}
