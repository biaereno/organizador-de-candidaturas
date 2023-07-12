require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const NOTION_API_URL = process.env.NOTION_API_URL;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_HEADERS = {
  'Authorization': process.env.NOTION_API_HEADER_AUTHORIZATION,
  'Content-Type': process.env.NOTION_API_HEADER_CONTENT_TYPE,
  'Notion-Version': process.env.NOTION_API_HEADER_NOTION_VERSION
};

// Rota para receber as informações enviadas pelo formulário
app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    const notionData = transformFormDataToNotionJSON(formData);

    await axios.post(NOTION_API_URL, notionData, {
      headers: NOTION_API_HEADERS
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Função para transformar os dados do formulário em JSON no formato esperado pelo Notion
function transformFormDataToNotionJSON(formData) {
  const { nomevaga, plat, obs, tag1, tag2, tag3, tag4, tag5 } = formData;

  const multiSelectOptions = [
    { name: tag1 },
    { name: tag2 },
    { name: tag3 },
    { name: tag4 },
    { name: tag5 }
  ];

  // Filtra as opções selecionadas no multi select
  const selectedOptions = multiSelectOptions.filter(option => option.name !== '');

  return {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      'Nome da vaga': { title: [{ type: 'text', text: { content: nomevaga } }] },
      'Plataforma': { select: { name: plat } },
      'Tipo de vaga': {
        'multi_select': selectedOptions.length > 0 ? selectedOptions : []
      },
      'Observações': { rich_text: [{ text: { content: obs } }] }
    }
  };
}


// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
