document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("form-feedback");
  const btnText = form.querySelector(".btn-text");
  const spinner = form.querySelector(".btn-spinner");
  const button = form.querySelector("button");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    feedback.className = "form-feedback visible";
    feedback.textContent = "Enviando mensagem...";

    btnText.textContent = "Enviando...";
    spinner.classList.remove("hidden");
    button.disabled = true;

    try {

      // 🔐 Executa reCAPTCHA no momento do envio
      const token = await grecaptcha.execute('SUA_SITE_KEY', {
        action: 'contact_form'
      });

      document.getElementById("recaptcha_token").value = token;

      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        feedback.classList.add("success");
        feedback.textContent = result.message;
        form.reset();
      } else {
        feedback.classList.add("error");
        feedback.textContent = result.message;
      }

    } catch (err) {
      feedback.classList.add("error");
      feedback.textContent = "Erro de conexão.";
    }

    btnText.textContent = "Enviar Mensagem";
    spinner.classList.add("hidden");
    button.disabled = false;

    feedback.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

});