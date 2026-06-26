const tabGroups = document.querySelectorAll("[data-demo-tabs]");

tabGroups.forEach((group) => {
  const buttons = Array.from(group.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(group.querySelectorAll("[data-tab-panel]"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabTarget;

      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        const active = panel.dataset.tabPanel === target;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    });
  });
});

const salonClientRecords = [
  {
    name: "Mia R.",
    type: "Colour client",
    status: "reply due",
    notes: "Warm brunette, patch test due before lightening.",
    preferences: "Evening slots, low-maintenance finish.",
    message: "Asked whether a consultation is needed before booking balayage.",
    action: "Reply with the consultation slot and patch-test reminder.",
    reply:
      "Hi Mia, yes, a quick consultation is best before booking balayage so we can check your hair history and patch-test timing. We have space Thursday evening if that suits.",
    button: "Reply",
    keywords: "mia colour brunette patch test lightening balayage consultation evening",
  },
  {
    name: "Aisha P.",
    type: "Regular cut",
    status: "ready",
    notes: "Fine hair, prefers soft layers and no heavy product.",
    preferences: "Saturday mornings, WhatsApp reminders.",
    message: "Due her usual six-week rebook reminder.",
    action: "Send a short WhatsApp reminder with two appointment options.",
    reply:
      "Hi Aisha, you are around six weeks from your last cut. We have Saturday morning spaces at 10:00 or 11:30 if you would like me to hold one.",
    button: "Reply",
    keywords: "aisha regular cut fine hair layers saturday whatsapp six week rebook",
  },
  {
    name: "Laura C.",
    type: "Bridal enquiry",
    status: "date to hold",
    notes: "Trial photos received, allergy note attached.",
    preferences: "Email package details, hold late July.",
    message: "Asked for package details and Saturday availability.",
    action: "Reply with package details and confirm whether to hold the trial date.",
    reply:
      "Hi Laura, I have your trial photos and allergy note. I can send the bridal package over now and hold the late July trial date until tomorrow evening.",
    button: "Reply",
    keywords: "laura bridal enquiry trial photos allergy package email july saturday",
  },
];

const clientSearch = document.querySelector("[data-client-search]");

if (clientSearch) {
  const fields = {
    name: document.querySelector("[data-client-name]"),
    type: document.querySelector("[data-client-type]"),
    status: document.querySelector("[data-client-status]"),
    notes: document.querySelector("[data-client-notes]"),
    preferences: document.querySelector("[data-client-preferences]"),
    message: document.querySelector("[data-client-message]"),
    action: document.querySelector("[data-client-action]"),
    reply: document.querySelector("[data-client-reply]"),
    primary: document.querySelector("[data-client-primary]"),
    actionButton: document.querySelector("[data-client-action-button]"),
  };

  const renderClient = (record) => {
    fields.name.textContent = record.name;
    fields.type.textContent = record.type;
    fields.status.textContent = record.status;
    fields.notes.textContent = record.notes;
    fields.preferences.textContent = record.preferences;
    fields.message.textContent = record.message;
    fields.action.textContent = record.action;
    fields.reply.textContent = record.reply;
    fields.primary.textContent = record.button;
    fields.actionButton.textContent = record.button;
  };

  clientSearch.addEventListener("input", () => {
    const query = clientSearch.value.trim().toLowerCase();
    const match =
      salonClientRecords.find((record) => {
        return `${record.name} ${record.type} ${record.keywords}`.toLowerCase().includes(query);
      }) || salonClientRecords[0];

    renderClient(match);
  });
}
