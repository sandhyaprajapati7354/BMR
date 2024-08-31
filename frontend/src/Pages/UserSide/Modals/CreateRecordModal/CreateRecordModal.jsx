import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import Select from "react-select";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addBmr } from "../../../../userSlice";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

function CreateRecordModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    reviewers: [],
    approvers: [],
  });
  const [reviewers, setReviewers] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [isSelectedReviewer, setIsSelectedReviewer] = useState([]);
  const [isSelectedApprover, setIsSelectedApprover] = useState([]);
  const dispatch = useDispatch();

  const addBMRs = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://195.35.6.197:7000/bmr-form/add-bmr",
        {
          name: formData.name,
          reviewers: isSelectedReviewer.map((reviewer) => ({
            reviewerId: reviewer.value,
            status: "pending",
            reviewer: reviewer.label,
            date_of_review: "NA",
            comment: null,
          })),
          approvers: isSelectedApprover.map((approver) => ({
            approverId: approver.value,
            status: "pending",
            approver: approver.label,
            date_of_approval: "NA",
            comment: null,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message || "BMR added successfully!");
        dispatch(addBmr(response.data.bmr));
        setFormData({ name: "", reviewers: [], approvers: [] });
        setIsSelectedReviewer([]);
        setIsSelectedApprover([]);
        setTimeout(() => {
          onClose();
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("BMR Already Registered");
      });
  };

  useEffect(() => {
    axios
      .post(
        "http://195.35.6.197:7000/bmr-form/get-user-roles",
        {
          role_id: 3,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const reviewerOptions = [
          { value: "select-all", label: "Select All" },
          ...new Map(
            response.data.message.map((role) => [
              role.user_id,
              {
                value: role.user_id,
                label: `${role.User.name}`,
              },
            ])
          ).values(),
        ];
        setReviewers(reviewerOptions);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    axios
      .post(
        "http://195.35.6.197:7000/bmr-form/get-user-roles",
        {
          role_id: 4,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const approverOptions = [
          { value: "select-all", label: "Select All" },
          ...new Map(
            response.data.message.map((role) => [
              role.user_id,
              {
                value: role.user_id,
                label: `${role.User.name}`,
              },
            ])
          ).values(),
        ];
        setApprovers(approverOptions);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selected, field) => {
    if (selected.some((option) => option.value === "select-all")) {
      const allOptions = field === "reviewers" ? reviewers : approvers;
      const nonSelectAllOptions = allOptions.filter(
        (option) => option.value !== "select-all"
      );
      setIsSelectedReviewer(
        field === "reviewers" ? nonSelectAllOptions : isSelectedReviewer
      );
      setIsSelectedApprover(
        field === "approvers" ? nonSelectAllOptions : isSelectedApprover
      );
    } else {
      field === "reviewers"
        ? setIsSelectedReviewer(selected)
        : setIsSelectedApprover(selected);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      reviewers: isSelectedReviewer,
      approvers: isSelectedApprover,
    });
  }, [isSelectedReviewer, isSelectedApprover]);

  return (
  <>
    <Modal open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          Add BMR
        </Typography>
        <form onSubmit={addBMRs} className="space-y-4">
          <TextField
            label="BMR Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: {
                height: "48px",
              },
            }}
            InputLabelProps={{
              style: {
                top: "0",
              },
            }}
          />
          <div>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Reviewer
            </Typography>
            <Select
              name="reviewers"
              isMulti
              options={reviewers}
              value={isSelectedReviewer}
              onChange={(selected) => handleSelectChange(selected, "reviewers")}
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: "#d0d0d0",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#a0a0a0",
                  },
                }),
              }}
            />
          </div>

          <div>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Approver
            </Typography>
            <Select
              name="approvers"
              isMulti
              options={approvers}
              value={isSelectedApprover}
              onChange={(selected) => handleSelectChange(selected, "approvers")}
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: "#d0d0d0",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#a0a0a0",
                  },
                }),
              }}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outlined"
              color="error"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add BMR
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  </>
  );
}

export default CreateRecordModal;
