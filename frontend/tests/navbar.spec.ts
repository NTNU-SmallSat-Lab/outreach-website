import { test, expect } from '@playwright/test';

test('HomepageNavbarTest', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('SmallSatLabBlogProjectsAbout')).toBeVisible();
  await expect(page.getByRole('navigation')).toContainText('SmallSatLab');
  await expect(page.getByRole('navigation')).toContainText('Blog');
  await expect(page.getByRole('button', { name: 'Projects' })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'About'}).click();
  await expect(page.getByRole('link', { name: 'Team' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Partners' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('button').nth(3)).toBeVisible();
});

test('NavbarTest', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Blog' }).click({
      clickCount: 10
    });
    await expect(page.getByRole('main')).toContainText('Blog');
    await page.getByRole('button', { name: 'Projects' }).click();
    await page.getByRole('button', { name: 'About' }).click();
    await page.getByRole('link', { name: 'Team' }).click();
    await page.getByRole('button', { name: 'About' }).click();
    await page.getByRole('link', { name: 'Partners' }).click();
    await expect(page.getByRole('main')).toContainText('Partners and Collaborators');
    await page.getByRole('button', { name: 'About' }).click();
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.getByRole('main')).toContainText('Contact');
    
  });