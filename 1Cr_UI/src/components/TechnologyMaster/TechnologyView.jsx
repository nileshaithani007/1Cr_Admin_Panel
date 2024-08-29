import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Form,
  Container,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TechnologyCard from "./TechnologyCard";

function TechnologyView() {
  const [formData, setFormData] = useState({
    technology_name: "",
  });

  const [technologyData, setTechnologyData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      await axios.post(
        `${process.env.URL}/technology/createTechnology`,
        formData
      );
      setReload(!reload);
      setShowModal(false);
      setFormData({ technology_name: "" });
      toast.success("Technology added successfully", {
        position: "top-center",
        autoClose: 1000,
        theme: "light",
      });
    } catch (error) {
      console.error("There was an error adding the technology:", error);
      toast.error("Failed to add technology", {
        position: "top-center",
        autoClose: 1000,
        theme: "light",
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);

    axios.get(`${process.env.URL}/technology/getAllTechnology`).then((res) => {
      setLoader(false);
      console.log("Response Data====>", res?.data?.data?.data);
      setTechnologyData(res?.data?.data?.data);
    });
  }, [reload]);

  return (
    <>
      <div className="page-header mb-0 mt-1">
        <div className="page-title w-50 d-flex align-items-center">
          <h3 className="custom_page_title fw-bold mt-2">
            Technology Master(s)
          </h3>
        </div>
        <div>
          <Button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Create Technology
          </Button>
        </div>
      </div>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <ModalHeader className="align-items-center">
          <ModalTitle as="h3">Technology Details</ModalTitle>
          <span
            className="d-flex ms-auto"
            onClick={() => setShowModal(false)}
            style={{ cursor: "pointer" }}
          >
            <i className="fe fe-x ms-auto fe-xl"></i>
          </span>
        </ModalHeader>
        <ModalBody>
          <Container className="card px-3 py-2">
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
              <ModalFooter>
                <Button variant="primary" type="submit">
                  Save & Close
                </Button>
              </ModalFooter>
            </Form>
          </Container>
        </ModalBody>
      </Modal>

      {loader ? (
        <p>Loading Technologies...</p>
      ) : (
        technologyData.map((ele, ind) => <TechnologyCard key={ind} ele={ele} />)
      )}
    </>
  );
}

export default TechnologyView;
