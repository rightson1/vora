import { useGlobalTheme } from "@/utils/themeContext";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const CommentsLoading = () => {
  const { colors } = useGlobalTheme();
  return (
    <Box
      p={1}
      className="flex flex-col gap-5"
      sx={{
        bgcolor: colors.surface,
      }}
      borderRadius={1}
    >
      <div className="flex justify-between items-center ">
        {/* 100px circular skeleton */}
        <Skeleton variant="circular" width={50} height={50} />
        {/* 100px rectangular skeleton */}
        <Skeleton variant="rectangular" width={100} height={30} />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton variant="text" width={"100%"} />
        <Skeleton variant="text" width={"100%"} />
      </div>
    </Box>
  );
};

export default CommentsLoading;
