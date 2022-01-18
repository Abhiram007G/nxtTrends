import {Component} from 'react'

import './index.css'

class FiltersGroup extends Component {
  state = {
    activeCategoryId: '',
    activeRatingId: '',
    searchInput: '',
  }

  renderEachCategory = categoryDetails => {
    const {name, categoryId} = categoryDetails
    const {changeActiveCategory} = this.props
    const {activeCategoryId} = this.state
    const activeClassName = activeCategoryId === categoryId ? 'active' : ''
    const onClickCategory = () => {
      changeActiveCategory(categoryId)
      this.setState({activeCategoryId: categoryId})
    }

    return (
      <div key={categoryId}>
        <button
          type="button"
          onClick={onClickCategory}
          className={`${activeClassName}`}
        >
          <p>{name}</p>
        </button>
      </div>
    )
  }

  renderCategoryList = () => {
    const {categoryOptions} = this.props
    return (
      <div className="category-list-container">
        {categoryOptions.map(each => this.renderEachCategory(each))}
      </div>
    )
  }

  renderEachRatings = rating => {
    const {ratingId, imageUrl} = rating
    const {changeActiveRating} = this.props
    const {activeRatingId} = this.state

    const onClickRating = () => {
      changeActiveRating(ratingId)
      this.setState({activeRatingId: ratingId})
    }
    const activeClassName = activeRatingId === ratingId ? 'active' : ''

    return (
      <li key={ratingId}>
        <button
          type="button"
          onClick={onClickRating}
          className={`${activeClassName}`}
        >
          <img
            src={imageUrl}
            alt={`rating ${ratingId}`}
            className="rating-item"
          />
          & up
        </button>
      </li>
    )
  }

  renderRatingsList = () => {
    const {ratingsList} = this.props

    return (
      <ul className="ratings-container">
        {ratingsList.map(each => this.renderEachRatings(each))}
      </ul>
    )
  }

  onClearFilter = () => {
    const {clearFilter} = this.props
    clearFilter()
    this.setState({
      activeCategoryId: '',
      activeRatingId: '',
      searchInput: '',
    })
  }

  onSearchInput = event => {
    const {changeSearchInput} = this.props
    if (event.key === 'Enter') {
      changeSearchInput(event.target.value)
    }
  }

  onUpdateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="filters-group-container">
        <input
          type="search"
          onKeyDown={this.onSearchInput}
          onChange={this.onUpdateSearchInput}
          value={searchInput}
        />
        <h1 className="filter-headings">Category</h1>
        {this.renderCategoryList()}
        <h1 className="filter-headings">Ratings</h1>
        {this.renderRatingsList()}
        <button
          type="button"
          className="clear-filter-button"
          onClick={this.onClearFilter}
        >
          Clear Filters
        </button>
      </div>
    )
  }
}

export default FiltersGroup
