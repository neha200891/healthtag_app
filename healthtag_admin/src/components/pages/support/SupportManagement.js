import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../../common/Layout";
import {
  getAllSupportTickets,
  getTicketChat,
  sendMessage,
  handleChangeTicketStatus,
} from "../../services/contentService";
import { ModalHeader, Modal, ModalBody } from "reactstrap";
import { useSelector } from "react-redux";
import { sendErrorInfo, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";
import ReactDatatable from "../../common/ReactDatatable";
const SupportManagement = () => {
  const [ticket, setTicket] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [chat, setChat] = useState([]);
  const [modal, setModal] = useState(false);
  const userDetails = useSelector((state) => state.root.userDetails);
  const [message, seteMessage] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const toggleModal = () => setModal(!modal);
  useEffect(() => {
    getTickets();
  }, [ticketStatus]);

  const getTickets = () => {
    getAllSupportTickets(ticketStatus).then((response) => {
      if (response.status === true) {
        setTicket(response.data);
      }
    });
  };

  const selectChat = (id) => {
    getTicketChat(id).then((response) => {
      if (response.status === true) {
        setChat(response.data);
      }
    });
  };

  const handleSendMessage = () => {
    if (selectedTicket.status != "open") {
      return sendErrorInfo("This ticket is closed");
    }
    let postData = {
      message: message,
      ticketId: selectedTicket.id,
    };
    if (message.length == 0) {
      return sendErrorInfo("first type a message");
    }
    sendMessage(postData).then((response) => {
      if (response.status === true) {
        seteMessage("");
        selectChat(selectedTicket.id);
      }
    });
  };

  const handleSentMessage = (e) => {
    if (e.code === "Enter") {
      //checks whether the pressed key is "Enter"
      handleSendMessage();
    }
  };

  const changeStatus = (id) => {
    handleChangeTicketStatus(id).then((response) => {
      if (response.status == true) {
        sendSuccessMessage(response);
        getTickets();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const columns = [
    { name: "ID", selector: (row) => row.id },
    { name: "Title", selector: (row) => row.title },
    { name: "Description", selector: (row) => row.topic },
    { name: "User Name", selector: (row) => row?.user?.first_name + " " + row?.user?.last_name },
    { name: "Email", selector: (row) => row.user?.email },
    { name: "Status", selector: (row) => row?.status },
    {
      name: "Action",
      cell: (item) => (
        <>
          <a
            href="javascript:void(0)"
            onClick={() => {
              setSelectedTicket(item);
              selectChat(item.id);
              toggleModal();
            }}
            className="btn btn-round btn-primary btn-icon btn-sm mx-2"
          >
            <i class="fas fa-comment-medical"></i>
          </a>

          <a
            href="javascript:void(0)"
            style={item.status == "open" ? { cursor: "pointer" } : { pointerEvents: "none" }}
            onClick={() => changeStatus(item?.id)}
            className="btn btn-round btn-danger btn-icon btn-sm  mx-2"
          >
            <i class="far fa-window-close"></i>
          </a>
        </>
      ),
    },
  ];
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header row">
              <h4 className="card-title">All Support Tickets</h4>
              <h5 className="card-category ml-auto ">
                <select className="form-control mt-3  " onChange={(e) => setTicketStatus(e.target.value)}>
                  <option value="">Select ticket Status</option>
                  <option value="open">Open</option>
                  <option value="solved">Solved</option>
                </select>
              </h5>
            </div>
            <div className="card-body">
              <div className="toolbar"></div>
              <ReactDatatable columns={columns} data={ticket} />
            </div>
            {/* end content*/}
          </div>
          {/*  end card  */}
        </div>
        {/* end col-md-12 */}
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}></ModalHeader>

        <ModalHeader toggle={toggleModal}>{selectedTicket?.title} </ModalHeader>
        <ModalBody>
          <div id="chat2">
            {chat &&
              chat.length > 0 &&
              chat.map((item, i) => {
                if (item.userId == userDetails.id) {
                  return (
                    <div className="d-flex flex-row justify-content-start mb-4">
                      <img
                        src={item?.user?.profile_image || "assets/img/default-avatar.png"}
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                      <div
                        className="p-3 ms-3"
                        style={{ borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)" }}
                      >
                        <p className="small mb-0">{item?.message}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="d-flex flex-row justify-content-end mb-4">
                      <div className="p-3 me-3 border" style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}>
                        <p className="small mb-0">{item?.message}</p>
                      </div>
                      <img
                        src={item?.user?.profile_image || "assets/img/default-avatar.png"}
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div>
                  );
                }
              })}

            <div class=" text-muted d-flex justify-content-start align-items-center p-3">
              <input
                className="form-control form-control-lg"
                id="textAreaExample"
                placeholder="Message...."
                rows={2}
                value={message}
                onChange={(e) => seteMessage(e.target.value)}
                defaultValue={""}
                onKeyDown={(e) => handleSentMessage(e)}
                readOnly={selectedTicket.status != "open" ? true : false}
              />
              <a
                class="ms-3"
                style={selectedTicket.status == "open" ? { cursor: "pointer" } : { pointerEvents: "none" }}
                href="javascript:void(0) "
                onClick={() => handleSendMessage()}
              >
                <i class="fas fa-paper-plane"></i>
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Layout>
  );
};

export default SupportManagement;
