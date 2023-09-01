// import { View, Text } from 'react-native'
// import React from 'react'

// const Create = () => {
//     return (
//         <View>
//             <Text>Create</Text>
//         </View>
//     )
// }

// export default Create

import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const Create = () => {
  const [avatarSource, setAvatarSource] = useState(null);

  const selectPhotoTapped = () => {
    const options = {
      title: 'Fotoğraf Seç',
      cancelButtonTitle: 'İptal',
      takePhotoButtonTitle: 'Fotoğraf Çek',
      chooseFromLibraryButtonTitle: 'Galeriden Seç',
      quality: 1.0,
      allowsEditing: true,
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Kullanıcı iptal etti');
      } else if (response.error) {
        console.log('ImagePicker Hatası: ', response.error);
      } else {
        const source = { uri: response.uri };
        setAvatarSource(source);
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Select photo" onPress={selectPhotoTapped} />
      {avatarSource && <Image source={avatarSource} style={{ width: 300, height: 300 }} />}
    </View>
  );
};

export default Create;
