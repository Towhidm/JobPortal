import { NextRequest, NextResponse } from "next/server";
import { verifyCode } from "@/actions/verify";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    const result = await verifyCode(code);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/verify:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
