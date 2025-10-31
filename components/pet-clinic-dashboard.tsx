import { Title } from './title';

export const PetClinicDashboard = () => {
  return (
    // Change whatever you want here. It's just an example of using tailwind
    <div className="grid grid-rows-auto-1fr gap-y-4 p-4 md:p-8 max-w-screen-lg mx-auto">
      <Title />
      <Table />
    </div>
  );
};

const Table = () => {
  return <div>Dashboard Table</div>;
};
