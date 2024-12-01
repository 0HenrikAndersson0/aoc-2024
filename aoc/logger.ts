declare global {
    interface Console {
        xmas: (message: string) => void;
    }
  }

const christmasLogger = (text:string) => {
    console.log("\x1b[34;41m%s\x1b[0m", text)
  }
  
 export default Object.defineProperty(console, "xmas", {
    value: function (message: string) {
      christmasLogger(`"🎄 ${message} 🎅"`);
    },
    writable: true,
    configurable: true
  });
  