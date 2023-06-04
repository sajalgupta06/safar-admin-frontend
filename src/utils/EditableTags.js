import React, { useRef, useState,useEffect } from 'react'
import { Input, Space, Tag, Tooltip, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function EditableTags(props) {

    const { token } = theme.useToken();
    const {tags,setTags,title} = props

    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);

    useEffect(() => {
      if (inputVisible) {
        inputRef.current?.focus();
      }
    }, [inputVisible]);


    useEffect(() => {
      editInputRef.current?.focus();
    }, [inputValue]);


    const handleClose = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
    };

    const showInput = () => {
      setInputVisible(true);
    };

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };


    const handleInputConfirm = () => {

      if(!tags && inputValue)
      {
        
          setTags([inputValue]);

      }
      else if (inputValue && tags.indexOf(inputValue) === -1){

        setTags([...tags, inputValue]);
      }
     
      setInputVisible(false);
      setInputValue('');
    };

    const handleEditInputChange = (e) => {
      setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      setTags(newTags);
      setEditInputIndex(-1);
      setInputValue('');
    };



    const tagStyle = {
      background: token.colorBgContainer,
      borderStyle: '1px solid black',
      padding:"1rem",
      width:"100%",
      marginBottom:"2rem",
      display:"flex",
      justifyContent:"space-between",
      textTransform:"capitalize"
    };

    const newTagStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
        padding:"1rem",
        width:"100%",
        marginBottom:"2rem",
        display:"flex",
        justifyContent:"space-between",
        textTransform:"capitalize",
        color:"#aba3a3",
        cursor:"text"
      };


  return (
   <>
    <>
 

        {tags?.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                style={tagStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > 100;

          const tagElem = (
            <Tag
              key={tag}
              closable
              style={tagStyle}
              onClose={() => handleClose(tag)}

            >
              <p
                onClick={(e) => {
                 
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  
                }}

                style={{"textOverflow": "ellipsis",
                    "width": "100%",
                    "overflow": "hidden"}}
              >
                    {`${index+1}.  ${tag}` }

           
           
              </p>
            </Tag>
          );
          
             return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
         
    

    
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={newTagStyle} onClick={showInput} color={props?.status} >
            <span>

          <PlusOutlined />  Add {title}
            </span>
        </Tag>
      )}
    </>
   </>
  )
}
