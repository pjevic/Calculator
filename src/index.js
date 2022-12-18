const body = document.querySelector("body");
const themeBtns = document.querySelector(".header__box--buttons");
const themeSwtcher = document.querySelector("#themeSwitcher");
const input = document.querySelector(".calculator__input");
const keypad = document.querySelector(".calculator__keypad");

if (localStorage.getItem("theme") === null) {
  body.className = "theme--1";
  themeSwtcher.value = 1;
} else {
  const theme = localStorage.getItem("theme");
  body.className = `theme--${theme}`;
  themeSwtcher.value = theme;
}

themeBtns.addEventListener("click", (e) => {
  const theme = e.target.dataset.theme;
  body.className = `theme--${theme}`;
  themeSwtcher.value = theme;
  localStorage.setItem("theme", theme);
});

["input", "change"].forEach((eventType) => {
  themeSwtcher.addEventListener(eventType, () => {
    body.className = `theme--${themeSwitcher.value}`;
    localStorage.setItem("theme", themeSwtcher.value);
  });
});

let str = "";
let currentNum = "";
const operants = ["+", "-", "*", "/", "="];
keypad.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("calculator__key--0") ||
    e.target.classList.contains("calculator__key--1") ||
    e.target.classList.contains("calculator__key--2") ||
    e.target.classList.contains("calculator__key--3") ||
    e.target.classList.contains("calculator__key--4") ||
    e.target.classList.contains("calculator__key--5") ||
    e.target.classList.contains("calculator__key--6") ||
    e.target.classList.contains("calculator__key--7") ||
    e.target.classList.contains("calculator__key--8") ||
    e.target.classList.contains("calculator__key--9") ||
    e.target.classList.contains("calculator__key--add") ||
    e.target.classList.contains("calculator__key--subtract") ||
    e.target.classList.contains("calculator__key--multiply") ||
    e.target.classList.contains("calculator__key--divide")
  ) {
    if (operants.includes(e.target.value)) {
      const operant = e.target.value;
      if (str[str.length - 1] && currentNum === "") {
        str = str.replace(/.$/, operant);

        console.log(currentNum, str);
      } else {
        currentNum += operant;
        str += currentNum;
        currentNum = "";
        console.log(currentNum, str);
      }
    } else {
      currentNum += e.target.value;
      input.value = currentNum;
      console.log(currentNum, str);
    }
  }

  if (e.target.classList.contains("calculator__key--comma")) {
    if (currentNum.includes(".")) return;
    currentNum += e.target.value;
    input.value = currentNum;
  }

  if (e.target.classList.contains("calculator__key--del")) {
    if (currentNum.length === 0) return;
    currentNum = currentNum.slice(0, -1);
    input.value = currentNum;
  }

  if (e.target.classList.contains("calculator__key--reset")) {
    input.value = 0;
    currentNum = "";
    str = "";
  }

  if (e.target.classList.contains("calculator__key--equal")) {
    str += currentNum;
    currentNum = "";
    if (operants.includes(str[str.length - 1])) {
      str = str.slice(0, -1);
    }
    const expression = eval(str);
    input.value = expression;
    str = expression;
  }
});
