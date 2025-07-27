'use server';

/**
 * @fileOverview Product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  productId: z.string().describe('The ID of the product the user is viewing.'),
  productName: z.string().describe('The name of the product the user is viewing.'),
  productDescription: z.string().describe('The description of the product the user is viewing.'),
  cartProductIds: z.array(z.string()).optional().describe('The IDs of the products currently in the user\'s cart.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProductIds: z.array(z.string()).describe('The IDs of the recommended products.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a helpful AI assistant that recommends related products to users based on the product they are currently viewing and the products in their cart.

  The user is currently viewing the following product:
  Product ID: {{{productId}}}
  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}

  {{#if cartProductIds}}
  The user has the following products in their cart:
  {{#each cartProductIds}}
  - {{{this}}}
  {{/each}}
  {{else}}
  The user has no products in their cart.
  {{/if}}

  Based on this information, what other products would you recommend to the user? Please only respond with a list of product IDs.
  `,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
