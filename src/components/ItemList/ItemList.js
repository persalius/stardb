import React from 'react';
import PropType from "prop-types";
import './item-list.css';

const ItemList = (props) => {
    const {data, onItemSelected, children: renderLabel} = props;

    return (
      <ul className="item-list list-group">
        {data.map(item => {
          const {id} = item;
          const label = renderLabel(item);

          return (
            <li 
              className="list-group-item" 
              key={id}
              onClick={() => onItemSelected(id)}
            >
              {label}
            </li>
          )
        })}
      </ul>
    );
};

ItemList.defaultProps = {
  onItemSelected: () => {}
};

ItemList.propType = {
  onItemSelected: PropType.func,
  data: PropType.arrayOf(PropType.object).isRequired,
  children: PropType.func.isRequired
};

export default ItemList;
