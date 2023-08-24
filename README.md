# CARWORLD.LOVE
Cartopia

## Frontend - CarWorld SPA
https://carworldneedsme.netlify.app/
NOTE: Currently only desktop friendly

Want to test out a purchase?
All credit card info is just "42" repeated as needed.

## Backend - CarWorld Serverless
![CarWorld System Diagram](https://github.com/matthewmsaucedo/CarWorld/blob/main/backend/diagrams/CarWorldSystemDesign.jpg?raw=true)


![CarWorld Login Flow](https://github.com/matthewmsaucedo/CarWorld/blob/main/backend/diagrams/login.svg?raw=true)
![CarWorld Refresh Flow](https://github.com/matthewmsaucedo/CarWorld/blob/main/backend/diagrams/refresh.svg?raw=true)
![CarWorld Guest Flow](https://github.com/matthewmsaucedo/CarWorld/blob/main/backend/diagrams/guest.svg?raw=true)
![CarWorld Initiate PaymentIntent Flow](https://github.com/matthewmsaucedo/CarWorld/blob/main/backend/diagrams/init_payment_intent.svg?raw=true)
![CarWorld Handle Completed Transaction Flow](https://github.com/matthewmsaucedo/CarWorld/blob/main/backend/diagrams/handle_transaction.svg?raw=true)
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

All payments backed by Stripe!

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

