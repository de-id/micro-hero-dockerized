const express = require("express");
const aws = require('aws-sdk');

const { PORT, SNS_TOPIC_ARN, AWS_ENDPOINT, AWS_DEFAULT_REGION } = process.env;

const sns = new aws.SNS({
    endpoint: AWS_ENDPOINT,
    region: AWS_DEFAULT_REGION
});


async function createApp() {
  const app = express();

  app.use(
    express.json({
      type: [
        "application/json",
        "text/plain", // AWS sends this content-type for its messages/notifications
      ],
    })
  );

  app.post("/detect", async (req, res) => {
    console.log("received request: \n", req.body);
  });

  app.listen(process.env.PORT, async () => {
    console.log(`detect is listening on port ${PORT}`);

    const subscription = await sns
      .subscribe({
        Protocol: "http",
        TopicArn: SNS_TOPIC_ARN,
        Endpoint: `http://detect:${PORT}/detect`,
      })
      .promise();
    console.log("subscription: ", subscription);
  });
}

module.exports = createApp;
