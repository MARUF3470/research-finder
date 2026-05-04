import { hash } from "bcrypt";

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, address, phone, image } =
      await request.json();
    const hashPassword = await hash(password, 10);
    const user = await db.user.create({
      data: {
        name,
        email,
        address,
        phone,
        password: hashPassword,
        image,
      },
    });
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 },
    );
  } catch (error) {
    console.log('full error')
     return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
