import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  value: string
  formValues: any
  setFormValues: (form: any) => void
}

function TextEditor({ value, formValues, setFormValues }: Props) {
  const QuillRef = useRef<ReactQuill>();
  const modules = {
    toolbar: [
      // [{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };
  const formats = [
    // 'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',
  ];

  return (
    <ReactQuill
      ref={(element) => {
        if (element !== null) {
          QuillRef.current = element;
        }
      }}
      value={value}
      onChange={(content, delta, source, editor) => setFormValues({
        ...formValues,
        description: editor.getHTML(),
      })}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  );
}

export default TextEditor;
