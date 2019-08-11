import React from 'react';
import { shallow, mount } from 'enzyme';
import EmployeePages from './testComponents/EmployeePages';
import { employees } from './testComponents/testConfig';

describe('Pager', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<EmployeePages employees={employees} />);
    const pager = wrapper.find('Pager');
    console.log(pager.debug());
  });

  it('navigates forwards and backwards correctly', () => {
    const wrapper = mount(<EmployeePages employees={employees} />);
    const pager = wrapper.find('Pager');
    const pagerInstance = pager.instance();
    expect(pager.state('currentPageIndex')).toBe(0);
    pagerInstance.goNext();
    expect(pager.state('currentPageIndex')).toBe(1);
    pagerInstance.goNext();
    pagerInstance.goNext();
    expect(pager.state('currentPageIndex')).toBe(0);
    pagerInstance.goPrevious();
    expect(pager.state('currentPageIndex')).toBe(2);
  });

});