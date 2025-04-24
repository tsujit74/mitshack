export async function askGemini(prompt) {
    // const res = await fetch("http://localhost:5000/api/gemini", {
      const res = await fetch("https://mits-y0ny.onrender.com/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
  
    const data = await res.json();
    return data.reply || "Sorry, I couldn't understand that.";
  }
  