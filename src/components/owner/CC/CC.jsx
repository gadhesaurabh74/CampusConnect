import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const CC = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Document 1', status: 'pending', fileUrl: 'path/to/document1.pdf' },
    { id: 2, name: 'Document 2', status: 'done', fileUrl: 'path/to/document2.pdf' },
    { id: 3, name: 'Document 3', status: 'pending', fileUrl: 'path/to/document3.pdf' },
    { id: 4, name: 'Document 4', status: 'done', fileUrl: 'path/to/document4.pdf' },
    { id: 5, name: 'Document 5', status: 'pending', fileUrl: 'path/to/document5.pdf' },
    { id: 6, name: 'Document 6', status: 'done', fileUrl: 'path/to/document6.pdf' },
  ]);

  // Handle deleting a document
  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Handle changing the status of a document to complete
  const handleChangeStatus = (id) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, status: 'done' } : doc
    ));
  };

  return (
    <Box display="flex" p={4} sx={{ minHeight: "100vh", backgroundColor: "#b0b0b0", justifyContent: "center", alignItems: "center" }}>
      {/* Centered Content Area */}
      <Box
        sx={{
          width: 900,  // Increased width for a more spacious layout
          backgroundColor: "#fff", // White background for the content area
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          padding: "40px", // Increased padding
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        {/* Title with Image */}
        <Box display="flex" alignItems="center" gap={2} mb={6}>
          <img
            src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/02/p2--1--3.jpg"  // Replace with your image path
            alt="Hotel Logo"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
          <h2 style={{
            color: "#333",
            fontSize: "2.5rem",
            fontWeight: "600",
            marginBottom: 0,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            CC Management
          </h2>
        </Box>

        {/* Grey line below the title */}
        <Box sx={{
          width: "100%",
          height: "2px", // Line thickness
          backgroundColor: "#808080", // Grey color
          marginBottom: "30px", // Space below the line
        }}></Box>

        {/* Documents Table */}
        <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#333", fontSize: "1rem" }}>Document</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#333", fontSize: "1rem" }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#333", fontSize: "1rem" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} sx={{ '&:hover': { backgroundColor: "#f5f5f5" } }}>
                  <TableCell align="center">{doc.name}</TableCell>
                  <TableCell align="center">{doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}</TableCell>
                  <TableCell align="center">
                    {/* Toggle actions */}
                    {doc.status === "pending" ? (
                      <>
                        <Button
                          onClick={() => handleChangeStatus(doc.id)}
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{
                            marginRight: 2,
                            padding: "6px 16px",
                            borderRadius: "20px",
                            textTransform: "capitalize",
                            '&:hover': { backgroundColor: "#005bb5" },
                          }}
                        >
                          Mark as Complete
                        </Button>
                        <Button
                          onClick={() => handleDelete(doc.id)}
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{
                            padding: "6px 16px",
                            borderRadius: "20px",
                            textTransform: "capitalize",
                            '&:hover': { backgroundColor: "#f44336", color: "#fff" },
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleChangeStatus(doc.id)}
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{
                            marginRight: 2,
                            padding: "6px 16px",
                            borderRadius: "20px",
                            textTransform: "capitalize",
                            '&:hover': { backgroundColor: "#ff5722" },
                          }}
                        >
                          Revert to Pending
                        </Button>
                        <Button
                          onClick={() => handleDelete(doc.id)}
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{
                            padding: "6px 16px",
                            borderRadius: "20px",
                            textTransform: "capitalize",
                            '&:hover': { backgroundColor: "#f44336", color: "#fff" },
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    {/* Download button */}
                    <Button
                      component="a"
                      href={doc.fileUrl}  // File URL for downloading
                      download={doc.name}  // The name of the document that will appear when downloaded
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        marginLeft: 2,
                        padding: "6px 16px",
                        borderRadius: "20px",
                        textTransform: "capitalize",
                        '&:hover': { backgroundColor: "#003366" },
                      }}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CC;
