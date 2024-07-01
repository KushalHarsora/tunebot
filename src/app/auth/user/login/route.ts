import connect from '@/db/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const { values } = await request.json();
        console.log(values); // debug line

        const user = await User.findOne({ email: values.email });
        console.log(user);
        
        if (!user) {
            // Check if User does not exist
            return NextResponse.json({ error: "User Does not Exist" }, { status: 401 });
        } else {
            // Validate Password
            const validatePassword = await bcryptjs.compare(values.password, user.password);
            if (validatePassword) {

                const tokenData = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }
                // Create Token
                const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });
                const response = NextResponse.json({ message: "Login Successful", name: user.username }, { status: 200 });
                // Set Cookies
                response.cookies.set("token", token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24,
                });

                return response;
            } else {
                return NextResponse.json({ error: "Invalid Credentials" }, { status: 409 });
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Some Error occurred" }, { status: 500 });
    }
}