import { useState } from "react";
import { useGroupActions } from "../hooks/useTodoStore";
import { useModalStore } from "../hooks/useModalStore";

const GroupModal = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#fef9c3");
  const { onAddGroup } = useGroupActions();
  const { closeGroupModal } = useModalStore();

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAddGroup(name.trim(), color);
    closeGroupModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">새 그룹 추가</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="그룹 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm">색상</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={closeGroupModal}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
