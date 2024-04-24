import { toBase64 } from "../../utils";

export const base64UrlEncode = (arrayBuffer: ArrayBuffer): string => {
  return toBase64(String.fromCharCode(...(new Uint8Array(arrayBuffer))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export const sha256 = async (plain: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(buffer);
};

export const generateCodeVerifier = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
};

export const generateCodeChallenge = (codeVerifier: string): Promise<string> => {
  return sha256(codeVerifier);
};
