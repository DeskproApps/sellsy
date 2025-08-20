function base64UrlEncode(input: ArrayBuffer): string {
    const uint8Array = new Uint8Array(input)
    let binaryString = ''
    uint8Array.forEach(byte => {
        binaryString += String.fromCharCode(byte)
    });
    return btoa(binaryString)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

function generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array)
    return base64UrlEncode(array.buffer)
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
    return base64UrlEncode(hashBuffer)
}

export async function generatePKCEPair(): Promise<{ codeVerifier: string, codeChallenge: string }> {
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    return {
        codeVerifier,
        codeChallenge
    }
}