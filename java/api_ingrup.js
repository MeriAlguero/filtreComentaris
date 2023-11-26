//const apiKey = "test_1LqsH7Rr6mRIk4EG1Mw8UXPkd1BdYzph2WBIAQkY";

async function getCompletion(prompt) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: {"model": "llama2",
      "prompt": prompt}
       
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud a la API: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la función getCompletion:", error.message);
    throw error;
  }
}

const prompt = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const output = document.querySelector("#output");

button.addEventListener("click", async () => {
  try {
    if (!prompt.value) {
      alert("Por favor, ingrese su opinión antes de hacer clic en 'Submit'.");
    } else {
      const response = await getCompletion(prompt.value);
      console.log(response);

      if (response.choices && response.choices.length > 0) {
        output.innerHTML = response.choices[0].message.content;
      } else {
        alert("No se obtuvo una respuesta válida de la API.");
      }
    }
  } catch (error) {
    console.error("Error en el manejador de clics:", error.message);
  }
});
