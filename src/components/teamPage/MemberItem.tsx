// MemberItem.tsx
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

interface MemberItemProps {
  email: string;
  onRemove: () => void; // Callback function to remove the member
}

const MemberItem: React.FunctionComponent<MemberItemProps> = ({ email, onRemove }) => {
  return (
    <div className="flex flex-row gap-2 px-3 py-2 bg-custom-gray rounded-2xl w-fit items-center">
      <label className="text-custom-white">{email}</label>
      <button className="text-custom-white hover:text-custom-orange" onClick={onRemove}>
        <RxCross2 className="text-custom-white" size="20" />
      </button>
    </div>
  );
};

export default MemberItem;
