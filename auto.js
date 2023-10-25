const puppeteer = require("puppeteer");
const ExcelJS = require("exceljs");
const fs = require("fs");

  // ---- Projeto de Automação de Cadastros ----

// 1 Validar o acesso
// 2 Coletar as informações 
// 3 Mandar as informações em tempo real para a interface escolhida

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(
    "// URL do Site"
  );

  const usernameField = await page.$x('xpath');
  const passwordField = await page.$x('xpath');
  const orgaoDropdown = await page.$x('xpath');
  const orgaoOption = await page.$x('xpath');

  await usernameField[0].type("// username");
  await passwordField[0].type("// password");

  // Selecione o setor
  await orgaoDropdown[0].click(); 
  await orgaoOption[0].click(); 

  const loginButton = await page.$x('xpath');
  await loginButton[0].click();
  await page.waitForSelector('xpath');

  await page.goto(
    "// URL do Site"
  );

  await page.waitForSelector(".xpath ");

  const links = await page.$$(".xpath ");

  const numerosDeProcesso = [];

  for (const link of links) {
    const texto = await page.evaluate((el) => el.textContent, link);
    const numeroProcesso = texto.replace(/[\s\-\.\<wbr>]/g, ""); // Remove espaços, traços e <wbr>
    numerosDeProcesso.push(numeroProcesso);
  }

  // ---- Passo 3 - Enviar os dados coletados para o Excel ----

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Processos");

  worksheet.addRow(["Número do Processo"]); // Cabeçalho

  for (const numeroProcesso of numerosDeProcesso) {
    worksheet.addRow([numeroProcesso]);
  }

  const filePath = "SuperPy.xlsx";
  await workbook.xlsx.writeFile(filePath);

  console.log(`Números dos processos foram salvos em ${filePath}`);

  await browser.close();
})();
