import { Org } from "@salesforce/core";
import { expect } from "chai";
import { listBrokenMetadata } from "./issue.js";

describe("issue", function () {
  let fileProperties;

  before(async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    fileProperties = await listBrokenMetadata(conn);
  });

  const findMetadata = function (type, name) {
    return function (fileProperty) {
      return fileProperty.type === type && fileProperty.fullName === name;
    };
  };

  it("misses the namespace prefix for a managed CustomMetadata record", () => {
    const expected = fileProperties.find(
      findMetadata(
        "CustomMetadata",
        "mdapidummy2gen__Dummy_Configuration.mdapidummy2gen__Test"
      )
    );
    const previouslyBroken = fileProperties.find(
      findMetadata("CustomMetadata", "mdapidummy2gen__Dummy_Configuration.Test")
    );
    expect(expected).to.have.property("id");
    expect(previouslyBroken).to.be.undefined;
  });

  it("managed Layout on a managed CustomObject now contains namespace prefix", () => {
    const expected = fileProperties.find(
      findMetadata(
        "Layout",
        "mdapidummy2gen__Vehicle__c-mdapidummy2gen__Vehicle Layout"
      )
    );
    const actual = fileProperties.find(
      findMetadata("Layout", "mdapidummy2gen__Vehicle__c-Vehicle Layout")
    );
    expect(expected).to.be.undefined;
    expect(actual).to.have.property("id");
  });

  it("managed QuickAction now contains namespace prefix", () => {
    const expected = fileProperties.find(
      findMetadata(
        "QuickAction",
        "mdapidummy2gen__Vehicle__c.mdapidummy2gen__Deprecate"
      )
    );
    const previouslyBroken = fileProperties.find(
      findMetadata("QuickAction", "mdapidummy2gen__Vehicle__c.Deprecate")
    );
    expect(expected).to.have.property("id");
    expect(previouslyBroken).to.be.undefined;
  });
});
