import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios';

// Register the image resize module
ReactQuill.Quill.register('modules/imageResize', ImageResize);

const TextEditor = ({ value, onChange }) => {
  const quillRef = useRef();

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['blockquote'],
      ['link', 'image', 'video'],
      ['clean']
    ],
    imageResize: {
      parchment: ReactQuill.Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  };

  const formats = [
    'font', 'header', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'blockquote',
    'link', 'image', 'video'
  ];

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await axios.post('/api/upload-image', formData);
          const imageUrl = response.data.url;

          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);

          quill.insertEmbed(range.index, 'image', imageUrl, 'user');
          quill.setSelection(range.index + 1);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  };

  return (
    <div className="text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="bg-white border border-gray-300 rounded-lg"
      />  
    </div>
  );
};

export default TextEditor;