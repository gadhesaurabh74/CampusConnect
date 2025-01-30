import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField } from '@mui/material';

export default function Canteen() {
  const [activeTab, setActiveTab] = useState("order-status"); // Active tab for the sidebar
  const [status, setStatus] = useState("pending"); // Active status toggle
  const [orders, setOrders] = useState([
    { id: 1, name: 'Burger', status: 'pending' },
    { id: 2, name: 'Pizza', status: 'in-progress' },
    { id: 3, name: 'Pasta', status: 'completed' }
  ]);
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Burger', price: 5 },
    { id: 2, name: 'Pizza', price: 7 },
    { id: 3, name: 'Pasta', price: 6 }
  ]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  // Handle switching between tabs (Inventory and Order Status)
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Handle deleting an order or inventory item
  const handleDelete = (id, type) => {
    if (type === "order") {
      setOrders(orders.filter(order => order.id !== id));
    } else if (type === "inventory") {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  // Handle changing the status of an order
  const handleChangeStatus = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  // Handle adding a new product to the inventory
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setInventory([...inventory, { id: Date.now(), ...newProduct }]);
      setNewProduct({ name: "", price: "" });
    }
  };

  return (
    <Box display="flex" p={4} sx={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          backgroundColor: "#fff",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px"
        }}
      >
        <Button
          fullWidth
          variant={activeTab === "order-status" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleTabSwitch("order-status")}
          sx={{ marginBottom: "20px", borderRadius: "8px" }}
        >
          Order Status
        </Button>
        <Button
          fullWidth
          variant={activeTab === "inventory" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleTabSwitch("inventory")}
          sx={{ borderRadius: "8px" }}
        >
          Inventory
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4}>
        {/* Title with Image */}
        <Box display="flex" alignItems="center" gap={2} mb={6}>
          <img
            src="https://media-cdn.tripadvisor.com/media/photo-s/28/4a/c0/81/interior.jpg"
            alt="Hotel Logo"
            style={{
              width: "160px",
              height: "120px",
              borderRadius: "8px",
              objectFit: "cover"
            }}
          />
          <h2 style={{
            color: "#007BFF",
            fontSize: "2.2rem",
            fontWeight: "bold",
            marginBottom: 0
          }}>
            Canteen Management
          </h2>
        </Box>

        {/* Order Status Section */}
        {activeTab === "order-status" && (
          <>
            {/* Toggle Buttons */}
            <Box display="flex" justifyContent="center" gap={3} mb={6}>
              <Button
                onClick={() => setStatus("pending")}
                variant={status === "pending" ? "contained" : "outlined"}
                color="primary"
                sx={{ borderRadius: "10px" }}
              >
                Pending
              </Button>
              <Button
                onClick={() => setStatus("in-progress")}
                variant={status === "in-progress" ? "contained" : "outlined"}
                color="warning"
                sx={{ borderRadius: "10px" }}
              >
                In Progress
              </Button>
              <Button
                onClick={() => setStatus("completed")}
                variant={status === "completed" ? "contained" : "outlined"}
                color="success"
                sx={{ borderRadius: "10px" }}
              >
                Completed
              </Button>
            </Box>

            {/* Orders Table */}
            <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Order</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .filter(order => order.status === status)
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell align="center">{order.name}</TableCell>
                        <TableCell align="center">
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => handleChangeStatus(order.id, order.status === "pending" ? "in-progress" : order.status === "in-progress" ? "completed" : "completed")}
                            variant="contained"
                            size="small"
                            color="secondary"
                            sx={{ marginRight: 1, borderRadius: "8px" }}
                          >
                            Next Status
                          </Button>
                          <Button
                            onClick={() => handleDelete(order.id, "order")}
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ borderRadius: "8px" }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Inventory Section */}
        {activeTab === "inventory" && (
          <>
            {/* Add Product Section */}
            <Box display="flex" gap={2} mb={4}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                sx={{ borderRadius: "10px" }}
              />
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                sx={{ borderRadius: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                sx={{
                  height: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Add Product
              </Button>
            </Box>

            {/* Inventory Table */}
            <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Product</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">${item.price}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleDelete(item.id, "inventory")}
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ borderRadius: "8px" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
}
