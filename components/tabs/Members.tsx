import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useGlobalTheme } from "@/utils/themeContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Button from "@mui/material/Button";
import { communityUser } from "@/types";
import EditUserModal from "./EditMember"; // Import your EditUserModal component
import { useIsCommunityUser } from "../helpers/functions";

const Members = ({
  users,
  communityId,
}: {
  users: communityUser[];
  communityId: string;
}) => {
  const { colors } = useGlobalTheme();
  const isAdmin = useIsCommunityUser("admin", communityId);

  const colorStyle = (user: communityUser) => {
    return {
      color:
        user.status === "active"
          ? colors.green[500]
          : user.status === "pending"
          ? colors.active
          : colors.red[500],
    };
  };

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<communityUser | null>(
    null
  );

  const handleEditClick = (user: communityUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mb: 10,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box className="flex gap-2 items-center">
                    <Avatar
                      src={user.profileImage}
                      alt={user.name}
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <Typography variant="h6">{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Button
                    sx={{
                      "& .MuiTypography-root": {
                        color: colorStyle(user).color,
                      },
                      "& .MuiSvgIcon-root": {
                        color: colorStyle(user).color,
                      },
                    }}
                    startIcon={
                      user.status === "active" ? (
                        <ToggleOnIcon />
                      ) : (
                        <ToggleOffIcon />
                      )
                    }
                  >
                    <Typography variant="body2">{user.status}</Typography>
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    startIcon={
                      user.role === "admin" ? (
                        <AdminPanelSettingsIcon color="error" />
                      ) : (
                        <PersonIcon color="primary" />
                      )
                    }
                  >
                    <Typography variant="body2">{user.role}</Typography>
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    disabled={!isAdmin}
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          communityId={communityId}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default Members;
