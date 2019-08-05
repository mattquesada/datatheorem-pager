import React from 'react';
import PropTypes from 'prop-types';

class Pager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      page: this.props.pages[0],
      goNext: () => this.goNext(),
      goPrevious: () => this.goPrevious(),
      goToLabel: (label) => this.goToLabel(label),
      currentPageLabel: this.props.getLabel(0),
      pageLabels: [],
      loading: true,
      error: false,
    }
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

  /*
    utility method to change the current page's data and label to the 
    page and label defined by @newIndex
  */
  changePage(newIndex) {
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: this.state.pageLabels(newIndex),
      page: this.props.pages[newIndex]
    });
  }

  render() {
    return (
      <div>
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

export default Pager;