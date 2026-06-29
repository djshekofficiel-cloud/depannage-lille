export function cn(...inputs: (string | undefined | null | boolean | 0)[]) {
  return inputs.filter(Boolean).join(" ");
}
