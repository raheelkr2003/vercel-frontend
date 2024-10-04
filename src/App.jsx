import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const initialUsers = [
  {
    name: "student1",
    email: "student1@gmail.com",
  },
  {
    name: "student2",
    email: "student2@gmail.com",
  },
];

export default function BasicTable() {
  const [users, setUsers] = React.useState(initialUsers);
  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');

  const handleClickOpen = (index) => {
    setCurrentIndex(index);
    setNewName(users[index].name);
    setNewEmail(users[index].email);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (newName && newEmail) {
      const updatedUsers = [...users];
      if (currentIndex !== null) {
        updatedUsers[currentIndex] = { name: newName, email: newEmail };
      } else {
        updatedUsers.push({ name: newName, email: newEmail });
      }
      setUsers(updatedUsers);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setCurrentIndex(null);
    setNewName('');
    setNewEmail('');
    setOpen(true);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>User Management</h1>

      {/* Center the button both horizontally and vertically */}
      <div style={{ display: 'flex', justifyContent: 'center',marginBottom: '10px'}}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} style={{ width: '80%' }}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell style={{ display: 'flex', justifyContent: 'space-between', marginRight: '1px' }}>
                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(index)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentIndex !== null ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new name and email for the user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}