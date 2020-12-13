import { Org } from '@salesforce/core';
import { expect } from 'chai';
import listBrokenMetadata from './issue';

describe('issue', function () {
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

  it('misses the namespace prefix for a managed CustomMetadata record', () => {
    const expected = fileProperties.find(
      findMetadata(
        'CustomMetadata',
        'mdapidummy2gen__Dummy_Configuration.mdapidummy2gen__Test'
      )
    );
    const actual = fileProperties.find(
      findMetadata('CustomMetadata', 'mdapidummy2gen__Dummy_Configuration.Test')
    );
    expect(expected).to.be.undefined;
    expect(actual).to.have.property('id');
  });

  it('misses the namespace prefix for a managed Layout on a managed CustomObject', () => {
    const expected = fileProperties.find(
      findMetadata(
        'Layout',
        'mdapidummy2gen__Vehicle__c-mdapidummy2gen__Vehicle Layout'
      )
    );
    const actual = fileProperties.find(
      findMetadata('Layout', 'mdapidummy2gen__Vehicle__c-Vehicle Layout')
    );
    expect(expected).to.be.undefined;
    expect(actual).to.have.property('id');
  });

  it('misses the namespace prefix for a managed QuickAction', () => {
    const expected = fileProperties.find(
      findMetadata(
        'QuickAction',
        'mdapidummy2gen__Vehicle__c.mdapidummy2gen__Deprecate'
      )
    );
    const actual = fileProperties.find(
      findMetadata('QuickAction', 'mdapidummy2gen__Vehicle__c.Deprecate')
    );
    expect(expected).to.be.undefined;
    expect(actual).to.have.property('id');
  });
});
