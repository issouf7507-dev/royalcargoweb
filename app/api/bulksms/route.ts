import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = await fetch("https://api.orange.com/oauth/v3/token", {
      method: "POST",
      headers: {
        Authorization: `Basic WVp6UVZRTnJMZTAwYWNEZUFaMHAxSWIwRXh2QzZZQjc6WEx0NEpEb092bnJlQzJnTmdvc1MzbUlZWWxpMGlUVE43NHg4RGRlVElHWXk=`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur:", error); // Log de l'erreur en cas de problème
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
