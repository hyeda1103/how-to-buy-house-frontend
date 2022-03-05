import React, { useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillResize, { PlaceholderRegister } from 'quill-resize-module';
import axios from 'axios';
import { ImageBlot } from './class/ImageBlot';
import { VideoBlot } from './class/VideoBlot';

interface Props {
  value: string
  formValues: any
  setFormValues: (form: any) => void
}

Quill.register('modules/resize', QuillResize);
Quill.register(ImageBlot);

PlaceholderRegister();

function TextEditor({ value, formValues, setFormValues }: Props) {
  const QuillRef = useRef<ReactQuill>();
  const InputOpenImageRef = useRef<any>();
  const InputOpenVideoRef = useRef<any>();

  const handleImage = () => InputOpenImageRef.current.click();

  const handleVideo = () => InputOpenVideoRef.current.click();

  const handleInsertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };

      axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/posts/upload-file`,
        formData,
        config,
      ).then((res) => {
        if (res.data) {
          const quill = QuillRef.current?.getEditor();
          quill?.focus();

          const range = quill?.getSelection();
          const position = range ? range.index : 0;

          quill?.insertEmbed(position, 'image', {
            src: res.data,
            alt: res.data,
          });
          quill?.setSelection(position + 1, 1);
        }
      });
    }
  };

  const handleInsertVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0];

      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/posts/upload-file`,
        formData,
        config,
      ).then((res) => {
        if (res.data) {
          console.log(res.data);
          const quill = QuillRef.current?.getEditor();
          quill?.focus();

          const range = quill?.getSelection();
          const position = range ? range.index : 0;

          quill?.insertEmbed(position, 'video', {
            src: res.data,
            title: res.data,
          });
          quill?.setSelection(position + 1, 1);
        }
      });
    }
  };

  const modules = useMemo(() => ({
    syntax: false,
    resize: {
      modules: ['Resize', 'DisplaySize'],
    },
    toolbar: {
      container: '#toolbar',
      // id ="toorbar"는  그 위에 B I U S I V F P 이거 있는 곳이다.
      handlers: {
        insertImage: handleImage,
        // insertVideo: handleVideo,
        // insertFile: fileHandler,
        // insertPoll: pollHandler,
      },
    },
  }), []);
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'image', 'video', 'file', 'link', 'code-block', 'blockquote', 'clean',
  ];

  return (
    <>
      <div id="toolbar">
        <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
          <option label="1" value="1" />
          <option label="2" value="2" />
          <option label="3" value="" />
        </select>
        <button type="button" className="ql-bold">B</button>
        <button type="button" className="ql-italic">I</button>
        <button type="button" className="ql-underline">U</button>
        <button type="button" className="ql-strike">S</button>
        <button type="button" className="ql-insertImage">
          I
        </button>
        <button type="button" className="ql-insertVideo">
          V
        </button>
        <button type="button" className="ql-insertFile">
          F
        </button>
        <button type="button" className="ql-link">Link</button>
        <button type="button" className="ql-code-block">Code Block</button>
        <button type="button" className="ql-blockquote">BlockQuote</button>
        <button type="button" className="ql-clean">Clean</button>
      </div>
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
      <input type="file" accept="image/*" ref={InputOpenImageRef} style={{ display: 'none' }} onChange={handleInsertImage} />
      <input type="file" accept="video/*" ref={InputOpenVideoRef} style={{ display: 'none' }} onChange={handleInsertVideo} />
    </>
  );
}

export default TextEditor;
