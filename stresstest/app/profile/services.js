const { expect } = require('@playwright/test');
const path = require('path');

const addProfileImage = async (page, filename, site) => {


  await page.goto(`${site}/profile`); //site 안쓰고 버튼눌러서 이동하기...?
  console.info('Navigated to profile page');

  console.log(page.url());
  //const changeImageButton = page.locator('button._3PIsE.vapor-Button-md.vapor-Button-secondary_fill.rounded-full.p-2.mt-3');
  //await changeImageButton.click();
  //*[@id="radix-:r1:"]/div/div/div/div[2]/button[1]
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('xpath=/html/body/div/div/main/div/article/div/div/div/div/div[2]/button[1]').click(), //초기 경우에도 프로필 변경할 수 있게 변경하기
  ]);
  // //*[@id="__next"]/div/nav/div/div/div[2]/div/button[1]
  // /html/body/div/div/nav/div/div/div[2]/div/button
  //#radix-\:r1\: > div > div > div > div.mt-6 > button._3PIsE.vapor-Button-md.vapor-Button-secondary_fill.rounded-full.p-2.mt-3
  await fileChooser.setFiles(path.resolve(filename));
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(3000);

  console.info('Profile image added');
};

module.exports = { addProfileImage };
