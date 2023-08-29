import { NavLink } from "react-router-dom";

const ListGroup = () => {
  return (
    <div className="list-group">
      <NavLink to="/" end className="list-group-item list-group-item-action">
        Hook-Form-Basics
      </NavLink>
      <NavLink to="/extended" className="list-group-item list-group-item-action">
        Hook-Form-Extended
      </NavLink>
      <NavLink to="/yup" className="list-group-item list-group-item-action">
        Yup
      </NavLink>
    </div>
  );
};

export default ListGroup;
