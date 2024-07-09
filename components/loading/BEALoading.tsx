import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const BEALoading = () => {
  return (
    <Box m={1} className="flex flex-col gap-5">
      <Skeleton variant="rectangular" width={"100%"} height={250} />
      <div className="flex justify-between items-center ">
        {/* 100px circular skeleton */}
        <Skeleton variant="circular" width={100} height={100} />
        {/* 100px rectangular skeleton */}
        <Skeleton variant="rectangular" width={100} height={30} />
      </div>
      <Skeleton variant="rectangular" width={100} height={30} />
      <Skeleton variant="rectangular" width={"100%"} height={250} />
    </Box>
  );
};

export default BEALoading;
