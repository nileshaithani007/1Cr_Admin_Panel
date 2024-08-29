import React, { useState } from "react";
import axios from "axios";
import avatar from "../../assets/images/brand/Avatar.png";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  Container,
} from "react-bootstrap";
import { toast } from "react-toastify";

const TechnologyCard = ({ ele }) => {
  console.log("Element=========>", ele);
  // Changed from TeachnologyCard
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    technology_id: ele.technology_id,
    technology_name: ele.technology_name,
    is_active: ele.is_active || 0,
  });

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      is_active: !prevData.is_active,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.technology_name) {
      toast.error("Please fill in the technology name");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `${
          process.env.URL || "http://localhost:3000"
        }/technology/updateTechnology`,
        formData
      );
      toggleModal();
      toast.success("Technology updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating technology:", error);
      toast.error("Failed to update technology");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card px-3 py-2 mb-3 shadow-sm">
        <div className="d-flex align-items-start">
          <img
            src={process.env.URL + "/images/other.png"}
            className="rounded-circle me-3"
            alt="Avatar"
            width={100}
            height={100}
          />
          <div className="w-100">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <h4 className="custom_card_title fw-bold mx-1 my-0">
                {ele.technology_name}
              </h4>
              <Button
                onClick={toggleModal}
                className="btn btn-sm btn-primary px-3 py-1"
                aria-label="Edit technology"
              >
                Edit
              </Button>
            </div>
            <div className="mt-3 d-flex align-items-center">
              <div
                className={`badge ${
                  ele.is_active ? "bg-success" : "bg-danger"
                } me-2`}
              >
                {ele.is_active ? "Active" : "Inactive"}
              </div>
              {ele.is_active ? "🟢" : "🔴"}
            </div>
          </div>
        </div>
      </div>

      <Modal size="lg" show={showModal} onHide={toggleModal}>
        <ModalHeader closeButton>
          <Modal.Title as="h3">Update Technology Details</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="technology_name">
                <Form.Label>Technology Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Technology Name"
                  name="technology_name"
                  value={formData.technology_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="status_toggle" className="mt-3">
                <Form.Label>Status</Form.Label>
                <Form.Check
                  type="switch"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleToggleChange}
                />
              </Form.Group>
              <ModalFooter>
                <Button variant="secondary" onClick={toggleModal}>
                  Close
                </Button>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </ModalFooter>
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TechnologyCard;
