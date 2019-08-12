import React from 'react';
import PropTypes from 'prop-types';
import './Pager.css';

class PagerOverlay extends React.Component {
  constructor() {
    super();
    this.state = {
      survey: {
        name: '',
        email: '',
        message: ''
      }
    };
  }

  handleChange(event) {
    const surveyField = event.target.name;
    this.setState({
      survey: { ...this.state.survey, [surveyField]: event.target.value }
    });
  }

  /*
    When the form submit button is clicked, verify that the inputs are valid
    before closing the overlay. If the input is valid, use the handler from props.
  */
  handleSubmit(event) {
    event.preventDefault(); // prevent form from closing so we can validate the fields
    if (this.checkSubmission(this.state.survey))
      this.props.handleClose(this.state.survey);
    else
      alert('Error: please populate all fields.');
  }

  /*
    Verify that all of the input fields are populated
  */
  checkSubmission(survey) {
    for (const field in survey)
      if (!survey[field]) return false;
    return true;
  }

  render() {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <div className='modal-content'>
          <h3>Please fill out the form:</h3>
          <div className='modal-form'>
            <form onSubmit={e => this.handleSubmit(e)}>
              <label>
                Name: <input type='text' name='name' value={this.state.survey.name} onChange={e => this.handleChange(e)} />
              </label>
              <label>
                Email: <input type='email' name='email' value={this.state.survey.email} onChange={e => this.handleChange(e)} />
              </label>
              <label>
                Message: <input type='text' name='message' value={this.state.survey.message} onChange={e => this.handleChange(e)} />
              </label>
              <input type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </div>
    );
  }
};

PagerOverlay.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

class Pager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      showOverlay: false,
      page: this.props.pages[0],
      goNext: () => this.goNext(),
      goPrevious: () => this.goPrevious(),
      goToLabel: (label) => this.goToLabel(label),
      currentPageLabel: this.props.getLabel(0),
      pageLabels: [],
      openSupportDialog: () => this.openSupportDialog(),
      pageInfoIsLoading: true,
      pageInfoError: '',
      pageInfo: {}
    }
    this.closeSupportDialog = this.closeSupportDialog.bind(this);
  }

  /*
    When the Pager mounts, immediately load all the labels into 
    an array for easy access, and load the page info for the first page
    If supportRequestUrl is null, nullify openSupportDialog
  */
  componentDidMount() {
    this.loadLabels(this.props.pages);
    this.loadPageInfo(this.state.currentPageLabel);
    this.checkSupportRequestUrl(this.props.supportRequestUrl);
  }

  /*
    If the pages get updated, reload the labels and return
    to the first page.
    If the getLabel() function is updated, reload the labels.
    If supportRequestUrl becomes non-null, change openSupportDialog
    to be non-null in render.
  */
  componentDidUpdate(prevProps) {
    if (prevProps.pages !== this.props.pages) {
      this.loadLabels(this.props.pages);
      this.loadPageInfo(this.props.getLabel(0));
      this.changePage(0);
    }
    if (prevProps.getLabel !== this.props.getLabel)
      this.loadLabels(this.props.pages);
    if (prevProps.supportRequestUrl !== this.props.supportRequestUrl) 
      this.setState({ openSupportDialog: () => this.openSupportDialog()});
  }

  /*
    store all of the labels for each individual page
    using the provided getLabel() function from props
  */
  loadLabels(pages) {
    let pageLabels = [];
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++)
      pageLabels.push(this.props.getLabel(pageIndex));
    this.setState({ pageLabels });
  }

  /*
    transition to the next page in the props.pages array. 
    if the current page index is the last page, the pager will
    wrap around to the first page
  */
  goNext() {
    const newPageIndex = (this.state.currentPageIndex === this.props.pages.length - 1)
      ? 0
      : this.state.currentPageIndex + 1;
    this.changePage(newPageIndex);
  }

  /*
    transition to the previous page in the props.pages array.
    if the current page index is the first page, the pager will
    wrap around to the last page.
  */
  goPrevious() {
    const newPageIndex = (this.state.currentPageIndex === 0)
      ? this.props.pages.length - 1
      : this.state.currentPageIndex - 1;
    this.changePage(newPageIndex);
  }

  /* 
    jump to the page matching @selectedLabel
  */
  goToLabel(selectedLabel) {
    const newPageIndex = this.state.pageLabels.findIndex(label => label === selectedLabel);
    this.changePage(newPageIndex);
  }

  /*
    Toggle the showOverlay state so that the PagerOverlay component renders
  */
  openSupportDialog() {
    this.setState({ showOverlay: true });
  }

  /*
    Receives the form data stored in @survey from the PagerOverlay 
    child component and attemps to make a POST request
  */
  closeSupportDialog(survey) {
    this.sendSurveyData(survey);
    this.setState({ showOverlay: false });
  }

  /*
    send the survey data from the overlay to the 
    supportRequestUrl, if it exists
  */
  async sendSurveyData(survey) {
    if (!this.props.supportRequestUrl)
      return;

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(survey)
    };

    try {
      const response = await fetch(this.props.supportRequestUrl, fetchOptions);
      alert(this.handleSupportResponse(response));
    } catch (err) {
      alert(err);
    }
  }

  /*
    utility method to alert the user if the survey was submitted
    successfully to the provided supportRequestUrl
  */
  async handleSupportResponse(response) {
    switch (response.status) {
      case 200:
      case 201:
      case 202:
      case 204:
        return 'Support request received successfully';
      case 400:
        return await response.json();
      default:
        return 'Error in support request'
    }
  }

  /*
    Load the page information using the Url provided by
    props.pageInfoUrl(), if the prop is provided. This function is
    called when the component mounts, as well as every time the user 
    transitions to a different page
  */
  async loadPageInfo(label) {
    if (!this.props.pageInfoUrl) {
      this.setState({
        pageInfoIsLoading: false,
        pageInfoError: 'no pageInfoUrl prop provided',
        pageInfo: null
      });
      return;
    }

    const fetchUrl = this.props.pageInfoUrl(label);
    try {
      const response = await fetch(fetchUrl);
      this.handlePageInfoResponse(response);
    } catch (err) {
      this.setState({
        pageInfoIsLoading: false,
        pageInfoError: 'cannot fetch page info',
        pageInfo: null
      })
    }
  }

  /*
    if the supportRequestUrl prop is not provided,
    nullify the openSupportDialog child prop as 
    described in the documentation
  */
  checkSupportRequestUrl(url) {
    if (!url) this.setState({ openSupportDialog: null });
  }

  /*
    Check the response status of a page info request 
    and alert the user of the request status. Also update
    the state accordingly.
  */
  async handlePageInfoResponse(response) {
    if (response.status >= 200 && response.status <= 299) {
      this.setState({
        pageInfoIsLoading: false,
        pageInfoError: null,
        pageInfo: await response.json()
      });
    }
    else {
      this.setState({
        pageInfoIsLoading: false,
        pageInfoError: 'cannot fetch page info',
        pageInfo: null
      })
    }
  }

  /*
    utility method to change the current page's data and label to the 
    page and label defined by @newIndex.
    Also attemps to query the url provided by props.pageInfoUrl to load the 
    page info, if it exists
  */
  changePage(newIndex) {
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: this.state.pageLabels[newIndex],
      page: this.props.pages[newIndex]
    });
    this.loadPageInfo(this.state.pageLabels[newIndex]);
  }

  render() {
    return (
      <>
        <PagerOverlay show={this.state.showOverlay} handleClose={this.closeSupportDialog} />
        {this.props.children({
          ...this.props,
          ...this.state
        })}
      </>
    )
  }
}

Pager.propTypes = {
  pages: PropTypes.array.isRequired,
  getLabel: PropTypes.func.isRequired,
  supportRequestUrl: PropTypes.string,
  pageInfoUrl: PropTypes.func,
  children: PropTypes.func
};

Pager.defaultProps = {
  supportRequestUrl: null,
  pageInfoUrl: null,
  children: {
    openSupportDialog: null,
    pageInfoIsLoading: false,
    pageInfoError: null,
    pageInfo: null
  }
}

export default Pager;