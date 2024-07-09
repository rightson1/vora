import React from "react";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import { useGetPosts } from "@/utils/hooks/usePosts";
import Blog from "@/components/blog";
import Button from "@mui/material/Button";
import { useAuth } from "@/utils/AuthContext";
import { PostFetched } from "@/types";
import Grid from "@mui/material/Grid";
import BlogLoading from "../loading/BlogLoading";

const Posts = ({
  blogs,
  isLoading,
}: {
  blogs?: PostFetched[];
  isLoading: boolean;
}) => {
  const { colors } = useGlobalTheme();
  const { user } = useAuth();
  const [viewStatus, setViewStatus] = React.useState(false);
  const [blogsFiltered, setBlogsFiltered] = React.useState<PostFetched[]>([]);
  React.useEffect(() => {
    if (blogs) {
      if (viewStatus) {
        //filter view blogs where blogs.views.includes(user._id)
        const filteredBlogs = blogs.filter((_) => !_.views.includes(user._id));
        setBlogsFiltered(filteredBlogs);
      } else {
        setBlogsFiltered(blogs);
      }
    }
  }, [blogs, viewStatus]);
  return (
    <>
      <div className="flex items-center justify-between ">
        <Typography variant="h3">Blogs</Typography>
        <div className="flex itemPs-center gap-4">
          <Button
            onClick={() => setViewStatus(false)}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: !viewStatus
                ? colors.indigo[500]
                : colors.indigo[800],
            }}
          >
            All
          </Button>
          <Button
            variant="contained"
            onClick={() => setViewStatus(true)}
            sx={{
              backgroundColor: viewStatus
                ? colors.indigo[500]
                : colors.indigo[800],
            }}
            size="small"
          >
            New
          </Button>
        </div>
      </div>
      <Grid container mt={2} rowSpacing={2}>
        {blogs && blogs.length > 0 ? (
          blogsFiltered.map((blog, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              sx={{
                pl: {
                  xs: 0,
                  md: index % 2 === 0 ? 0 : 1,
                },
                pr: {
                  xs: 0,
                  md: index % 2 === 0 ? 1 : 0,
                },
              }}
            >
              <Blog post={blog} />
            </Grid>
          ))
        ) : isLoading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <Grid
                item
                xs={12}
                md={6}
                key={index}
                py={1}
                sx={{
                  pl: {
                    xs: 0,
                    md: index % 2 === 0 ? 0 : 1,
                  },
                  pr: {
                    xs: 0,
                    md: index % 2 === 0 ? 1 : 0,
                  },
                }}
              >
                <BlogLoading />
              </Grid>
            ))
        ) : (
          <Typography variant="h6" mb={10}>
            No Blogs
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Posts;
