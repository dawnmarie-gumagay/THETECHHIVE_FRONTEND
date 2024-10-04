import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Switch,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import * as XLSX from 'xlsx';
import SUNavBar from "../../components/SUNavBar";
import './SUDirectory.css';

const SUDirectory = () => {
  const [category, setCategory] = useState('All');
  const [visibility, setVisibility] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tableData, setTableData] = useState([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showSuperUserForm, setShowSuperUserForm] = useState(false);
  const [showAddOfficeForm, setShowAddOfficeForm] = useState(false);

  // Sample data for each category
  const adminData = [
    { name: 'Alice Johnson', idNumber: '10001', office: 'IT Department', username: 'alicej', status: true },
    { name: 'Bob Brown', idNumber: '10002', office: 'HR Department', username: 'bobb', status: false },
    { name: 'Charlie Davis', idNumber: '10003', office: 'Admin Office', username: 'charlied', status: true },
  ];

  const superUserData = [
    { name: 'David Wilson', idNumber: '20001', email: 'david@example.com', username: 'davidw', status: true },
    { name: 'Eva Green', idNumber: '20002', email: 'eva@example.com', username: 'evag', status: false },
    { name: 'Frank White', idNumber: '20003', email: 'frank@example.com', username: 'frankw', status: true },
  ];

  const officeData = [
    { office: 'Marketing', head: 'Jake Long', email: 'marketing@example.com', services: 'Advertising', status: true },
    { office: 'Finance', head: 'Laura Grey', email: 'finance@example.com', services: 'Budgeting', status: false },
    { office: 'Sales', head: 'Mike Pink', email: 'sales@example.com', services: 'Customer Relations', status: true },
  ];

  const postData = [
    { name: 'John Doe', idNumber: '30001', datePosted: '2024-09-27', content: 'First post content', visibility: 'Visible' },
    { name: 'Jane Smith', idNumber: '30002', datePosted: '2024-09-26', content: 'Second post content', visibility: 'Hidden' },
    { name: 'Mark Lee', idNumber: '30003', datePosted: '2024-09-25', content: 'Third post content', visibility: 'Visible' },
  ];

  const commentData = [
    { name: 'Adam Blake', postId: '30001', dateCommented: '2024-09-27', comment: 'Great post!', visibility: 'Visible' },
    { name: 'Sarah Connor', postId: '30002', dateCommented: '2024-09-26', comment: 'Needs more detail.', visibility: 'Hidden' },
    { name: 'Luke Smith', postId: '30003', dateCommented: '2024-09-25', comment: 'I enjoyed this!', visibility: 'Visible' },
  ];

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    switch (selectedCategory) {
      case 'Admin':
        setTableData(adminData);
        break;
      case 'SuperUser':
        setTableData(superUserData);
        break;
      case 'Office':
        setTableData(officeData);
        break;
      case 'Post':
        setTableData(postData);
        break;
      case 'Comment':
        setTableData(commentData);
        break;
      default:
        setTableData([]);
        break;
    }
  };

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleToggleStatus = (index) => {
    const updatedData = [...tableData];
    updatedData[index].status = !updatedData[index].status;
    setTableData(updatedData);
  };

  // Apply status filtering for Admin, SuperUser, Office, Post, and Comment categories
  const filteredTableData = tableData.filter(row => {
    if (category === 'Post' || category === 'Comment') {
      return visibility === 'All' || row.visibility === visibility;
    } else {
      return statusFilter === 'All' || (statusFilter === 'Enabled' && row.status) || (statusFilter === 'Disabled' && !row.status);
    }
  });

  const exportToExcel = () => {
    let exportData;

    if (category === 'Admin') {
      exportData = filteredTableData.map(row => ({
        Name: row.name,
        'ID Number': row.idNumber,
        Office: row.office,
        Username: row.username,
        Status: row.status ? 'Enabled' : 'Disabled',
      }));
    } else if (category === 'SuperUser') {
      exportData = filteredTableData.map(row => ({
        Name: row.name,
        'ID Number': row.idNumber,
        Email: row.email,
        Username: row.username,
        Status: row.status ? 'Enabled' : 'Disabled',
      }));
    } else if (category === 'Office') {
      exportData = filteredTableData.map(row => ({
        Office: row.office,
        Email: row.email,
        'Head / Officer-In-Charge': row.head,
        Services: row.services,
        Status: row.status ? 'Enabled' : 'Disabled',
      }));
    } else if (category === 'Post') {
      exportData = filteredTableData.map(row => ({
        Name: row.name,
        'ID Number': row.idNumber,
        'Date Posted': row.datePosted,
        Content: row.content,
        Visibility: row.visibility,
      }));
    } else if (category === 'Comment') {
      exportData = filteredTableData.map(row => ({
        Name: row.name,
        'Post ID': row.postId,
        'Date Commented': row.dateCommented,
        Comment: row.comment,
        Visibility: row.visibility,
      }));
    }

    // Export data to Excel
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${category} Data`);
    XLSX.writeFile(workbook, `${category}_data.xlsx`);
  };

  return (
    <div className="su-directory-container">
      <SUNavBar />

      <img src={`${process.env.PUBLIC_URL}/DIR.png`} alt="Directory Header" className="directory-header-image" />

      <div className="dropdown-container">
        <FormControl variant="outlined" className="dropdown">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="SuperUser">SuperUser</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
            <MenuItem value="Post">Post</MenuItem>
            <MenuItem value="Comment">Comment</MenuItem>
          </Select>
        </FormControl>

        {category === 'Post' || category === 'Comment' ? (
          <FormControl variant="outlined" className="dropdown">
            <InputLabel id="visibility-label">Visibility</InputLabel>
            <Select
              labelId="visibility-label"
              id="visibility-select"
              value={visibility}
              onChange={handleVisibilityChange}
              label="Visibility"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Visible">Visible</MenuItem>
              <MenuItem value="Hidden">Hidden</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <FormControl variant="outlined" className="dropdown">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Enabled">Enabled</MenuItem>
              <MenuItem value="Disabled">Disabled</MenuItem>
            </Select>
          </FormControl>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={exportToExcel}
        >
          Download Excel
        </Button>

        {category === 'Admin' && (
          <Button variant="contained" color="primary" onClick={() => setShowAdminForm(true)}>
            Create an Admin Account
          </Button>
        )}

        {category === 'SuperUser' && (
          <Button variant="contained" color="primary" onClick={() => setShowSuperUserForm(true)}>
            Create a SuperUser Account
          </Button>
        )}

        {category === 'Office' && (
          <Button variant="contained" color="primary" onClick={() => setShowAddOfficeForm(true)}>
            Add an Office
          </Button>
        )}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {category === 'Office' ? (
                <>
                  <TableCell>Office</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Head / Officer-In-Charge</TableCell>
                  <TableCell>Services</TableCell>
                  <TableCell>Status</TableCell>
                </>
              ) : category === 'Post' ? (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>ID Number</TableCell>
                  <TableCell>Date Posted</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Visibility</TableCell>
                </>
              ) : category === 'Comment' ? (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>Post ID</TableCell>
                  <TableCell>Date Commented</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Visibility</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>ID Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Status</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTableData.map((row, index) => (
              <TableRow key={index}>
                {category === 'Office' ? (
                  <>
                    <TableCell>{row.office}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.head}</TableCell>
                    <TableCell>{row.services}</TableCell>
                    <TableCell>
                      <Switch
                        checked={row.status}
                        onChange={() => handleToggleStatus(index)}
                        color="primary"
                      />
                      {row.status ? 'Enabled' : 'Disabled'}
                    </TableCell>
                  </>
                ) : category === 'Post' ? (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.idNumber}</TableCell>
                    <TableCell>{row.datePosted}</TableCell>
                    <TableCell>{row.content}</TableCell>
                    <TableCell>{row.visibility}</TableCell>
                  </>
                ) : category === 'Comment' ? (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.postId}</TableCell>
                    <TableCell>{row.dateCommented}</TableCell>
                    <TableCell>{row.comment}</TableCell>
                    <TableCell>{row.visibility}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.idNumber}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>
                      <Switch
                        checked={row.status}
                        onChange={() => handleToggleStatus(index)}
                        color="primary"
                      />
                      {row.status ? 'Enabled' : 'Disabled'}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Admin Account Modal */}
      <Modal
        open={showAdminForm}
        onClose={() => setShowAdminForm(false)}
        aria-labelledby="create-admin-account-modal"
        aria-describedby="create-admin-account-form"
      >
        <Box className="admin-form-modal">
          <h2>Create an Admin Account</h2>
          <TextField label="Full Name" variant="outlined" fullWidth margin="normal" />
          <TextField label="Email" variant="outlined" fullWidth margin="normal" />
          <TextField label="Username" variant="outlined" fullWidth margin="normal" />
          <TextField label="ID Number" variant="outlined" fullWidth margin="normal" />
          <TextField label="Office" variant="outlined" fullWidth margin="normal" />
          <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
          <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowAdminForm(false)}
          >
            Create
          </Button>
        </Box>
      </Modal>

      {/* SuperUser Account Modal */}
      <Modal
        open={showSuperUserForm}
        onClose={() => setShowSuperUserForm(false)}
        aria-labelledby="create-superuser-account-modal"
        aria-describedby="create-superuser-account-form"
      >
        <Box className="superuser-form-modal">
          <h2>Welcome! Create a SuperUser Account</h2>
          <TextField label="Full Name" variant="outlined" fullWidth margin="normal" />
          <TextField label="Email" variant="outlined" fullWidth margin="normal" />
          <TextField label="Username" variant="outlined" fullWidth margin="normal" />
          <TextField label="ID Number" variant="outlined" fullWidth margin="normal" />
          <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
          <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowSuperUserForm(false)}
          >
            Create
          </Button>
        </Box>
      </Modal>

      {/* Add Office Modal */}
      <Modal
        open={showAddOfficeForm}
        onClose={() => setShowAddOfficeForm(false)}
        aria-labelledby="add-office-modal"
        aria-describedby="add-office-form"
      >
        <Box className="add-office-form-modal">
          <h2>Welcome! Add an Office</h2>
          <TextField label="Office" variant="outlined" fullWidth margin="normal" />
          <TextField label="Email" variant="outlined" fullWidth margin="normal" />
          <TextField label="Head / Officer-In-Charge" variant="outlined" fullWidth margin="normal" />
          <TextField label="Services" variant="outlined" fullWidth margin="normal" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowAddOfficeForm(false)}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SUDirectory;
