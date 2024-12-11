const { chromium } = require('playwright');
const { addUser, login } = require('./app/auth/services');
const { createChat, talkChat, accessChat, scrollDown, addReactions, uploadFile } = require('./app/chat/services');
const { addProfileImage } = require('./app/profile/services');
const { generateAiResponse } = require('./app/ai/services');
const crypto = require('crypto');

const passwd = "123123";
const domain = "@test.com";
const chatName = "asdfasdf";
const site = "https://ktb-chat-test.goorm.team";
const filename = './photo/test.jpeg';
const aiMention = "@wayneAI";
const findText = "hello";
const msg = "hello";
const group = "group_b";
const TEST_ACCOUNT = {
  email: 'test@test.com',
  password: '123123'
};

async function registerUser(page) {
  const id = `${group}_${Date.now()}`
  const email = id + domain;

  try {
    await page.goto(site);
  } catch (e) {
    console.error('Error during page navigation:', e);
    await browser.close();
  }

  await addUser(page, id, passwd, email);
};

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

async function loginUser(page) {
  await registerUser(page);
};

async function createNewChat(page) {
  await loginTestUser(page);
  //await registerUser(page);
  await createChat(page, `${group}_${Date.now()}`);
};

async function scrollChat(page) {
  await registerUser(page);
  await scrollDown(page);
};

async function sendMessageToChat(page) {
  await registerUser(page);
  await accessChat(page, chatName);
  await talkChat(page, msg);
};

async function reactionToMessage(page) {
  await registerUser(page);
  await accessChat(page, chatName);
  await addReactions(page, findText);
};

async function uploadFileToChat(page) {
  await registerUser(page);
  await accessChat(page, chatName);
  await uploadFile(page, filename);
};

async function updateProfileImage(page) {
  await registerUser(page);
  await addProfileImage(page, filename);
};

async function generateChatAiResponse(page) {
  await registerUser(page);
  await accessChat(page, chatName);
  await generateAiResponse(page, aiMention);
};

module.exports = { registerUser, loginUser, createNewChat, scrollChat, sendMessageToChat, reactionToMessage, uploadFileToChat, updateProfileImage, generateChatAiResponse };

/* for test
let browserInstance = null;
let pageInstance = null;

const getPage = async () => {
  if (!browserInstance) {
    browserInstance = await chromium.launch({ headless: true });
    console.log("Browser launched");
  }

  if (!pageInstance) {
    pageInstance = await browserInstance.newPage();
    console.log("Page created");
    await pageInstance.goto(site);
  }
  return pageInstance;
};

const run = async () => {
  // await loginUser();
  // await createNewChat();
  // await scrollChat();
  // await sendMessageToChat();
  // await reactionToMessage();
  await uploadFileToChat();
  // await updateProfileImage();
  // await generateChatAiResponse();
};

const main = async () => {
  await run();

  if (browserInstance) {
    await browserInstance.close();
    console.log("Browser closed");
  }
};

main();
*/
