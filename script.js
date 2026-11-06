/* CONFIGURACIÓN DEL SITIO */
const SITE_CONFIG = {
  contactEmail: "hhenriquez2023@udec.cl",
  brandName: "Tu marca educativa"
};

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

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

document.querySelectorAll("[data-plan]").forEach(link => {
  link.addEventListener("click", () => {
    const plan = link.dataset.plan;
    const planSelect = document.getElementById("plan");
    if (planSelect) planSelect.value = plan;
  });
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const subject = `Consulta por clases particulares - ${data.get("studentName")}`;
  const body = [
    `Hola, quisiera solicitar información sobre las clases particulares de ${SITE_CONFIG.brandName}.`,
    "",
    `Estudiante: ${data.get("studentName")}`,
    `Quien consulta: ${data.get("contactName") || "No indicado"}`,
    `Nivel: ${data.get("level")}`,
    `Curso: ${data.get("grade")}`,
    `Asignatura: ${data.get("subject")}`,
    `Plan de interés: ${data.get("plan")}`,
    `Modalidad: ${data.get("mode")}`,
    `Comuna: ${data.get("commune") || "No indicada"}`,
    `Disponibilidad: ${data.get("availability") || "Por coordinar"}`,
    `Objetivo: ${data.get("message") || "Por conversar"}`
  ].join("\n");
  const mailto = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  feedback.textContent = "Se preparó tu correo. Revisa tu aplicación de correo para enviarlo.";
});
