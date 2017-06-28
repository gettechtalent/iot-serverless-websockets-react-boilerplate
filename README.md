# Serverless WebSockets chat based on AWS IoT and React

This is the source code for the [Serverless AWS IoT tutorial](http://gettechtalent.com/blog/tutorial-real-time-frontend-updates-with-react-serverless-and-websockets-on-aws-iot.html#react). It's a WebSockets chat app demonstration. The back-end is built on AWS Lambda using the [Serverless Framework](https://serverless.com/). The front-end is built on ReactJS using Bootstrap and [Create React App](https://github.com/facebookincubator/create-react-app).

Read below for how to set it up.

## Set up the project

- Log in into your AWS account or set up one https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

- Create `serverless-deployer` IAM user
  - Navigate IAM -> Users and click "Add User"
  - Set "User name" to `serverless-deployer`
  - Set "Access type" to "Programmatic access" and click "Next"
  - Click "Attach existing policies directly"
  - Select "AdministratorAccess" from the list and click "Next"
  - Review information and click "Create user"
  - Click "Download .csv"

- Create `iot-connector` IAM user
  - Navigate IAM -> Users and click "Add User"
  - Set "User name" to `iot-connector`
  - Set "Access type" to "Programmatic access" and click "Next"
  - Click "Attach existing policies directly"
  - Select "AWSIoTDataAccess" from the list and click "Next"
  - Review information and click "Create user"
  - Click "Download .csv"

- Create a folder for the project: `mkdir serverless-aws-iot; cd serverless-aws-iot`

- Clone the repository: `git clone https://github.com/gettechtalent/REPO-LINK-HERE.git`

## Set up the back-end

- Navigate to the back-end folder: `cd backend`

- Install serverless: `npm install -g serverless`

- Configure serverless from the `serverless-deployer` .csv file
`serverless config credentials --provider aws --key <Access key ID> --secret <Secret access key> --profile serverless-demo`

- Edit `serverless.yml`. Under the `provider` section set the `region` to where your AWS Lambda functions will live. Also, make sure to set the `IOT_AWS_REGION` environment variable in the same file.

- Set `IOT_ACCESS_KEY` and `IOT_SECRET_KEY` from the `iot-connector` .csv file

- In the AWS console navigate to AWS IoT -> Settings. Set the `IOT_ENDPOINT_HOST` variable in the `serverless.yml` to the `Endpoint` that you see on the page.

- Install serverless: `npm install -g serverless`

- Install the dependencies: `npm install`

- Start up the lambdas locally: `serverless offline --port 8080 start`. You should see something like this:
![Alt text](/frontend/public/backend-start.png?raw=true "Offline listening on http://localhost:8080")

- Navigate in the browser to `localhost:8080/iot-presigned-url`. You should see something like this:
`{"url":"wss://3kdfgh39sdfyrte.iot.eu-west-1.amazonaws.com/mqtt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DSJHGRJWFICUIYWEFSSD%2F20170529%2Feu-west-1%2Fiotdevicegateway%2Faws4_request&X-Amz-Date=20170529T063531Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=435876t863fd8fk43jtygdf34598e9ghdrt439g8rytk34hfd9854y3489tfydee"}`

## Set up the front-end

- Navigate to the front-end folder: `cd ../frontend`

- Install the dependencies: `npm install`

- Start up the front-end locally: `npm start`. You should see something like this:
![Alt text](/frontend/public/frontend-start.png?raw=true "Compiled successfully!")

- Navigate in the browser to `localhost:3000`. You should see the Serverless IoT WebSockets chat app in action.

- Feel free to open several browser tabs with the app and send some chat messages. You will see `Connected users` as well as `Messages` sections populated.

![Alt text](/frontend/public/chat-window.png?raw=true "Chat app screenshot")
