<h1 align="center">CARWORLD.LOVE
    <p><img width="120px" height="120px" alt="CW Logo" src="https://github.com/MatthewMSaucedo/CarWorld/blob/main/frontend/src/logo.svg"></p>
    <p align="center">
        <img alt="Static Badge - Made by" src="https://img.shields.io/badge/made%20by-matthewmsaucedo-blue?style=plastic&logo=github">
        <img alt="Static Badge - Stripe" src="https://img.shields.io/badge/payments-stripe-green?logo=stripe&style=plastic">
        <img alt="Static Badge - CDK" src="https://img.shields.io/badge/cdk-2.65.0-orange?style=plastic&logo=amazon">
        <img alt="Static Badge - Python" src="https://img.shields.io/badge/python-3.7-lightblue?style=plastic&logo=python">
        <img alt="Static Badge - React" src="https://img.shields.io/badge/react-18.2.0-red?style=plastic&logo=react">
        <img alt="Static Badge - Node" src="https://img.shields.io/badge/node-18.x-pink?style=plastic&logo=npm">
    </p>
</h1>

## Table of Contents:

<ul>
  <li>
    <a href="https://github.com/matthewmsaucedo/carworld#frontend-react-spa">Frontend - React SPA</a>
  </li>
  <ul>
    <li>Demo (staging environment)</li>
    <li>Navigation</li>
    <li>Helpful Errors</li>
  </ul>
  <li>
    <a href="https://github.com/matthewmsaucedo/carworld#backend-aws-serverless">Backend - AWS Serverless</a>
  </li>
  <ul>
    <li>System overview</li>
    <li>Transaction Handling</li>
    <li>Authentication</li>
    <li>CDK: Structure and Deployment</li>
  </ul>
  <li>
    <a href="https://github.com/matthewmsaucedo/carworld#license">License</a>
  </li>
</ul>

## Frontend: React SPA
<div>
<p align="center">
  <kbd>
    <img src="https://cw-readme-images.s3.amazonaws.com/desktop_home.png" alt="Car World Desktop Home">
  </kbd>
  <br />
  <span>Desktop</span>
</p>
<p align="center">
  <kbd>
    <img src="https://cw-readme-images.s3.amazonaws.com/mobile_home.png" alt="Car World Mobile Home">
  </kbd>
  <kbd>
    <img width="372px" height="615px" src="https://cw-readme-images.s3.amazonaws.com/mobile_view_open_nav.jpg" alt="Car World Mobile Home (Open Nav)">
  </kbd>
  <br />
  <span>Mobile (collapsed and expanded nav menu)</span>
</p>
</p>
</div>

### Demo
<a href="https://carworldneedsme.netlify.app/">Demo (staging environment)</a>

Want to test out a purchase?
All credit card info is just "42" repeated as needed.

I encourage you to test this out so you can see the emails we send for order confirmation!

### Navigation
Navigation in Car World functions similarly on Mobile and Desktop! Merely click on any option to route there, and 
see your current location highlighted in the UI. For mobile, first tap the Car World Logo to open the menu.
<p align="center">
  <img src="https://cw-readme-images.s3.amazonaws.com/mobile_navigation.gif" alt="Car World Error Message Demo">
  <br />
</p>

### Helpful Errors
Run into any issues in the app? No worries! carworld.love has some handy stylized Toasts to deliver error messages.
<p align="center">
  <img width="200px" src="https://cw-readme-images.s3.amazonaws.com/error_messages.gif" alt="Car World Error Message Demo">
  <br />
</p>

## Backend: AWS Serverless
<div>
<p align="center">
  <img src="https://cw-readme-images.s3.amazonaws.com/carworld+system+design.png" alt="Car World System Diagram">
  <br />
</p>
  <span>
    Car World is a <em>Serverless</em> application. This means that there is no server actively 
    running our Car World application code that we administer to on the backend; instead, Car 
    World application code is defined with AWS Lambdas. Each time the client needs to access 
    a piece of backend functionality, the request comes into our API GateWay. The gateway will 
    then route that request to the appropriate lambda controller to process the request. In certain 
    cases we will first authenticate the request with our Validator lambda before passing it on to 
    the appropriate controller.
  </span>

### Transaction Handling
<div>
  <p>
    One of the core features of Car World is the Merch marketplace. This marketplace is handled 
    by the <em>Commerce Controller</em>. There are two main flows that run through this controller:
  </p>
  <p>
    <ul>
      <li>Initate PaymentIntent</li>
      <li>Handle Transaction</li>
    </ul>
  </p>
  <p>
    The nature of our integration with the Stripe API dictates these flows. In the first flow, 
    <em>Initate PaymentIntent</em>, a call is made from the client to begin a transaction. 
    The Commerce Controller initializes Stripe's transaction concept, the PaymentIntent, 
    and returns to the client both the PaymentIntent ID as well as Stripe's <em>Client Secret</em>.
  </p>
  <p align="center">
    <img src="https://cw-readme-images.s3.amazonaws.com/init_payment_intent.svg" alt="Car World Initate PaymentIntent Diagram">
  </p>
  <p>
    The above flow leads directly into the next flow; <em>Handle Transaction</em>. Here, the client 
    first sends the email associated with the transaction to the Commerce Controller, which then 
    caches it. After this the client communicates all transaction details (card, billing) directly 
    to Stripe via the previously obtained secret. Stripe processes the payment on their end, and 
    passes the result of the transaction to the Commerce Controller. The Commerce Controller 
    fetches the email using the PaymentIntent ID, and records the transaction. After, the Commerce 
    Controller sends transaction details to SES (simple email service), which emits an order 
    confirmation email to both the user and the admins (physical store administrators). 
  </p>
  <p align="center">
    <img src="https://cw-readme-images.s3.amazonaws.com/CarWorldTransactionHandling.svg" alt="Car World Initate PaymentIntent Diagram">
  </p>
</div>

### Authentication
<div>
  <p>
    carworld.love is not just a marketplace; it is also a <em>community</em>. Car World caters 
    to it's audience by providing them the ability to make accounts, track their Digital Devotion 
    Points (DDP), and more. The security and api operations created to support these features are 
    handled by the <em>Auth Controller</em>. Key controller actions are highlighted below:
  </p>
  <p align="center">
    <img src="https://cw-readme-images.s3.amazonaws.com/login.svg" alt="Car World Initate PaymentIntent Diagram">
  </p>
  <p align="center">
    <img src="https://cw-readme-images.s3.amazonaws.com/refresh.svg" alt="Car World Initate PaymentIntent Diagram">
  </p>
  <p align="center">
    <img src="https://cw-readme-images.s3.amazonaws.com/guest.svg" alt="Car World Initate PaymentIntent Diagram">
  </p>
</div>

### CDK: Structure and Deployment
<p>
  All of Car World's infrastructure is automatically generated through AWS CDK (<em>Infrastructure as Code</em>). 
  The following diagram shows the file hierarchy, as it pertains to the CDK and infra.
</p>

```sh
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
    |---+ CWAPIGW, Controllers (Profile, Commerce, Auth), Databases, Secret fetching
  |
  |--tests
    |---+ unit
```


The `cdk.json` file tells the CDK Toolkit how to execute your app.

This project is set up like a standard Python project.  The initialization
process also creates a virtualenv within this project, stored under the `.venv`
directory.  To create the virtualenv it assumes that there is a `python3`
(or `python` for Windows) executable in your path with access to the `venv`
package. If for any reason the automatic creation of the virtualenv fails,
you can create the virtualenv manually.

To manually create a virtualenv on MacOS and Linux:

```
$ python3 -m venv .venv
```

After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.

```
$ source .venv/bin/activate
```

If you are a Windows platform, you would activate the virtualenv like this:

```
% .venv\Scripts\activate.bat
```

Once the virtualenv is activated, you can install the required dependencies.

```
$ pip install -r requirements.txt
```

At this point you can now synthesize the CloudFormation template for this code.

```
$ cdk synth
```

Need to add dependencies to lambda?

```
$ mkdir zip
$ zip -r zip/function.zip index.js node_modules/ package.json package-lock.json
```

To add additional dependencies, for example other CDK libraries, just add
them to your `setup.py` file and rerun the `pip install -r requirements.txt`
command.

#### Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

Enjoy!

## License
All code contained in this repository is licensed under the <a href="https://github.com/MatthewMSaucedo/CarWorld/blob/main/license.txt">GNU General Public License v3.0</a>.
