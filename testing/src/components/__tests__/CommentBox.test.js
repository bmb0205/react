import React from 'react';
import CommentBox from 'components/CommentBox';
import { mount } from 'enzyme';
import Root from 'Root';

let wrapped;

beforeEach(() => {
    wrapped = mount(<Root><CommentBox /></Root>);
});

afterEach(() => {
    wrapped.unmount();
});

it('has a textarea and a button', () => {
    expect(wrapped.find('button').length).toEqual(2);
    expect(wrapped.find('textarea').length).toEqual(1);
});

describe('the text area', () => {

    beforeEach(() => {
        wrapped.find('textarea').simulate('change', {
            target: { value: 'new comment' }
        });
        wrapped.update();
    });

    it('has a textarea a user can type in', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    });

    it('clears the textarea after a submit', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    });

});

