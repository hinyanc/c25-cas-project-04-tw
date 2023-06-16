// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import axios from 'axios';

// const UploadFile = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFilePick = async () => {
//     try {
//       const document = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       setSelectedFile(document);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFileUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', {
//       uri: selectedFile.uri,
//       type: selectedFile.type,
//       name: selectedFile.name,
//     });

//     try {
//       const response = await axios.post('http://localhost:3000/upload', formData);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View>
//       <Button title="Pick File" onPress={handleFilePick} />
//       <Button title="Upload File" onPress={handleFileUpload} disabled={!selectedFile} />
//     </View>
//   );
// };

// export default UploadFile;