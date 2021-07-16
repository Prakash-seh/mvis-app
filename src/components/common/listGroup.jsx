/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import _ from "lodash";

const ListGroup = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={getSelectedClass(item)}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-film px-2"></i>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );

  function getSelectedClass(item) {
    let classes = "list-group-item";
    if (_.isEqual(item, selectedItem)) classes += " active";
    return classes;
  }
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
