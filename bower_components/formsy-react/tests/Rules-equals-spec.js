import React from 'react';
import TestUtils from 'react-addons-test-utils';
import immediate from './utils/immediate';

import Formsy from './..';
import { InputFactory } from './utils/TestInput';

const TestInput = InputFactory({
  render() {
    return <input value={this.getValue()} readOnly/>;
  }
});

const TestForm = React.createClass({
  render() {
    return (
      <Formsy.Form>
        <TestInput name="foo" validations="equals:foo" value={this.props.inputValue}/>
      </Formsy.Form>
    );
  }
});

export default {

  'should pass when the value is equal': function (test) {

    const form = TestUtils.renderIntoDocument(<TestForm inputValue="foo"/>);
    const inputComponent = TestUtils.findRenderedComponentWithType(form, TestInput);
    test.equal(inputComponent.isValid(), true);
    test.done();

  },

  'should fail when the value is not equal': function (test) {

    const form =  TestUtils.renderIntoDocument(<TestForm inputValue="fo"/>);
    const inputComponent = TestUtils.findRenderedComponentWithType(form, TestInput);
    test.equal(inputComponent.isValid(), false);
    test.done();

  },

  'should pass with an empty string': function (test) {

    const form = TestUtils.renderIntoDocument(<TestForm inputValue={''}/>);
    const inputComponent = TestUtils.findRenderedComponentWithType(form, TestInput);
    test.equal(inputComponent.isValid(), true);
    test.done();

  },

  'should pass with an undefined': function (test) {

    const form = TestUtils.renderIntoDocument(<TestForm inputValue={undefined}/>);
    const inputComponent = TestUtils.findRenderedComponentWithType(form, TestInput);
    test.equal(inputComponent.isValid(), true);
    test.done();

  },

  'should pass with a null': function (test) {

    const form = TestUtils.renderIntoDocument(<TestForm inputValue={null}/>);
    const inputComponent = TestUtils.findRenderedComponentWithType(form, TestInput);
    test.equal(inputComponent.isValid(), true);
    test.done();

  },

  'should fail with a number': function (test) {

    const form = TestUtils.renderIntoDocument(<TestForm inputValue={42}/>);
    const inputComponent = TestUtils.findRenderedComponentWithType(form, TestInput);
    test.equal(inputComponent.isValid(), false);
    test.done();

  }

};
