import { expect } from 'chai';
import { promises } from 'fs';
import * as path from 'path';
import addMissingNamespace from '../src/workaround';
import * as expected from './fixtures/expected.json';

describe('workaround', function () {
  it('adds the missing namespace', async () => {
    const buf = await promises.readFile(
      path.join(__dirname, 'fixtures', 'actual.json')
    );
    const actual = JSON.parse(buf.toString());
    const result = addMissingNamespace(actual);
    expect(result).to.deep.equal(expected);
  });
  it('does not add namespace if already present', async () => {
    const buf = await promises.readFile(
      path.join(__dirname, 'fixtures', 'expected.json')
    );
    const actual = JSON.parse(buf.toString());
    const result = addMissingNamespace(actual);
    expect(result).to.deep.equal(expected);
  });
});
