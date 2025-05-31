const Header = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-bold">오늘은 📅</h3>
      <h1 className="text-3xl font-extrabold text-blue-500 mb-5">
        {year}년 {month}월 {date}일
      </h1>
    </div>
  );
};

export default Header;
