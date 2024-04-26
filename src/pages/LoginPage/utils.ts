import { get, map } from "lodash";

export const toBase64 = (payload: string): string => {
  if (!window || typeof window.btoa !== "function") {
    throw new Error("Base64 encoding is not supported in this environment.");
  }

  return window.btoa(payload);
}

export const base64UrlEncode = (arrayBuffer: ArrayBuffer): string => {
  const byteArray = new Uint8Array(arrayBuffer);
  const charArray = map(byteArray, (byte) => String.fromCharCode(byte));
  const strFromBuffer = charArray.join("");

  return toBase64(strFromBuffer)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export const sha256 = async (plain: string): Promise<string> => {
  if (!crypto || !crypto.subtle || typeof crypto.subtle.digest !== "function") {
    throw new Error("SHA-256 digest is not supported in this environment.");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  try {
    const buffer = await crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(buffer);
  } catch (error) {
    throw new Error(`Error computing SHA-256: ${get(error, ["message"], "")}`);
  }
};

export const generateCodeVerifier = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
};

export const generateCodeChallenge = (codeVerifier: string): Promise<string> => {
  return sha256(codeVerifier);
};
