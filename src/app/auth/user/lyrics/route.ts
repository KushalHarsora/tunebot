import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

// select model to use
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const input = data?.input + ` in context of music in english. Also provide the chorus, verse and outros. Also provide the suitable scale for the song.`;

        const result = await model.generateContent(input);
        const responseText = result.response;
        const text = responseText.text();

        return NextResponse.json({ message: "Got Prompt", text: text}, { status: 200 });
    } catch (error: any) {
        console.error("Error", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}