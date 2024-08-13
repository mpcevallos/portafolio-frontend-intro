//#yellow
document.addEventListener("DOMContentLoaded", function () {
  const ratingForm = document.getElementById("ratingForm");
  const nameField = document.getElementById("nameField");
  const descriptionField = document.getElementById("descriptionField");
  const ratingStars = document.getElementById("ratingStars");
  const stars = ratingStars.querySelectorAll(".star");
  const resultBox = document.getElementById("resultsContainer");
  const resultRating = document.getElementById("selectedRatingText");
  const resultDescription = document.getElementById("commentText");
  const messageBox = document.getElementById("messageBox");
  const successMessage = document.getElementById("successMessage");
  //#

  //#purple
  let selectedRating = 0;
  let userName = "N/A"; // Inicializamos con "N/A" por defecto
  //#

  //#green
  console.log("Nombre de usuario ingresado:", nameField.value);
  console.log("Comentario ingresado:", descriptionField.value);
  //#

  //#orange
  function highlightStars(count) {
    for (let j = 1; j <= 5; j++) {
      const star = ratingStars.children[j - 1];
      if (j <= count) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    }
  }
  //#

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star", "text-", "mx-1");
    star.innerHTML = "&#9733;";

    star.addEventListener("mouseover", function () {
      highlightStars(i);
    });

    star.addEventListener("mouseout", function () {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", function () {
      selectedRating = i;
      highlightStars(i);
    });

    ratingStars.appendChild(star);
  }

  ratingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    userName = nameField.value; // Obtenemos el nombre del usuario aquí
    console.log("Nombre de usuario ingresado:", userName);

    const description = descriptionField.value;
    console.log("Comentario ingresado:", description);

    if (selectedRating) {
      const ratingText = formatRatingText(selectedRating);

      resultRating.textContent = ratingText;
      resultDescription.textContent = description;

      // Mostrar los datos en el cuadro de mensaje
      document.getElementById("userName").textContent = userName;
      messageBox.innerHTML = `
      <p>Nombre de usuario: ${userName}</p>
      <p>Calificación seleccionada: ${selectedRating}</p>
      <p>Descripción: ${description}</p>
      `;
      //messageBox.style.display = "block";
      resultBox.style.display = "block";

      showSuccessMessage();

      nameField.value = "";
      descriptionField.value = "";
      selectedRating = 0;
      highlightStars(selectedRating);
    } else {
      showError("Por favor, seleccione una calificación.");
    }
  });

  function formatRatingText(rating) {
    return `${rating} estrella${rating > 1 ? "s" : ""}`;
  }

  function showSuccessMessage() {
    successMessage.style.color = "green";
    successMessage.textContent = "¡Gracias por calificarnos!";
  }

  function showError(message) {
    successMessage.style.color = "red";
    successMessage.textContent = message;
  }
});

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  "use strict";

  const storedTheme = localStorage.getItem("theme");

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = function (theme) {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      document.body.classList.add("dark-mode"); // Añade la clase 'dark-mode'
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
      if (theme === "dark") {
        document.body.classList.add("dark-mode"); // Añade la clase 'dark-mode'
      } else {
        document.body.classList.remove("dark-mode"); // Elimina la clase 'dark-mode'
      }
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme) => {
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
    });

    btnToActive.classList.add("active");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (storedTheme !== "light" || storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        localStorage.setItem("theme", theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  });
})();
