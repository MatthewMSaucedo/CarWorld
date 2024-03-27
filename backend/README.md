## Backend - CarWorld Serverless
``` sh
|--infra
|---+ infrastructure as code
  |
  |--lambda
  |---+ api endpoints as lambda functions
  |
  |--infra
  |---+ cloudformation to build and deploy the infrastructure stored here
    |
    |--CWCore Stack
    |---+ CWAPIGW, AuthController, AuthDB
    |--CWCommerce Stack
    |---+ CommerceController, CommerceDB
    |}--(CWForum Stack)?
  |
  |--tests
    |---+ idk it works on my machine
```

![CarWorld System Diagram](backend/CWSystemDiagram.jpg/infra?raw=true "CarWorld System Design")

### Deployment
Starting from `CarWorld/backend/infra`, create and enter a virtualenv (MacOS and Linux):
```
python3 -m venv .venv
source .venv/bin/activate # or .venv\Scripts\activate.bat for Windows
```
Install Python packages:
```
pip install -r requirements.txt
```
Make sure to install the JWT package into a special sub-directory for the validator lambda (it will get packaged into a lambda layer):
```
pip install jwt --target ./lambda/validator/jwt-layer/python/lib/python3.12/site-packages
```
The `auth` lambda function is written in JavaScript (the rest are written in Python). It needs a little extra love:
```
cd lambda/auth
npm i
mkdir zip # or rm zip/function.zip
zip -r zip/function.zip index.js package-lock.json package.json node_modules/
cd ../..
```
Then synthesize the CloudFormation template:
```
cdk synth
```
Now you can deploy with `cdk deploy` (you'll need some AWS credentials though).

At the moment, when running the frontend development server, you'll need to log into the AWS console, pull up your newly created API Gateway, and copy and paste it's API ID string into the `CW_API_GW_ID` variable in  `CarWorld/frontend/src/AppConstants.tsx`, for the frontend to be pointed at the new deployment.