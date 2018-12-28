import Ajv from "ajv";
import fs from "fs";
import path from "path";

const ajv = new Ajv();
const cached: Record<string, Ajv.ValidateFunction> = {};

export function validate(type: string, objectToValidate: any) {
  let validator = cached[type];

  if (validator === undefined) {
    validator = ajv.compile(read(type));

    if (validator === undefined) {
      throw new Error(`no validation defined for ${type}`);
    } else {
      cached[type] = validator;
    }
  }

  if (validator(objectToValidate)) {
    return [null, true];
  } else {
    return [validator.errors, false];
  }
}

function read(name: string) {
  const schemaDir = path.join(__dirname, "schemas");
  const schemaFile = path.join(schemaDir, `${name}.json`);
  const raw = fs.readFileSync(schemaFile, { encoding: "utf-8" });

  return JSON.parse(raw);
}
