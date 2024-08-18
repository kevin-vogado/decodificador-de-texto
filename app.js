function inputFocus() {
  document.getElementById("inputText").focus();
}

document.addEventListener("DOMContentLoaded", inputFocus);

function clearInputText() {
  let inputText = document.getElementById("inputText");
  inputText.value = "";
}

function encryptText() {
  let inputText = document.getElementById("inputText").value;

  const toValidText =
    /[A-Z@#$%^¨&*()?":{}|<>ÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÑÕÄËÏÖÜÇáéíóúàèìòùâêîôûãñõäëïöüç]/g;
  const regexValid = /[eioua]/g;

  if (inputText === "") {
    inputFocus();
  } else {
    if (toValidText.test(inputText)) {
      alertText();
    } else {
      let textEncrypt = inputText.replace(regexValid, (textEncrypt) => {
        const replacements = new Map([
          ["e", "enter"],
          ["i", "imes"],
          ["a", "ai"],
          ["o", "ober"],
          ["u", "ufat"],
        ]);
        return replacements.get(textEncrypt);
      });

      let sizeTextEncrypt = textEncrypt.length;
      dinamicSizeInputText(sizeTextEncrypt);

      document.getElementById("outText").innerText = textEncrypt;
      clearInputText();
      modifiedAttributeHomePage();
    }
  }
}

function descryptText() {
  let inputText = document.getElementById("inputText").value;

  const toValidText =
    /[A-Z@#$%^¨&*()?":{}|<>ÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÑÕÄËÏÖÜÇáéíóúàèìòùâêîôûãñõäëïöüç]/g;
  const regexValid = /(enter|imes|ai|ober|ufat)/g;

  if (inputText === "") {
    inputFocus();
  } else {
    if (toValidText.test(inputText)) {
      alertText();
    } else {
      let textDescrypt = inputText.replace(regexValid, (textDescrypt) => {
        const replacements = new Map([
          ["enter", "e"],
          ["imes", "i"],
          ["ai", "a"],
          ["ober", "o"],
          ["ufat", "u"],
        ]);
        return replacements.get(textDescrypt);
      });

      document.getElementById("outText").innerText = textDescrypt;
      clearInputText();
      modifiedAttributeHomePage();
    }
  }
}

function copyText() {
  let outText = document.getElementById("outText").innerText;

  navigator.clipboard
    .writeText(outText)
    .then(() => {
      inputFocus();
      console.warn("Texto copiado para a área de transferência!");
    })
    .catch((err) => {
      console.error("Erro: ", err);
    });
}

function alertText() {
  let alertText = document.getElementById("alertText");
  alertText.style.color = "#FF004D";

  setTimeout(() => {
    alertText.style.color = "#495057";
  }, 500);
}

function modifiedAttributeHomePage() {
  let notfoundText = document.getElementById("notfoundText");
  let outText = document.getElementById("outText");
  let copyText = document.getElementById("copyText");

  notfoundText.style.display = "none";
  outText.style.display = "flex";
  outText.style.flexWrap = "wrap";
  copyText.style.display = "inline-block";
}

function dinamicSizeInputText(sizeTextEncrypt) {
  let inputText = document.getElementById("inputText");
  let alertTextModified = document.getElementById("alertText");
  let normalTextLength = 200;
  let maxTextLength = 500;

  if (sizeTextEncrypt > normalTextLength && sizeTextEncrypt <= maxTextLength) {
    return inputText.setAttribute("maxlength", maxTextLength);
  } else if (sizeTextEncrypt > maxTextLength) {
    alertTextModified.innerText =
      "Se aproveitando da caixa de texto extensa, ein? Não pode, quebra agora esse texto!";
    alertText();

    setTimeout(() => {
      alertTextModified.innerText = "Apenas letras minúsculas e sem acento";
    }, 10000);

    return inputText.setAttribute("maxlength", normalTextLength);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  function toModifySizeWindow() {
    let img = document.getElementById("notfoundText");

    if (window.matchMedia("(max-width: 540px)").matches) {
      img.src = "assets/image_celular.png";
    } else if (window.matchMedia("(max-width: 900px)").matches) {
      img.src = "assets/image_tablet.png";
    } else {
      img.src = "assets/image_hidden.PNG";
    }
  }

  toModifySizeWindow();

  window.addEventListener("resize", toModifySizeWindow);
});
