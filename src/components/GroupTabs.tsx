import { useTodoInfo } from "../hooks/useTodoStore";
import { useGroupActions } from "../hooks/useTodoStore";
import { useModalStore } from "../hooks/useModalStore";
import GroupModal from "./GroupModal";

// HEX 색상 밝기 → 텍스트 색상 결정
const getTextColorFromHex = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness > 186 ? "text-black" : "text-white";
};

// HEX 색상 어둡게 만들기
const darkenHexColor = (hex: string, percent: number) => {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) - percent;
  let g = ((num >> 8) & 0x00ff) - percent;
  let b = (num & 0x0000ff) - percent;

  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const GroupTabs = () => {
  const { groups, activeGroupId, todoItems } = useTodoInfo();
  const { onSetActiveGroup, onDeleteGroup } = useGroupActions();
  const { isGroupModalOpen, openGroupModal } = useModalStore();

  const getTodoCountByGroup = (groupId: number) => {
    return todoItems.filter((todo) => todo.groupId === groupId).length;
  };

  const handleDelete = (groupId: number) => {
    if (confirm("정말 이 그룹을 삭제하시겠습니까?")) {
      onDeleteGroup(groupId);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {groups.map((group) => {
        const isActive = activeGroupId === group.id;
        const baseColor = group.color;
        const bgColor = isActive ? darkenHexColor(baseColor, 20) : baseColor;
        const textColor = getTextColorFromHex(bgColor);

        return (
          <div key={group.id}>
            <button
              onClick={() => onSetActiveGroup(group.id)}
              className={`flex gap-3 items-center justify-between p-4 rounded-3xl font-semibold transition-colors ${textColor} cursor-pointer`}
              style={{ backgroundColor: bgColor }}
            >
              <span className="truncate">
                {group.name} ({getTodoCountByGroup(group.id)})
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(group.id);
                }}
                className={`text-xs flex items-center justify-center ${textColor}`}
                title="그룹 삭제"
              >
                ×
              </span>
            </button>
          </div>
        );
      })}

      <button
        onClick={openGroupModal}
        className="p-4 rounded-3xl bg-gray-200 hover:bg-gray-300 cursor-pointer"
      >
        + 그룹 추가
      </button>

      {isGroupModalOpen && <GroupModal />}
    </div>
  );
};

export default GroupTabs;
