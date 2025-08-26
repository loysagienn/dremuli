export function readJsonFile(file: File) {
  return new Promise((resolve, reject) => {
    // Optional: quick extension check
    if (!file.name.endsWith(".json")) {
      reject(new Error("Only JSON files supported"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        try {
          const parsed = JSON.parse(reader.result);
          resolve(parsed); // Valid JSON content
        } catch (err) {
          reject(new Error("Invalid JSON content"));
        }
      } else {
        reject(new Error("Unexpected file format"));
      }
    };

    reader.onerror = () => reject(new Error("Error reading file"));

    reader.readAsText(file);
  });
}
