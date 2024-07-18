const blocks = document.getElementById("blocks");
const editor = document.getElementById("the-editor-content");
const anchor = document.getElementById("anchor");

// Função para verificar a presença da barra no texto
function checkForSlash() {
  const text = editor.innerText;
  if (text.includes("/")) {
    console.log("Block sendo exibido!");
    blocks.style.display = "block";
  } else {
    blocks.style.display = "none";
  }
}

function checkForSlashOne() {
  const text = editor.innerText;
  if (text.includes("/1")) {
    console.log("entrei aqui!");
    editor.innerHTML = editor.innerHTML.replace("/1", " ");
    doRichEditCommand('formatBlock', 'h1')
  }
}

// Verifica a presença da barra quando o conteúdo do editor muda
editor.addEventListener("input", function () {
  checkForSlash();
  checkForSlashOne();
});

// Esconde o blocks quando a barra é removida ou espaço é pressionado após a barra
editor.addEventListener("keydown", function (event) {
  if (
    event.key === " " ||
    event.key === "Backspace" ||
    event.key === "Delete"
  ) {
    setTimeout(checkForSlash, 0);
  }
});

// Inicialmente verifica a barra quando uma tecla é pressionada
document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    console.log("Tecla barra (/) pressionada!");
    console.log("Block sendo exibido!");
    blocks.style.display = "block";
  }
});

anchor.addEventListener("click", function () {
    console.log("Anchor pressionado");
    blocks.style.display = "none";
    doRichEditCommand('formatBlock', 'h1')
});

function doRichEditCommand(aName, aArg){
    document.execCommand(aName,false, aArg);
  }
  
