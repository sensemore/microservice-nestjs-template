const findInFiles = require('find-in-files');
const ejs = require("ejs");
const fs = require("fs");
const uuid = require('uuid');
const VERSION = "0.0.1";


let usecase_template = [__dirname, "templates/usecase/usecase.ts.ejs"].join("/");
let usecase_test_template = [__dirname, "templates/usecase/usecase.spec.ts.ejs"].join("/");
let gateway_template = [__dirname, "templates/usecase/entityGateways.ts.ejs"].join("/");
let error_template = [__dirname, "templates/usecase/errors.ts.ejs"].join("/");
let controller_template = [__dirname, "templates/controller/controller.ts.ejs"].join("/");
let gateway_imp_template = [__dirname, "templates/controller/gateways.ts.ejs"].join("/");
let module_template = [__dirname, "templates/controller/module.ts.ejs"].join("/");
let resquest_template = [__dirname, "templates/controller/request.ts.ejs"].join("/");
let response_template = [__dirname, "templates/controller/response.ts.ejs"].join("/");
const context = {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    camelCase(string) {
        return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    },
    snakeCase(string) {
        return string.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    },
    lowerFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
};

async function run(params) {

    //create parameters to use in templates
    const p = {
        version:VERSION,
        uuid: params.uuid,
        moduleClassName: `${context.capitalizeFirstLetter(params.usecase)}_Module`,
        usecase: params.usecase,
        usecaseFileName: context.camelCase(params.usecase),
        usecaseClassName: `${context.lowerFirstLetter(context.camelCase(params.usecase))}_Usecase`,
        usecaseName: params.usecase,
        gatewayName: params.gateway,
        entityVariableName: context.lowerFirstLetter(context.camelCase(params.entity)),
        entityFileName: context.lowerFirstLetter(params.entity),
        entityClassName: context.capitalizeFirstLetter(params.entity),
        gatewayeClassName: `${context.capitalizeFirstLetter(params.gateway)}_gateway`,
        gatewayInterfaceName: `I${context.capitalizeFirstLetter(params.gateway)}`,
        gatewayVariableName: context.camelCase(params.gateway),
        usecaseVariableName: context.camelCase(params.usecase),
        controllerName: params.controller,
        controllerClassName: `${context.capitalizeFirstLetter(params.usecase)}Controller`,
        controllerActionName: context.camelCase(params.usecase),
        controllerMethodName: context.capitalizeFirstLetter(params.method),
        requestClassName: `${context.capitalizeFirstLetter(params.usecase)}Request`,
        responseClassName: `${context.capitalizeFirstLetter(params.usecase)}Response`,
    };

    //render templates
    let usecase_file = await ejs.renderFile(usecase_template, p, {
        async: true, context: context
    });

    let entityGateway_file = await ejs.renderFile(gateway_template, p, {
        async: true, context: context
    });
    let usecase_test_file = await ejs.renderFile(usecase_test_template, p, {
        async: true, context: context
    });

    let error_file = await ejs.renderFile(error_template, p, {
        async: true, context: context
    });



    let controller_file = await ejs.renderFile(controller_template, p, {
        async: true, context: context
    });

    let gateway_imp_file = await ejs.renderFile(gateway_imp_template, p, {
        async: true, context: context
    });
    let module_file = await ejs.renderFile(module_template, p, {
        async: true, context: context
    });

    let request_file = await ejs.renderFile(resquest_template, p, {
        async: true, context: context
    });

    let response_file = await ejs.renderFile(response_template, p, {
        async: true, context: context
    });
    console.log(response_file);


    //save files
    //save usecase
    //create folder
    fs.mkdirSync(["src/usecases", params.usecase].join("/"));

    fs.writeFileSync(["src/usecases", params.usecase, "usecase.ts"].join("/"), usecase_file);
    fs.writeFileSync(["src/usecases", params.usecase, "usecase.specs.ts"].join("/"), usecase_test_file);
    fs.writeFileSync(["src/usecases", params.usecase, "errors.ts"].join("/"), error_file);
    fs.writeFileSync(["src/usecases", params.usecase, "entityGateways.ts"].join("/"), entityGateway_file);


    //save controller
    fs.mkdirSync(["src/infrastructure/controllers", params.usecase].join("/"));
    fs.writeFileSync(["src/infrastructure/controllers", params.usecase, "controller.ts"].join("/"), controller_file);
    fs.writeFileSync(["src/infrastructure/controllers", params.usecase, "gateways.ts"].join("/"), gateway_imp_file);
    fs.writeFileSync(["src/infrastructure/controllers", params.usecase, "module.ts"].join("/"), module_file);
    fs.writeFileSync(["src/infrastructure/controllers", params.usecase, "request.ts"].join("/"), request_file);
    fs.writeFileSync(["src/infrastructure/controllers", params.usecase, "response.ts"].join("/"), response_file);


}

async function removeUsecase(usecase) {
    //find all files in src folder recursively  includes content "id = :id"
    //delete all files
    const rimraf = require("rimraf");

    rimraf.sync(["src/usecases", usecase].join("/"));
    rimraf.sync(["src//infrastructure/controllers", usecase].join("/"));
    console.log("done");
    //remove usecase folder


}

function parseNewArgs(args) {
    console.log(args);
    let requiredArgs = ["usecase", "gateway", "entity", "controller", "method"];
    let params = {
        uuid: uuid.v4(),
    };
    for (let i = 0; i < requiredArgs.length; i++) {
        let arg = requiredArgs[i];
        let argIndex = args.findIndex(x => x == `--${arg}`);
        if (argIndex == -1) {
            throw new Error(`Missing required argument --${arg}`);
        }
        let value = args[argIndex + 1];
        if (!value) {
            throw new Error(`Missing required argument value --${arg}`);
        }
        params[arg] = value;
    }
    return params;
}
async function main() {
    let args = process.argv.slice(2);
    if (args[0] == "new") {
        //parse args regardless of position  --usecase
        let params = parseNewArgs(args);
        if (params) {
            await run(params);
        } else {
            return;
        }
    } else if (args[0] == "remove") {
        await removeUsecase(args[1]);
    }
    else {
        console.log("Please provide valid command new or remove");
        return;
    }
}

main()
//wait for enter from command line

