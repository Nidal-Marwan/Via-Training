import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../Button/Button";
import Modal from "../Modal/Modal";

export const ModalContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);

  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const onAccept = () => {
    handleClose();
    navigate("locations");
    //for testing sign out, will remove later
    // window.location.reload() 
    //Routing to favorite locations page
  };
  const onCancel = () => {
    handleClose();
    //Routing to live page
  };
  return (
    <>
      <Modal
        message={t("modal.favorites.message")}
        acceptText={t("modal.favorites.accept")}
        cancelText={t("modal.favorites.decline")}
        open={showModal}
        onAccept={onAccept}
        onCancel={onCancel}
      />
    </>
  );
};
