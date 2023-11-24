import ShirtCard from "./shifcard";

const GridBillboard = () => {
  return (
    <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
      <div className="flex flex-row p-8 w-full h-full">
        <div className="flex-1 h-full">
          <ShirtCard />
        </div>
        <div className="flex-1 flex flex-col h-full">
          <div className="flex-1 h-1/2">
            <ShirtCard />
          </div>
          <div className="flex-1 h-1/2">
            <ShirtCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridBillboard;
