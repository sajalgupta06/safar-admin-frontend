import {  message  }  from 'antd';
   
     
export  const  alerts =  {

     success (text)  {
        return message.success(text);
      },

      info (text)  {
         return message.info(text);
       },

       error (text)  {
         return message.error(text);
       },

       warning (text)  {
         return message.warning(text);
       }


   }   
    
