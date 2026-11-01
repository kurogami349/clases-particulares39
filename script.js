/* CONFIGURACIÓN INICIAL
   Reemplaza el valor de whatsappNumber por tu número chileno con código de país,
   sin +, espacios ni guiones. Ejemplo de formato: 56912345678
*/
const SITE_CONFIG = {
  whatsappNumber: "569XXXXXXXX",
  brandName: "Tu marca educativa"
};

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
const directWhatsapp = document.getElementById("directWhatsapp");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-subject]").forEach(link => {
  link.addEventListener("click", () => {
    const subject = link.dataset.subject;
    const subjectSelect = document.getElementById("subject");
    const matchingOption = [...subjectSelect.options].find(option => option.value === subject);
    if (matchingOption) subjectSelect.value = subject;
  });
});

function hasConfiguredWhatsapp() {
  return /^569\d{8}$/.test(SITE_CONFIG.whatsappNumber);
}

function openWhatsapp(message) {
  if (!hasConfiguredWhatsapp()) {
    feedback.textContent = "El formulario está preparado. Para enviar solicitudes, primero configura tu número de WhatsApp en script.js.";
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

directWhatsapp.addEventListener("click", event => {
  event.preventDefault();
  openWhatsapp(`Hola, quisiera recibir información sobre las clases particulares de ${SITE_CONFIG.brandName}.`);
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const message = [
    `Hola, quisiera solicitar información sobre las clases particulares de ${SITE_CONFIG.brandName}.`,
    "",
    `Estudiante: ${data.get("studentName")}`,
    `Quien consulta: ${data.get("contactName") || "No indicado"}`,
    `Nivel: ${data.get("level")}`,
    `Curso: ${data.get("grade")}`,
    `Asignatura: ${data.get("subject")}`,
    `Modalidad: ${data.get("mode")}`,
    `Comuna: ${data.get("commune") || "No indicada"}`,
    `Disponibilidad: ${data.get("availability") || "Por coordinar"}`,
    `Objetivo: ${data.get("message") || "Por conversar"}`
  ].join("\n");
  openWhatsapp(message);
});
