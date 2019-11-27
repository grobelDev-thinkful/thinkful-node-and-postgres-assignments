'use strict';

const expect = require('chai').expect;
const sort = require('../sort');

// Refactored version
describe('Sort function', () => {
  it('should sort a regular list', () => {
    expect(sort([3, 2, 1, 5])).to.deep.equal([1, 2, 3, 5]);
  });

  // it('should throw an error when divide by zero', () => {
  //   expect(() => {
  //     divide(8, 0);
  //   }).to.throw();
  // });
});
