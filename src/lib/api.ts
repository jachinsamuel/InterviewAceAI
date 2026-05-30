import { NextResponse } from 'next/server';
import { APIResponse } from '@/types';

export function successResponse<T>(data: T, message = 'Success', status = 200) {
  return NextResponse.json<APIResponse<T>>(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(code: string, message: string, status = 400, details?: any) {
  return NextResponse.json<APIResponse<null>>(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}

export function validateRequired(data: Record<string, any>, fields: string[]) {
  const missing = fields.filter((field) => !data[field]);
  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missing.join(', ')}`,
    };
  }
  return { valid: true, error: '' };
}

export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
