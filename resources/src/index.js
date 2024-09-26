import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import loadTestUrl from "./load-test.js";

const app = express();
const port = 3000;

//NOTE - Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LoadTest Project",
      version: "1.0.0",
      description: "This is a server for a Load Test Project",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./resources/src/index.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
//NOTE - Path of Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

/**
 * @swagger
 * /load-test:
 *   get:
 *     summary: Run a load test
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *           example: 'https://advertisement-api.daofa.biz/api/v1/banners/FindMany?page=1&limit=100'
 *         required: false
 *         description: .
 *       - in: query
 *         name: apiKey
 *         schema:
 *           type: string
 *           example: 'apiKey'
 *         required: false
 *         description: The API key to authenticate the request (optional).
 *     responses:
 *       200:
 *         description: Load test executed successfully.
 *       400:
 *         description: Bad Request - URL parameter is required.
 */
//NOTE - Load Test with out input parameters
// app.get("/load-test", async (req, res) => {
//   await import("./load-test.js"); // Load test script
//   res.send("Load test is running. Check the console for results.");
// });

//NOTE - Load Test with input parameters
app.get("/load-test", async (req, res) => {
  const { url, apiKey } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  await loadTestUrl(url, apiKey);
  res.send("Load test is running. Check the console for results.");
});

// App listening
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/api-docs`);
});
