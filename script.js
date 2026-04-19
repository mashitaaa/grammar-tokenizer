const RESERVED_WORDS = new Set([
  "auto", "break", "case", "char", "class", "const", "continue", "default",
  "do", "double", "else", "enum", "extern", "false", "float", "for", "if",
  "import", "int", "let", "long", "namespace", "new", "null", "private",
  "protected", "public", "return", "short", "signed", "static", "string",
  "struct", "switch", "true", "try", "typedef", "unsigned", "using", "void",
  "while", "var", "function", "print"
]);

const SYMBOLS = new Set([
  "{", "}", "(", ")", "[", "]", ";", ",", ".", ":", "?", "!", "<", ">", "&",
  "|", "~", "==", "!=", "<=", ">=", "&&", "||"
]);

const MATH_OPERATORS = new Set([
  "+", "-", "*", "/", "%", "^", "=", "+=", "-=", "*=", "/="
]);

const codeInput = document.getElementById("codeInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");

const totalToken = document.getElementById("totalToken");
const reserveCount = document.getElementById("reserveCount");
const symbolCount = document.getElementById("symbolCount");
const variableCount = document.getElementById("variableCount");
const mathCount = document.getElementById("mathCount");

const reserveList = document.getElementById("reserveList");
const symbolList = document.getElementById("symbolList");
const variableList = document.getElementById("variableList");
const mathList = document.getElementById("mathList");
const tokenTableBody = document.getElementById("tokenTableBody");
const tableTokenCount = document.getElementById("tableTokenCount");

function tokenize(code) {
  const regex = /"[^"\n]*"|'[^'\n]*'|[A-Za-z_]\w*|\d+(?:\.\d+)?|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||[{}()[\];,.:?+\-*/%=<>!&|^~]/g;
  const lines = code.split("\n");
  const tokens = [];

  lines.forEach((lineText, idx) => {
    const matches = lineText.match(regex) || [];
    matches.forEach((token) => {
      tokens.push({
        line: idx + 1,
        token
      });
    });
  });

  return tokens;
}

function extractMathExpressions(lines) {
  const results = [];
  const mathLineRegex = /(=|\+|-|\*|\/|%|\^|sqrt|sin|cos|tan|log|pow)\s*/i;

  lines.forEach((line) => {
    const cleaned = line.trim();
    if (!cleaned) {
      return;
    }
    if (mathLineRegex.test(cleaned) && /[\dA-Za-z_]/.test(cleaned)) {
      results.push(cleaned);
    }
  });

  return results;
}

function uniqueTokens(tokens) {
  return [...new Set(tokens)];
}

function getTokenCategory(tokenObj, mathExpressionLines) {
  const token = tokenObj.token;

  if (RESERVED_WORDS.has(token)) {
    return "Reserve Word";
  }

  if (MATH_OPERATORS.has(token) || /^\d+(?:\.\d+)?$/.test(token)) {
    return "Kalimat Matematika";
  }

  if (
    SYMBOLS.has(token) ||
    /^(==|!=|<=|>=|\+\+|--|&&|\|\|)$/.test(token)
  ) {
    return "Simbol & Tanda Baca";
  }

  if (/^[A-Za-z_]\w*$/.test(token)) {
    if (mathExpressionLines.has(tokenObj.line) && /^(sin|cos|tan|log|sqrt|pow)$/i.test(token)) {
      return "Kalimat Matematika";
    }
    return "Variabel";
  }

  return "Simbol & Tanda Baca";
}

function classifyTokens(code) {
  const tokens = tokenize(code);
  const reserveWords = [];
  const symbols = [];
  const variables = [];
  const detailRows = [];
  const mathExpressionLines = new Set();

  code.split("\n").forEach((lineText, index) => {
    const cleaned = lineText.trim();
    if (/(=|\+|-|\*|\/|%|\^|sqrt|sin|cos|tan|log|pow)/i.test(cleaned) && /[\dA-Za-z_]/.test(cleaned)) {
      mathExpressionLines.add(index + 1);
    }
  });

  tokens.forEach((tokenObj) => {
    const token = tokenObj.token;
    const category = getTokenCategory(tokenObj, mathExpressionLines);
    detailRows.push({
      line: tokenObj.line,
      token,
      category
    });

    if (RESERVED_WORDS.has(token)) {
      reserveWords.push(token);
      return;
    }

    if (MATH_OPERATORS.has(token) || /^\d+(?:\.\d+)?$/.test(token)) {
      return;
    }

    if (SYMBOLS.has(token) || /^(==|!=|<=|>=|\+\+|--|&&|\|\|)$/.test(token)) {
      symbols.push(token);
      return;
    }

    if (/^[A-Za-z_]\w*$/.test(token)) {
      variables.push(token);
    }
  });

  const mathExpressions = extractMathExpressions(code.split("\n"));

  return {
    total: detailRows.length,
    reserveWords: uniqueTokens(reserveWords),
    symbols: uniqueTokens(symbols),
    variables: uniqueTokens(variables),
    mathExpressions: uniqueTokens(mathExpressions),
    detailRows
  };
}

function renderTokenList(target, items) {
  target.innerHTML = "";
  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Tidak ada token";
    target.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const chip = document.createElement("li");
    chip.textContent = item;
    target.appendChild(chip);
  });
}

function analyzeInput() {
  const code = codeInput.value;
  const output = classifyTokens(code);

  totalToken.textContent = output.total;
  tableTokenCount.textContent = output.total;
  reserveCount.textContent = output.reserveWords.length;
  symbolCount.textContent = output.symbols.length;
  variableCount.textContent = output.variables.length;
  mathCount.textContent = output.mathExpressions.length;

  renderTokenList(reserveList, output.reserveWords);
  renderTokenList(symbolList, output.symbols);
  renderTokenList(variableList, output.variables);
  renderTokenList(mathList, output.mathExpressions);
  renderTokenTable(output.detailRows);
}

function toBadgeClass(category) {
  if (category === "Reserve Word") {
    return "reserve";
  }
  if (category === "Variabel") {
    return "variable";
  }
  if (category === "Kalimat Matematika") {
    return "math";
  }
  return "symbol";
}

function renderTokenTable(rows) {
  tokenTableBody.innerHTML = "";

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3" class="empty-row">Belum ada token. Masukkan kode lalu klik Analisis Token.</td>`;
    tokenTableBody.appendChild(tr);
    return;
  }

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.line}</td>
      <td>${row.token}</td>
      <td><span class="badge ${toBadgeClass(row.category)}">${row.category}</span></td>
    `;
    tokenTableBody.appendChild(tr);
  });
}

function clearAll() {
  codeInput.value = "";
  analyzeInput();
  codeInput.focus();
}

function fillSample() {
  codeInput.value = `int a = 4;
int b = 6;
float total = a * b + 3.5;
if (total >= 20) {
  print(total);
}
f(x) = x^2 + 3*x - 1;`;
  analyzeInput();
}

analyzeBtn.addEventListener("click", analyzeInput);
clearBtn.addEventListener("click", clearAll);
sampleBtn.addEventListener("click", fillSample);

analyzeInput();
