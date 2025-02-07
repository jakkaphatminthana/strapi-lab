import { randomUUID } from 'crypto'

export function generateSlug(input: string): string {
  // Remove leading and trailing whitespace
  const trimmedInput = input.trim();

  // Replace spaces with hyphens and make the string lowercase
  const slug = trimmedInput.replace(/\s+/g, "-").toLowerCase();

  // Remove any characters that are not alphanumeric or hyphens, except Thai characters
  const cleanSlug = slug.replace(/[^a-zA-Z0-9ก-๙-]/g, "");

  // Remove consecutive hyphens
  const finalSlug = cleanSlug.replace(/-+/g, "-");

  return finalSlug;
}

export function generateShortID(): string {
  return randomUUID().split("-")[0];
}