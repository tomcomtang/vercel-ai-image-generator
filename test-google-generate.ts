import { experimental_generateImage as generateImage } from 'ai';
import { google } from '@ai-sdk/google';

async function testGoogleGenerateImage() {
  try {
    const { image } = await generateImage({
      model: google.image('imagen-3.0-generate-002'),
      prompt: 'A beautiful sunset over mountains',
      size: '1024x1024',
    });

    console.log('Generated image base64 length:', image.base64.length);
    console.log('Image format:', image.mimeType);
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

testGoogleGenerateImage();
