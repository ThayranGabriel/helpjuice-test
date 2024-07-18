const blocks = document.getElementById("blocks");
const editor = document.getElementById("the-editor-content");

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
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const startContainer = range.startContainer;

  // Encontrar a linha atual (bloco de texto)
  let currentNode = startContainer;
  while (currentNode && currentNode !== editor) {
    if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.tagName === 'DIV') {
      break;
    }
    currentNode = currentNode.parentNode;
  }

  if (currentNode && currentNode.innerText.includes("/1")) {
    console.log("entrei aqui!");

    // Salvar a posição do cursor
    const startOffset = range.startOffset;

    // Substituir /1 por um espaço na linha atual
    currentNode.innerHTML = currentNode.innerHTML.replace("/1", " ");

    // Restaurar a posição do cursor
    const newRange = document.createRange();
    newRange.setStart(range.startContainer, startOffset - 2); // Ajustar a posição do cursor
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    // Aplicar a formatação h1 na linha atual
    document.execCommand('formatBlock', false, 'h1');
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