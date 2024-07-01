import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token");

        if (!token) {
            return NextResponse.json({ message: "Token not Found" }, { status: 400 });
        }

        const { id } = jwt.verify(token?.value, process.env.JWT_SECRET_KEY!) as { id: string };

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: "User not Found" }, { status: 400 });
        }

        return NextResponse.json({ username: user.username }, { status: 200 });
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
