import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

const pollyClient = new PollyClient({ region: "us-east-1" }); // AWS will handle credentials

function getQueryParameter(event, key) {
    const value = event.queryStringParameters?.[key];
    if (!value) {
        throw new Error(`Could not get the query parameter "${key}".`);
    }
    return value;
}

async function createAudioData(voiceID, text) {
    const pollyParams = {
        OutputFormat: "mp3",
        Text: text,
        VoiceId: voiceID,
    };

    try {
        const command = new SynthesizeSpeechCommand(pollyParams);
        const { AudioStream } = await pollyClient.send(command);
        return AudioStream;
    } catch (error) {
        throw new Error(`Polly error: ${error.message}`);
    }
}

export const handler = async (event) => {
    try {
        const qpVoiceID = getQueryParameter(event, "voice");
        const qpText = getQueryParameter(event, "text");

        const audioData = await createAudioData(qpVoiceID, qpText);
        const audioBuffer = await streamToBuffer(audioData);

        return {
            statusCode: 200,
            headers: {
                "content-type": "audio/mpeg",
            },
            body: audioBuffer.toString("base64"),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

// Helper function to convert stream to buffer
async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}
