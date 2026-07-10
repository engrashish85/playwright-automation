import { test, expect } from '@playwright/test';

test.describe('FakeStore API', () => {
  test('should validate the product details for product 1', async ({ request }) => {
    const baseUrl = 'https://fakestoreapi.com';
    const childUrl = '/products/1';
    const apiUrl = `${baseUrl}${childUrl}`;

    const response = await request.get(apiUrl);

    // Validate status code and content type
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    // Validate JSON structure and expected values
    expect(responseBody).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      })
    );

    // Additional schema-style validation for key fields
    expect(typeof responseBody.id).toBe('number');
    expect(responseBody.id).toBe(1);
    expect(typeof responseBody.title).toBe('string');
    expect(responseBody.title).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    expect(typeof responseBody.price).toBe('number');
    expect(typeof responseBody.description).toBe('string');
    expect(typeof responseBody.category).toBe('string');
    expect(typeof responseBody.image).toBe('string');
  });
});
