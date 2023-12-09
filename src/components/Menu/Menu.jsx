import { ChevronDown, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";

const Menu = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const [selectedGroup, setSelectedGroup] = useState("status");

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const [selectedOrder, setSelectedOrder] = useState("priority");

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: "15px",
          border: "none",
        }}
      >
        <button
          style={{ padding: "5px", borderRadius: "10%" }}
          onClick={toggleMenu}
        >
          <SlidersHorizontal size={12} />
          <span style={{ marginLeft: "3px", marginRight: "3px" }}>Display</span>
          <ChevronDown size={10} />
        </button>

        {isMenuVisible && (
          <ul style={menuStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <div>
                <label style={{ color: "gray" }} htmlFor="dropdown">
                  Grouping{" "}
                </label>
              </div>
              <div>
                <select
                  id="dropdown"
                  style={{ padding: "4px" }}
                  value={selectedGroup}
                  onChange={handleGroupChange}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label style={{ color: "gray" }} htmlFor="dropdown">
                  Ordering
                </label>
              </div>
              <div>
                <select
                  id="dropdown"
                  value={selectedOrder}
                  style={{ padding: "4px" }}
                  onChange={handleOrderChange}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </ul>
        )}
      </div>
      <Dashboard grouping={selectedGroup} ordering={selectedOrder} />
    </>
  );
};

const menuStyle = {
  listStyle: "none",
  padding: "13px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  background: "#f9f9fb",
  width: "275px",
  position: "absolute",
  top: "60%",
  left: "10",
  zIndex: "1",
};

export default Menu;
