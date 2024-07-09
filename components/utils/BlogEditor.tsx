import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
//w
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { IconColorPicker } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { editorColors } from "@/constants";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { useEffect } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

export default function BlogEdito({
  initialText,
  setText,
}: {
  initialText?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { colors } = useGlobalTheme();
  //color shout be a colors.textSecondary

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialText,
  });
  useEffect(() => {
    if (editor?.getHTML()) {
      const updatedHTML = updateAnchorUrls(editor.getHTML());
      setText(updatedHTML);
    }
  }, [editor?.getHTML()]);
  function updateAnchorUrls(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const anchorElements = doc.querySelectorAll("a");
    anchorElements.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (href && !href.startsWith("http") && !href.startsWith("https")) {
        anchor.setAttribute("href", "https://" + href);
      }
      anchor.setAttribute("target", "_blank");
    });
    return new XMLSerializer().serializeToString(doc);
  }
  return (
    <Box
      sx={{
        "& .mantine-3eqw8l": {
          backgroundColor: `${colors.surface}`,
          border: "none",
          //   background: `red !important`,
          padding: "0rem !important",
          margin: "0rem !important",
        },
        "& .mantine-nlxhsk": {
          border: `1px solid ${colors.active} !important`,
          backgroundColor: `${colors.surface}`,
          borderBottom: "none",
          display: "none",
        },
        "& .mantine-UnstyledButton-root": {
          backgroundColor: `${colors.surface} !important`,
          // border: `1px solid ${colors.active} !important`,
          border: "none",
          color: `${colors.text} !important`,
          fontWeight: "bold !important",
        },

        "& .mantine-1drwy5n": {
          backgroundColor: `${colors.surface} !important`,
          color: `${colors.text} !important`,

          minHeight: "450px !important",
          minWidth: "100% !important",
          border: "none",
          padding: "0rem !important",
          margin: "0rem !important",
        },
        "& .mantine-1drwy5n .ProseMirror": {
          width: "100% !important",
        },
        "& .mantine-1mlg4mb": {
          background: "none !important",
        },
        "& mantine-ColorSwatch-alphaOverlay": {
          background: "none !important",
        },
        // [data-tippy-root]
        "[data-tippy-root]": {
          "& .mantine-UnstyledButton-root": {
            backgroundColor: `${colors.active} !important`,
            border: `1px solid ${colors.surface} !important`,
          },
        },
      }}
    >
      <RichTextEditor editor={editor} placeholder="Type something...">
        <RichTextEditor.Toolbar
          sticky
          stickyOffset={60}
        ></RichTextEditor.Toolbar>
        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.H2 />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}
        {editor && (
          <FloatingMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Hr />
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />

              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>
          </FloatingMenu>
        )}
        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
}
