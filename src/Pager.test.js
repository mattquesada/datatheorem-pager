import React from 'react';
import { shallow, mount } from 'enzyme';
import EmployeePages from './testComponents/EmployeePages';
import { employees, fakeResponses, sampleSurveys } from './testComponents/testConfig';

describe('Pager', () => {
  it('renders without crashing', () => {
    shallow(<EmployeePages employees={employees} />);
  });


  it('navigates forwards and backwards correctly', () => {
    const wrapper = mount(<EmployeePages employees={employees} />);
    const pager = wrapper.find('Pager');
    const pagerInstance = pager.instance();
    const pageLabels = pager.state('pageLabels');

    expect(pager.state('currentPageIndex')).toBe(0);
    expect(pager.state('currentPageLabel')).toBe(pageLabels[0]);

    // test goNext()
    pagerInstance.goNext();
    expect(pager.state('currentPageIndex')).toBe(1);
    expect(pager.state('currentPageLabel')).toBe(pageLabels[1]);
    pagerInstance.goNext();
    pagerInstance.goNext();
    expect(pager.state('currentPageIndex')).toBe(0);
    expect(pager.state('currentPageLabel')).toBe(pageLabels[0]);

    // test goPrevious()
    pagerInstance.goPrevious();
    expect(pager.state('currentPageIndex')).toBe(2);
    expect(pager.state('currentPageLabel')).toBe(pageLabels[2]);
  });


  it('navigates to a page by selecting a label', () => {
    const wrapper = mount(<EmployeePages employees={employees} />);
    const pager = wrapper.find('Pager');
    const pagerInstance = pager.instance();

    expect(pager.state('currentPageIndex')).toBe(0);
    const pageLabels = pager.state('pageLabels');

    // go to the last label
    pagerInstance.goToLabel(pageLabels[pageLabels.length - 1]); 
    expect(pager.state('currentPageIndex')).toBe(pageLabels.length - 1);
    expect(pager.state('currentPageLabel')).toBe(pageLabels[pageLabels.length - 1]);

    // go to the first label, then use goPrevious() and goNext()
    pagerInstance.goToLabel(pageLabels[0]);
    pagerInstance.goPrevious();
    pagerInstance.goNext();
    expect(pager.state('currentPageIndex')).toBe(0);
    expect(pager.state('currentPageLabel')).toBe(pageLabels[0]);
  });
  

  it('handles Support response types', async () => {
    const wrapper = mount(<EmployeePages employees={employees} />);
    const pager = wrapper.find('Pager');
    const pagerInstance = pager.instance();

    // test statuses 200 - 204
    let resultMessage = await pagerInstance.handleSupportResponse(fakeResponses['200']);
    expect(resultMessage).toBe('Support request received successfully');
   
    resultMessage = await pagerInstance.handleSupportResponse(fakeResponses['201']);
    expect(resultMessage).toBe('Support request received successfully');
    
    resultMessage = await pagerInstance.handleSupportResponse(fakeResponses['202']);
    expect(resultMessage).toBe('Support request received successfully');
    
    resultMessage = await pagerInstance.handleSupportResponse(fakeResponses['204']);
    expect(resultMessage).toBe('Support request received successfully');
    
    // test status 400
    resultMessage = await pagerInstance.handleSupportResponse(fakeResponses['400']);
    expect(resultMessage).toBe('Hello, 400');

    // test status 500
    resultMessage = await pagerInstance.handleSupportResponse(fakeResponses['500']);
    expect(resultMessage).toBe('Error in support request');
  });


  it('handles Page Info response types', async () => {
    const wrapper = mount(<EmployeePages employees={employees} />);
    const pager = wrapper.find('Pager');
    const pagerInstance = pager.instance();

    // test statuses before 200 range
    await pagerInstance.handlePageInfoResponse(fakeResponses['199']);
    expect(pager.state('pageInfoError')).toBe('cannot fetch page info');
    expect(pager.state('pageInfo')).toBe(null);

    // test statuses 200, 201, and 299
    await pagerInstance.handlePageInfoResponse(fakeResponses['200']);
    expect(pager.state('pageInfoError')).toBe(null);
    expect(pager.state('pageInfo')).toBe('Hello, 200');

    await pagerInstance.handlePageInfoResponse(fakeResponses['201']);
    expect(pager.state('pageInfoError')).toBe(null);
    expect(pager.state('pageInfo')).toBe('Hello, 201');

    await pagerInstance.handlePageInfoResponse(fakeResponses['299']);
    expect(pager.state('pageInfoError')).toBe(null);
    expect(pager.state('pageInfo')).toBe('Hello, 299');

    // test status greater than 299
    await pagerInstance.handlePageInfoResponse(fakeResponses['300']);
    expect(pager.state('pageInfoError')).toBe('cannot fetch page info');
    expect(pager.state('pageInfo')).toBe(null);
  });

  // add tests for null props

  // add tests for updated props

});

describe('PagerOverlay', () => {
  it('should render when parent showOverlay is toggled', () => {
    const wrapper = mount(<EmployeePages employees={employees} />);
    const pager = wrapper.find('Pager');

    pager.setState({ showOverlay: true });
    expect(wrapper.find('PagerOverlay').props().show).toBe(true);
  });


  it('should validate form data', async () => {
    const wrapper = mount(<EmployeePages employees={employees} />);
    const pagerOverlay = wrapper.find('PagerOverlay');
    const pagerOverlayInstance = pagerOverlay.instance();
    let validSurvey = false;

    // inject a valid survey into state and submit the form
    validSurvey = pagerOverlayInstance.checkSubmission(sampleSurveys.validSurvey);
    expect(validSurvey).toBe(true);

    // inject a survey with an empty field
    validSurvey = pagerOverlayInstance.checkSubmission(sampleSurveys.emptyField);
    expect(validSurvey).toBe(false);
  });
});