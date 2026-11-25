(() => {
  "use strict";

  const USER_ID_KEY = "campus-connect-user-id";
  const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const state = {
    events: [],
    registrations: [],
    filter: "all",
    search: "",
    userId: localStorage.getItem(USER_ID_KEY) || "",
    selectedEvent: null,
    toastTimer: null,
  };

  const elements = {
    eventGrid: document.querySelector("#event-grid"),
    eventCount: document.querySelector("#event-count"),
    allEventCount: document.querySelector("#all-event-count"),
    registrationCount: document.querySelector("#registration-count"),
    eventSearch: document.querySelector("#event-search"),
    eventsError: document.querySelector("#events-error"),
    registrationList: document.querySelector("#registration-list"),
    registrationsError: document.querySelector("#registrations-error"),
    profileButton: document.querySelector("#profile-button"),
    registrationProfileButton: document.querySelector("#registration-profile-button"),
    profileDialog: document.querySelector("#profile-dialog"),
    profileForm: document.querySelector("#profile-form"),
    userIdInput: document.querySelector("#user-id-input"),
    profileError: document.querySelector("#profile-error"),
    eventDialog: document.querySelector("#event-dialog"),
    eventDialogTitle: document.querySelector("#event-dialog-title"),
    eventDetailContent: document.querySelector("#event-detail-content"),
    eventDetailError: document.querySelector("#event-detail-error"),
    detailRegisterButton: document.querySelector("#detail-register-button"),
    toast: document.querySelector("#toast"),
    nav: document.querySelector("#primary-nav"),
    menuToggle: document.querySelector("#menu-toggle"),
  };

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);
  }

  function validUuid(value) {
    return UUID_PATTERN.test(value.trim());
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(payload?.error || `The request failed (${response.status}).`);
    }
    return payload;
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("visible");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => elements.toast.classList.remove("visible"), 3600);
  }

  function setProfileButtons() {
    const label = state.userId ? "Change user ID" : "Set up profile";
    elements.profileButton.textContent = label;
    elements.registrationProfileButton.textContent = state.userId ? "Change user ID →" : "Add your user ID →";
  }

  function eventIsOpen(event) {
    return String(event.status || "").toLowerCase() === "open";
  }

  function visibleEvents() {
    const query = state.search.trim().toLowerCase();
    return state.events.filter((event) => {
      if (state.filter === "open" && !eventIsOpen(event)) return false;
      return !query || [event.title, event.status, event.organizer_id]
        .some((value) => String(value || "").toLowerCase().includes(query));
    });
  }

  function eventCard(event, index) {
    const id = escapeHtml(event.id);
    const title = escapeHtml(event.title || "Untitled event");
    const status = escapeHtml(event.status || "Status unavailable");
    const capacity = Number.isInteger(event.capacity) && event.capacity >= 0
      ? `Up to ${event.capacity}`
      : "Capacity not set";

    return `
      <article class="event-card">
        <div class="event-art" data-tone="${index % 6}" aria-hidden="true">
          <span class="art-shape shape-one"></span><span class="art-shape shape-two"></span><span class="art-shape shape-three"></span>
          <span class="event-category">Campus gathering</span>
          <span class="event-status" data-status="${escapeHtml(String(event.status || "").toLowerCase())}">${status}</span>
        </div>
        <div class="event-card-body">
          <h3>${title}</h3>
          <p>A chance to connect, discover something new, and make campus yours.</p>
          <div class="event-meta">
            <span class="meta-pill">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              ${escapeHtml(capacity)}
            </span>
          </div>
          <div class="event-actions">
            <button class="button button-light" type="button" data-action="details" data-event-id="${id}">Details</button>
            <button class="button button-primary" type="button" data-action="register" data-event-id="${id}" ${eventIsOpen(event) ? "" : "disabled"}>${eventIsOpen(event) ? "Join event" : "Not open"}</button>
          </div>
        </div>
      </article>`;
  }

  function renderEvents() {
    const events = visibleEvents();
    elements.eventCount.textContent = String(state.events.length);
    elements.allEventCount.textContent = String(state.events.length);
    if (events.length === 0) {
      const hasEvents = state.events.length > 0;
      elements.eventGrid.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon" aria-hidden="true">✳</span>
          <strong>${hasEvents ? "No events match that search." : "Your campus calendar is ready for its first event."}</strong>
          <p>${hasEvents ? "Try another search or switch back to all events." : "Check back soon to find something happening around campus."}</p>
          ${hasEvents && (state.search || state.filter !== "all") ? '<button class="button button-light" type="button" data-action="clear-filters">Show all events</button>' : ""}
        </div>`;
      return;
    }
    elements.eventGrid.innerHTML = events.map(eventCard).join("");
  }

  function renderRegistrations() {
    elements.registrationCount.textContent = String(state.registrations.length);
    if (!state.userId) {
      elements.registrationList.innerHTML = `
        <div class="registration-empty">
          <span class="empty-icon" aria-hidden="true">✳</span>
          <div><strong>Your next good thing is out there.</strong><p>Add your user ID to see your registrations, or browse events to find one.</p></div>
          <a class="text-link" href="#events">Browse events <span aria-hidden="true">↗</span></a>
        </div>`;
      return;
    }
    if (state.registrations.length === 0) {
      elements.registrationList.innerHTML = `
        <div class="registration-empty">
          <span class="empty-icon" aria-hidden="true">✳</span>
          <div><strong>No registrations just yet.</strong><p>Find an event that sounds like you and save your spot.</p></div>
          <a class="text-link" href="#events">Explore events <span aria-hidden="true">↗</span></a>
        </div>`;
      return;
    }

    const eventById = new Map(state.events.map((event) => [event.id, event]));
    elements.registrationList.innerHTML = `
      <div class="registration-items">
        ${state.registrations.map((registration) => {
          const event = eventById.get(registration.event_id);
          const title = event?.title || "Campus event";
          const date = registration.created_at ? new Date(registration.created_at) : null;
          const dateLabel = date && !Number.isNaN(date.valueOf())
            ? `Registered ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date)}`
            : "Registration confirmed";
          return `
            <article class="registration-item">
              <span class="registration-icon" aria-hidden="true">✳</span>
              <div class="registration-item-copy">
                <strong>${escapeHtml(title)}</strong>
                <span>${escapeHtml(dateLabel)}</span>
              </div>
              <span class="registration-status">Registered</span>
            </article>`;
        }).join("")}
      </div>`;
  }

  async function loadEvents() {
    elements.eventsError.hidden = true;
    elements.eventGrid.innerHTML = '<div class="loading-state"><span class="loading-spinner" aria-hidden="true"></span><span>Finding your campus events…</span></div>';
    try {
      const events = await api("/api/events");
      if (!Array.isArray(events)) throw new Error("The events response was not a list.");
      state.events = events;
      renderEvents();
      if (state.userId) await loadRegistrations();
    } catch (error) {
      elements.eventGrid.innerHTML = `
        <div class="error-state">
          <strong>We couldn’t load the events.</strong>
          <p>${escapeHtml(error.message)} Check that the API is available and your Supabase settings and table permissions are configured.</p>
          <button class="button button-light" type="button" data-action="retry-events">Try again</button>
        </div>`;
      elements.eventsError.hidden = true;
    }
  }

  async function loadRegistrations() {
    if (!state.userId) {
      state.registrations = [];
      renderRegistrations();
      return;
    }
    elements.registrationsError.hidden = true;
    elements.registrationList.innerHTML = '<div class="loading-state"><span class="loading-spinner" aria-hidden="true"></span><span>Loading your registrations…</span></div>';
    try {
      const registrations = await api(`/api/me/registrations?user_id=${encodeURIComponent(state.userId)}`);
      if (!Array.isArray(registrations)) throw new Error("The registrations response was not a list.");
      state.registrations = registrations;
      renderRegistrations();
    } catch (error) {
      state.registrations = [];
      renderRegistrations();
      elements.registrationsError.textContent = `Couldn’t load your registrations: ${error.message}`;
      elements.registrationsError.hidden = false;
    }
  }

  function openProfileDialog() {
    elements.profileError.hidden = true;
    elements.userIdInput.value = state.userId;
    elements.profileDialog.showModal();
    requestAnimationFrame(() => elements.userIdInput.focus());
  }

  async function openEventDetails(eventId) {
    elements.eventDialogTitle.textContent = "Loading event…";
    elements.eventDetailContent.innerHTML = '<div class="loading-state"><span class="loading-spinner" aria-hidden="true"></span><span>Loading event details…</span></div>';
    elements.eventDetailError.hidden = true;
    elements.detailRegisterButton.disabled = true;
    elements.eventDialog.showModal();
    try {
      const event = await api(`/api/events/${encodeURIComponent(eventId)}`);
      state.selectedEvent = event;
      elements.eventDialogTitle.textContent = event.title || "Untitled event";
      const details = [
        ["Status", event.status || "Not set"],
        ["Capacity", Number.isInteger(event.capacity) ? String(event.capacity) : "Not set"],
      ];
      elements.eventDetailContent.innerHTML = details.map(([label, value]) => `
        <div class="detail-cell"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
      elements.detailRegisterButton.disabled = String(event.status || "").toLowerCase() !== "open";
    } catch (error) {
      state.selectedEvent = null;
      elements.eventDialogTitle.textContent = "Event details";
      elements.eventDetailContent.replaceChildren();
      elements.eventDetailError.textContent = error.message;
      elements.eventDetailError.hidden = false;
    }
  }

  async function registerForEvent(eventId, button) {
    if (!state.userId) {
      openProfileDialog();
      showToast("Add your user UUID before registering.");
      return;
    }
    if (!validUuid(state.userId)) {
      openProfileDialog();
      showToast("Update your saved user UUID before registering.");
      return;
    }

    const originalText = button?.textContent;
    if (button) {
      button.disabled = true;
      button.textContent = "Joining…";
    }
    try {
      await api("/api/registrations", {
        method: "POST",
        body: JSON.stringify({ user_id: state.userId, event_id: eventId }),
      });
      showToast("You’re registered. See you there!");
      if (elements.eventDialog.open) elements.eventDialog.close();
      await loadRegistrations();
    } catch (error) {
      showToast(error.message);
    } finally {
      if (button?.isConnected) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  }

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((filterButton) => {
        const selected = filterButton === button;
        filterButton.classList.toggle("selected", selected);
        filterButton.setAttribute("aria-pressed", String(selected));
      });
      renderEvents();
    });
  });

  elements.eventSearch.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderEvents();
  });

  elements.eventGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.dataset.action === "details") openEventDetails(button.dataset.eventId);
    if (button.dataset.action === "register") registerForEvent(button.dataset.eventId, button);
    if (button.dataset.action === "retry-events") loadEvents();
    if (button.dataset.action === "clear-filters") {
      state.search = "";
      state.filter = "all";
      elements.eventSearch.value = "";
      document.querySelector('[data-filter="all"]').click();
    }
  });

  elements.detailRegisterButton.addEventListener("click", (event) => {
    if (state.selectedEvent) registerForEvent(state.selectedEvent.id, event.currentTarget);
  });

  elements.profileButton.addEventListener("click", openProfileDialog);
  elements.registrationProfileButton.addEventListener("click", openProfileDialog);

  elements.profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userId = elements.userIdInput.value.trim();
    if (!validUuid(userId)) {
      elements.profileError.hidden = false;
      elements.userIdInput.focus();
      return;
    }
    elements.profileError.hidden = true;
    state.userId = userId;
    localStorage.setItem(USER_ID_KEY, userId);
    setProfileButtons();
    elements.profileDialog.close();
    await loadRegistrations();
    showToast("Your user ID is saved in this browser.");
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });
  [elements.profileDialog, elements.eventDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  elements.menuToggle.addEventListener("click", () => {
    const isOpen = elements.nav.classList.toggle("open");
    elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
    elements.menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  elements.nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      elements.nav.classList.remove("open");
      elements.menuToggle.setAttribute("aria-expanded", "false");
      elements.menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      elements.eventSearch.focus();
    }
  });

  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  setProfileButtons();
  renderRegistrations();
  loadEvents();
})();
