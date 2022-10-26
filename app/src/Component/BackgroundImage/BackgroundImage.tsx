import { createTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import { backGroundImageState } from "../../Domain/atoms";

export const BackgroundImage = () => {
  const backgroundImageURL = useRecoilValue(backGroundImageState);
  return (
    <div
      style={{
        maxWidth: "600px",
        height: "800px",
        // margin: "0 auto",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "40% 20%",
        backgroundImage: `url(${backgroundImageURL})`,
        opacity: 0.8,
        // background: "rgba(255,255,255,0.7)",
      }}
    ></div>
  );
};

/**
 * 背景色と選択しているカテゴリのマッピング
 * @param categoryValue
 * @returns
 */
const createBackgroundColor = (categoryValue: number) => {
  switch (categoryValue) {
    case 1:
      return "#ffcce9";
    case 2:
      return "#ceeefd";
    case 3:
      return "#fdeace";
    case 4:
      return "#f6d5f5";
    default:
      return "#ffcce9";
  }
};

export const theme = (categoryValue: number) => {
  return createTheme({
    palette: {
      // primary: {
      //   main: "#009688",
      //   contrastText: "#795548",
      // },
      background: {
        default: createBackgroundColor(categoryValue),
      },
      // mode: "dark",
      // text: { primary: "#ff9800" },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            background: "#eeeeee",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#ffc107",
          },
        },
      },
    },
  });
};
