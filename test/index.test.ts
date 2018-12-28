import test, { Test } from "tape";
import { validate } from "../src";

test("validate verifies an object satisfies the target schema", (t: Test) => {
  t.plan(2);

  const objToTest = {
    entity: "bananas",
    env: "production",
    target: 3,
    tenant: "12345"
  };

  const [errors, isValid] = validate("cmd.config.get", objToTest);

  t.ok(isValid, "object passes validation");
  t.equal(errors, null, "no errors");
});
