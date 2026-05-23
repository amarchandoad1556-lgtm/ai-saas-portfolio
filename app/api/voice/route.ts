export async function POST(req: Request) {
    try {
      const { text } = await req.json();
  
      const apiKey = process.env.ELEVENLABS_API_KEY;
  
      console.log("ELEVENLABS KEY EXISTS:", !!apiKey);
  
      if (!apiKey) {
        return Response.json(
          { error: "Missing ELEVENLABS_API_KEY" },
          { status: 500 }
        );
      }
  
      const voiceId = "21m00Tcm4TlvDq8ikWAM";
  
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "xi-api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
  
        console.log("ELEVENLABS ERROR:", errorText);
  
        return Response.json(
          { error: errorText },
          { status: 500 }
        );
      }
  
      const audioBuffer = await response.arrayBuffer();
  
      return new Response(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
        },
      });
    } catch (error: any) {
      console.log("VOICE ROUTE ERROR:", error);
  
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }