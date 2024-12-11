const { chromium } = require('playwright');
const { login } = require('./app/auth/services');
const { createChat, talkChat, accessChat, scrollDown, addReactions, uploadFile } = require('./app/chat/services');
const { addProfileImage } = require('./app/profile/services');
const { generateAiResponse } = require('./app/ai/services');

// 단일 테스트 계정 설정
const TEST_ACCOUNT = {
  email: 'test@test.com',
  password: 'test1234'
};

const chatName = "asdfasdf";
const site = "http://3.35.19.209:3000/";
const filename = './photo/test.jpeg';
const aiMention = "@wayneAI";
const findText = "hello";
const msg = "hello";

// 로그인 함수
async function loginTestUser(page) {
  try {
    await page.goto(site);
    await login(page, TEST_ACCOUNT.email, TEST_ACCOUNT.password);
  } catch (e) {
    console.error('Error during login:', e);
    throw e;
  }
}

async function createNewChat(page) {
  await loginTestUser(page);
  const chatId = `chat_${Date.now()}`;
  await createChat(page, chatId);
}

async function scrollChat(page) {
  await loginTestUser(page);
  await scrollDown(page);
}

async function sendMessageToChat(page) {
  await loginTestUser(page);
  await accessChat(page, chatName);
  await talkChat(page, msg);
}

async function reactionToMessage(page) {
  await loginTestUser(page);
  await accessChat(page, chatName);
  await addReactions(page, findText);
}

async function uploadFileToChat(page) {
  await loginTestUser(page);
  await accessChat(page, chatName);
  await uploadFile(page, filename);
}

async function updateProfileImage(page) {
  await loginTestUser(page);
  await addProfileImage(page, filename);
}

async function generateChatAiResponse(page) {
  await loginTestUser(page);
  await accessChat(page, chatName);
  await generateAiResponse(page, aiMention);
}

module.exports = {
  createNewChat,
  scrollChat,
  sendMessageToChat,
  reactionToMessage,
  uploadFileToChat,
  updateProfileImage,
  generateChatAiResponse
};

