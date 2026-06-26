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

// Real estate demo — listing search (filter the carteira), email preview & send.
const listingSearch = document.querySelector("[data-listing-search]");

if (listingSearch) {
  const listings = Array.from(document.querySelectorAll("[data-listing]"));
  const empty = document.querySelector("[data-listing-empty]");
  const count = document.querySelector("[data-listing-count]");

  listingSearch.addEventListener("input", () => {
    const query = listingSearch.value.trim().toLowerCase();
    let visible = 0;

    listings.forEach((listing) => {
      const haystack = `${listing.textContent} ${listing.dataset.listingKeywords || ""}`.toLowerCase();
      const match = haystack.includes(query);
      listing.hidden = !match;
      if (match) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = `${visible} ${visible === 1 ? "imóvel" : "imóveis"}`;
  });
}

const emailItems = Array.from(document.querySelectorAll("[data-email-pick]"));

if (emailItems.length) {
  const emailTemplates = [
    {
      to: "antonio.almeida@email.pt",
      subject: "Confirmação da visita — T3 em Cascais (ref. LC-204)",
      body:
        "Exmo. Sr. Almeida,\n\nConfirmo a nossa visita de hoje, às 15:00, ao T3 em Cascais (ref. LC-204). A morada é Rua das Flores, 24, e estarei no local cinco minutos antes.\n\nEnvio em anexo a ficha do imóvel, com fotografias e plantas. Caso surja algum imprevisto, agradeço que me informe.\n\nCom os melhores cumprimentos,\nInês Costa — Costa Lima Mediação Imobiliária",
    },
    {
      to: "sofia.pereira@email.pt",
      subject: "Detalhes do T2 em Oeiras (ref. LC-198)",
      body:
        "Exma. Sra. Pereira,\n\nConforme combinado, envio os detalhes do T2 em Oeiras (ref. LC-198): 78 m², 2.º andar com elevador, lugar de garagem e arrecadação. Valor de 295.000 €.\n\nSegue em anexo a ficha completa, com fotografias e planta. Se for do seu agrado, posso agendar uma visita esta semana.\n\nCom os melhores cumprimentos,\nInês Costa — Costa Lima Mediação Imobiliária",
    },
    {
      to: "familia.martins@email.pt",
      subject: "Seguimento da visita — T1 em Lisboa (ref. LC-187)",
      body:
        "Exmos. Senhores Martins,\n\nAgradeço a vossa visita de ontem ao T1 na Estrela (ref. LC-187). Gostaria de saber a vossa impressão e se há alguma questão que possa esclarecer.\n\nCaso pretendam avançar, posso preparar uma simulação de condições. Fico ao vosso inteiro dispor.\n\nCom os melhores cumprimentos,\nInês Costa — Costa Lima Mediação Imobiliária",
    },
    {
      to: "rui.nunes@email.pt",
      subject: "Proposta recebida — Moradia T4 em Sintra (ref. LC-176)",
      body:
        "Exmo. Sr. Nunes,\n\nRecebemos uma proposta para a moradia T4 em Sintra (ref. LC-176) e gostaria de a apresentar pessoalmente, bem como os próximos passos até ao CPCV.\n\nTem disponibilidade para uma reunião amanhã de manhã ou ao início da tarde?\n\nCom os melhores cumprimentos,\nInês Costa — Costa Lima Mediação Imobiliária",
    },
  ];

  const emailTo = document.querySelector("[data-email-to]");
  const emailSubject = document.querySelector("[data-email-subject]");
  const emailBody = document.querySelector("[data-email-body]");
  const emailStatus = document.querySelector("[data-email-status]");
  const emailSent = document.querySelector("[data-email-sent]");
  const emailSend = document.querySelector("[data-email-send]");

  const resetStatus = () => {
    if (emailSent) emailSent.hidden = true;
    if (emailStatus) {
      emailStatus.textContent = "rascunho";
      emailStatus.classList.remove("good");
      emailStatus.classList.add("warn");
    }
    if (emailSend) emailSend.textContent = "Enviar email";
  };

  const renderEmail = (template) => {
    if (emailTo) emailTo.textContent = template.to;
    if (emailSubject) emailSubject.textContent = template.subject;
    if (emailBody) emailBody.textContent = template.body;
    resetStatus();
  };

  emailItems.forEach((item) => {
    item.addEventListener("click", () => {
      emailItems.forEach((other) => {
        const active = other === item;
        other.classList.toggle("active", active);
        other.setAttribute("aria-selected", String(active));
      });

      const index = Number(item.dataset.emailPick) || 0;
      renderEmail(emailTemplates[index] || emailTemplates[0]);
    });
  });

  if (emailSend) {
    emailSend.addEventListener("click", () => {
      if (emailSent) emailSent.hidden = false;
      if (emailStatus) {
        emailStatus.textContent = "enviado";
        emailStatus.classList.remove("warn");
        emailStatus.classList.add("good");
      }
      emailSend.textContent = "Enviado ✓";
    });
  }
}
