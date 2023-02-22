//generar id
export const generateUniqueId = () => {
  let array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  let hexString = Array.from(array)
    .map((b) => b.toString(6).padStart(2, "0"))
    .join("");
  return hexString;
};
