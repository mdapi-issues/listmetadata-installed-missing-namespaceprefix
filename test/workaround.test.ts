import { expect } from "chai";
import { promises } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { addMissingNamespace } from "../src/workaround.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

describe("workaround", function () {
  let expected;
  before(async () => {
    expected = JSON.parse(
      await promises.readFile(
        join(__dirname, "fixtures", "expected.json"),
        "utf8"
      )
    );
  });
  it("adds the missing namespace", async () => {
    const buf = await promises.readFile(
      join(__dirname, "fixtures", "actual.json")
    );
    const actual = JSON.parse(buf.toString());
    const result = addMissingNamespace(actual);
    expect(result).to.deep.equal(expected);
  });
  it("does not add namespace if already present", async () => {
    const buf = await promises.readFile(
      join(__dirname, "fixtures", "expected.json")
    );
    const actual = JSON.parse(buf.toString());
    const result = addMissingNamespace(actual);
    expect(result).to.deep.equal(expected);
  });
});
