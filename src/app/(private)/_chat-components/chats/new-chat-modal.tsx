import { Modal } from 'antd';
import React from 'react';

export default function NewChatModal({
  showNewChatModal,
  setShowNewChatModal
}: {
  showNewChatModal: boolean;
  setShowNewChatModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return <div>
    <Modal
      open={showNewChatModal}
      onCancel={() => setShowNewChatModal(false)}
      footer={null}
      title={null}
      centered
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-primary text-center text-xl font-bold uppercase">
          Create New Chat
        </h1>
      </div>
    </Modal>
  </div>
}
