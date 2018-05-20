import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Reset active status when player changes.
    if (prevProps.player !== this.props.player) {
      this.setState(() => ({active: false}));
    }
  }

  handleClick(player, category) {
    this.props.toggleCategory(player, category);
    this.setState(() => ({active: !this.state.active}));
  }

  render() {
    const {category, player} = this.props;
    const {active} = this.state;

    return (
      <button
        className={active
          ? "option-btn streamlined active-category"
          : "option-btn streamlined"}
        onClick={() => this.handleClick(player, category)}>
        {category.name}
      </button>
    );
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  player: PropTypes.number.isRequired,
  toggleCategory: PropTypes.func.isRequired
}

export default Category;
