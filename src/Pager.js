import React from 'react';
import PropTypes from 'prop-types';

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

  // do input validation here
  handleSubmit() {
    this.props.handleClose(this.state.survey);
  }

  render() {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none'
    return (
      <div className={showHideClassName}>
        <div className='modal-main'>
          <form onSubmit={e => this.handleSubmit()}>
            <label>
              Name:
              <input type='text' name='name' value={this.state.survey.name} onChange={e => this.handleChange(e)} />
            </label>
            <label>
              Email:
              <input type='text' name='email' value={this.state.survey.email} onChange={e => this.handleChange(e)} />
            </label>
            <label>
              Message:
              <input type='text' name='message' value={this.state.survey.message} onChange={e => this.handleChange(e)} />
            </label>
            <input type='button' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
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
      openSupportDialog: () => this.openSupportDialog()
    }
    this.closeSupportDialog = this.closeSupportDialog.bind(this);
  }

  componentDidMount() {
    this.loadLabels(this.props.pages);
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

  openSupportDialog() {
    this.setState({ showOverlay: true });
  }

  closeSupportDialog(survey) {
    // do something with the survey value
    this.setState({ showOverlay: false });
  }

  /*
    utility method to change the current page's data and label to the 
    page and label defined by @newIndex
  */
  changePage(newIndex) {
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: this.state.pageLabels[newIndex],
      page: this.props.pages[newIndex]
    });
  }

  render() {
    return (
      <div>
        <PagerOverlay show={this.state.showOverlay} handleClose={this.closeSupportDialog} />
        {this.props.children({
          ...this.props,
          ...this.state
        })}
      </div>
    )
  }
}

Pager.propTypes = {
  pages: PropTypes.element.isRequired,
  getLabel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  supportRequestUrl: PropTypes.string,
  pageInfoUrl: PropTypes.string
}

Pager.defaultProps = {
  supportRequestUrl: null,
  pageInfoUrl: null
}