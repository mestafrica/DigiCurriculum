import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DIGITIZING-THE-GES-CURRICULUM',
    version: '1.0.0',
    description: ' The Platform would house competency frameworks and edtech platform assessments for basic and senior high education as well as out of school vocational and technical education in Ghana.',
  },
  servers: [
    {
      url: 'https://digitizing-the-ges-curriculum.onrender.com', // Change this to your server URL
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/usersRoutes.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
